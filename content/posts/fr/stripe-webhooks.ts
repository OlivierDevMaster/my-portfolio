import type { Post } from "@/lib/posts";

export const stripeWebhooks: Post = {
  slug: "stripe-webhooks-without-double-charges",
  title: "Les webhooks Stripe sans double débit",
  description:
    "Comment je fais en sorte que chaque événement webhook de Stripe ne modifie mon système qu’une seule fois : vérification des signatures, événements en double et événements reçus dans le désordre.",
  category: "Paiements",
  date: "2026-11-16",
  blocks: [
    {
      type: "p",
      text: "Un webhook est un message que Stripe envoie à une URL de votre serveur lorsque quelque chose se produit : un paiement réussit, un abonnement se renouvelle, un remboursement échoue. Votre serveur ne le demande pas, c’est Stripe qui vous appelle. C’est utile, et c’est aussi là que naissent la plupart des bogues de paiement que j’ai vus. Stripe peut envoyer deux fois le même message, dans le désordre, ou envoyer un faux message venant de quelqu’un qui a trouvé votre URL.",
    },
    {
      type: "p",
      text: "L’objectif est simple à énoncer. Chaque événement doit modifier mon système exactement une fois, peu importe le nombre de fois où il arrive et l’ordre dans lequel il arrive. Le reste de cet article présente les vérifications que j’ajoute autour de cet objectif. Les exemples utilisent l’App Router de Next.js, avec un gestionnaire de route (route handler) dans `app/api/stripe/webhook/route.ts`. Le code est une esquisse, pas un gestionnaire terminé.",
    },
    {
      type: "h2",
      text: "1. Vérifier la signature sur le corps brut",
    },
    {
      type: "p",
      text: "Stripe signe chaque webhook avec un secret que seuls Stripe et votre serveur connaissent. La signature arrive dans l’en-tête `Stripe-Signature`. La vérification a besoin des octets exacts envoyés par Stripe. Si vous lisez d’abord le corps comme du JSON, puis que vous le reconvertissez en texte, les octets changent, et la vérification échoue même pour de vrais événements. Je lis donc le corps comme du texte et je transmets ce texte à la bibliothèque.",
    },
    {
      type: "code",
      lang: "ts",
      code: `import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature ?? "",
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // Les vérifications ci-dessous ne s’appliquent qu’aux événements qui ont passé la vérification.
  return NextResponse.json({ received: true });
}`,
    },
    {
      type: "p",
      text: "Si la vérification échoue, renvoyez une erreur 400 et ne faites rien d’autre. Ne journalisez pas le corps comme s’il était fiable. La documentation de Stripe met en garde contre tout middleware qui modifie le corps brut. Si la vérification échoue sur de vrais événements, vérifiez donc la configuration de votre framework.",
    },
    {
      type: "h2",
      text: "2. Enregistrer l’identifiant de chaque événement et ignorer les répétitions",
    },
    {
      type: "p",
      text: "La documentation de Stripe indique qu’un endpoint webhook (point d’accès de l’API) peut recevoir le même événement plus d’une fois. Les livraisons échouées sont aussi relancées. En mode production, Stripe continue d’essayer pendant jusqu’à trois jours, en espaçant de plus en plus ses tentatives. Le même événement peut donc me parvenir à nouveau, parfois plusieurs jours plus tard.",
    },
    {
      type: "p",
      text: "La solution est une table d’identifiants d’événements avec une contrainte d’unicité. L’identifiant à conserver est `event.id`. Avant d’appliquer un événement, j’essaie d’insérer son identifiant. Si l’insertion ne fait rien, c’est que j’ai déjà vu cet événement, et je m’arrête.",
    },
    {
      type: "code",
      lang: "sql",
      code: `create table stripe_events (
  id text primary key,          -- event.id, par exemple "evt_..."
  type text not null,
  received_at timestamptz not null default now()
);`,
    },
    {
      type: "code",
      lang: "ts",
      code: `// Esquisse : \`db\` est votre client de base de données, avec une méthode query.
const result = await db.query(
  "insert into stripe_events (id, type) values ($1, $2) on conflict (id) do nothing returning id",
  [event.id, event.type]
);

if (result.rows.length === 0) {
  return NextResponse.json({ received: true }); // déjà traité
}`,
    },
    {
      type: "p",
      text: "Il y a un piège ici. Si l’insertion réussit mais que la modification elle-même échoue, l’événement est marqué comme vu et n’est jamais appliqué. Quand la modification touche ma propre base de données, je place l’insertion et la modification dans une même transaction, pour que les deux aboutissent ou qu’aucune ne soit appliquée. Quand la modification se fait hors de ma base, j’ajoute aussi une colonne de statut et je relance moi-même celles qui ne sont pas terminées.",
    },
    {
      type: "h2",
      text: "3. Ne pas se fier à l’ordre d’arrivée",
    },
    {
      type: "p",
      text: "Stripe ne promet pas d’envoyer les événements dans l’ordre où ils se sont produits. La création d’un abonnement peut générer plusieurs événements, et n’importe lequel peut arriver en premier. L’horodatage n’aide pas non plus. Les événements d’instantané enregistrent `created` en secondes entières, donc deux événements peuvent avoir la même valeur. Je n’utilise jamais `created` pour décider lequel est le plus récent.",
    },
    {
      type: "p",
      text: "Je traite plutôt chaque événement comme un indice, et je lis l’état actuel avant d’agir. Si `invoice.paid` arrive avant l’événement d’abonnement que j’attendais, je récupère la facture et l’abonnement depuis l’API, et j’utilise ce qu’ils indiquent maintenant. Si l’objet se trouve dans un état qui rend ma modification incorrecte, j’abandonne la modification et je consigne la raison.",
    },
    {
      type: "code",
      lang: "ts",
      code: `// Esquisse : récupérer l’état actuel au lieu de se fier à l’instantané de l’événement.
const invoice = await stripe.invoices.retrieve(invoiceId);

if (invoice.status === "paid") {
  await markOrderPaid(invoice.metadata.order_id);
}`,
    },
    {
      type: "h2",
      text: "4. Répondre vite et faire le travail lent plus tard",
    },
    {
      type: "p",
      text: "Stripe attend une réponse 2xx dans un délai court. Si mon gestionnaire prend trop de temps, Stripe compte le dépassement de délai comme un échec et renvoie l’événement. Un gros lot de renouvellements le 1er du mois peut suffire à le provoquer. Le gestionnaire de route fait donc trois choses : il vérifie, il enregistre l’identifiant de l’événement, puis il place le travail dans une file d’attente ou une tâche en arrière-plan. Ensuite, il renvoie 200. La file exécute la partie lente, comme l’envoi d’un e-mail ou la mise à jour d’un système comptable.",
    },
    {
      type: "h2",
      text: "5. Le webhook fait foi, pas la redirection",
    },
    {
      type: "p",
      text: "Après un paiement, beaucoup de tunnels de paiement renvoient le client vers une page de succès. Cette page sert bien pour un message de remerciement, mais elle n’est pas une preuve de paiement. Le navigateur peut être fermé avant la redirection. Une personne peut aussi taper l’URL de la page de succès à la main. Je ne marque donc jamais une commande comme payée parce que la page de succès s’est chargée. Je la marque comme payée lorsque l’événement webhook vérifié arrive, ou lorsque je récupère le paiement depuis l’API et constate qu’il a réussi.",
    },
    {
      type: "h2",
      text: "6. Utiliser des clés d’idempotence pour mes propres appels sortants",
    },
    {
      type: "p",
      text: "Les vérifications ci-dessus me protègent des nouvelles tentatives de Stripe, mais pas de mes propres nouvelles tentatives. Si mon code subit un dépassement de délai pendant la création d’un remboursement, je ne sais peut-être pas si Stripe l’a créé. Relancer le code en créerait un second. Une clé d’idempotence empêche cela. C’est une chaîne unique que j’envoie avec une requête de création ou de mise à jour. Stripe s’en sert pour reconnaître la répétition d’une même requête et renvoyer le premier résultat, au lieu d’agir une seconde fois.",
    },
    {
      type: "p",
      text: "La clé va dans l’en-tête `Idempotency-Key`, que l’API de Stripe prévoit pour les requêtes POST. La documentation de Stripe indique qu’elle doit être une chaîne aléatoire, comme un UUID version 4, d’au plus 255 caractères. Je la construis à partir de l’action métier, par exemple l’identifiant de la commande suivi du nom de l’action, pour que la même action reçoive toujours la même clé. Je n’y mets aucune donnée personnelle. Stripe précise aussi que les clés peuvent être supprimées après au moins 24 heures. La clé ne protège donc les nouvelles tentatives que sur une courte période.",
    },
    {
      type: "h2",
      text: "7. Séparer les endpoints de test et de production",
    },
    {
      type: "p",
      text: "Le mode test et le mode production ont chacun leur propre endpoint webhook et leur propre secret de signature. Je les garde dans des variables d’environnement séparées, comme `STRIPE_WEBHOOK_SECRET` pour chaque environnement, et je ne réutilise jamais le même secret pour les deux. Pour le développement en local, la CLI de Stripe transmet les événements de votre compte vers votre ordinateur :",
    },
    {
      type: "code",
      lang: "bash",
      code: `stripe listen --forward-to localhost:3000/api/stripe/webhook
# La CLI affiche un secret de signature pour cette session. Placez-le dans votre fichier d’environnement local.

stripe trigger payment_intent.succeeded`,
    },
    {
      type: "p",
      text: "`stripe trigger` envoie un événement d’exemple du type que vous indiquez. Je lance ainsi au moins une fois chaque type d’événement que mon gestionnaire prend en charge, et je vérifie que l’état de ma base de données change une seule fois, et non deux, quand je déclenche à nouveau le même événement.",
    },
    {
      type: "note",
      text: "Un secret de signature affiché par `stripe listen` ne vaut que pour cette session locale. Ne le copiez pas dans votre environnement de production.",
    },
    {
      type: "h2",
      text: "8. S’abonner à moins d’événements, surveiller les échecs",
    },
    {
      type: "p",
      text: "Chaque type d’événement auquel je m’abonne est une source d’échec de plus. La recommandation de Stripe est d’écouter seulement les types dont mon intégration a besoin. Si mon gestionnaire n’a aucune branche pour un type d’événement, je ne devrais pas le recevoir. Pour les types que je traite, chaque erreur inattendue doit être journalisée avec l’identifiant de l’événement, et je dois recevoir une alerte lorsqu’un événement échoue à répétition.",
    },
    {
      type: "p",
      text: "Avant toute mise en production, j’ouvre l’endpoint webhook dans le tableau de bord de Stripe et je consulte le journal des livraisons. Il indique chaque événement, s’il a été livré et le code HTTP que mon serveur a renvoyé. Tout code 4xx ou 5xx à cet endroit est un bogue à corriger en premier. Les redirections comptent aussi comme des échecs : l’URL doit donc être la version finale.",
    },
    {
      type: "h2",
      text: "Pourquoi j’écris cette partie moi-même",
    },
    {
      type: "p",
      text: "Un agent de codage IA peut écrire un gestionnaire de route en quelques minutes, et le résultat aura l’air correct. Il peut insérer l’identifiant de l’événement, appeler l’API et renvoyer 200. Ce qu’il ne peut pas décider, c’est ce que « exactement une fois » doit signifier pour chaque événement. Un événement de remboursement doit-il rouvrir une commande ? Un paiement échoué doit-il envoyer un e-mail au client ? Ces réponses dépendent de ce que je promets aux personnes qui me paient.",
    },
    {
      type: "p",
      text: "C’est pourquoi je garde cette partie comme mon travail. J’écris, pour chaque type d’événement, ce qu’il peut modifier et ce qu’il ne doit jamais modifier. J’écris les tests qui envoient le même événement deux fois et dans le désordre. L’agent peut écrire le gestionnaire. Je décide de ce qu’il a le droit de faire.",
    },
  ],
};
