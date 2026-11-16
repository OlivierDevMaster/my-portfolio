import type { Post } from "@/lib/posts";

export const oneBackendWebAndMobile: Post = {
  slug: "one-supabase-backend-web-and-expo",
  title: "Un seul backend Supabase pour le web et le mobile",
  description:
    "Comment je partage un seul projet Supabase entre une application web Next.js et une application React Native construite avec Expo, et ce que je garde identique des deux côtés.",
  category: "Architecture",
  date: "2026-11-16",
  blocks: [
    {
      type: "p",
      text: "Pour les produits où je livre à la fois un tableau de bord web et une application mobile, je veux un seul backend, pas deux. Supabase me fournit en un seul projet une base de données Postgres, l’authentification et une API. Postgres est le moteur de base de données SQL open source sur lequel repose le tout. L’application web est construite avec Next.js. L’application mobile est construite avec Expo, une boîte à outils pour React Native, un framework pour applications mobiles écrit en JavaScript ou en TypeScript. Les deux applications s’appuient sur le même projet. Cela évite beaucoup de travail, mais seulement si je m’impose quelques habitudes.",
    },
    {
      type: "h2",
      text: "Mettre les règles dans la base de données",
    },
    {
      type: "p",
      text: "Le plus grand risque avec deux clients, c’est que chacun applique les règles à sa façon. Le formulaire web vérifie qu’un total de commande n’est pas négatif, l’application mobile l’oublie, et de mauvaises lignes se retrouvent dans la base. J’évite cela en plaçant les règles là où les deux clients doivent passer : dans la base de données. L’outil principal est la row-level security (RLS), c’est-à-dire la sécurité au niveau des lignes : ce sont des règles Postgres qui décident quelles lignes un utilisateur peut lire ou modifier. Les contraintes, c’est-à-dire des vérifications enregistrées sur la table, couvrent le reste.",
    },
    {
      type: "code",
      lang: "sql",
      code: `alter table public.orders
  add constraint total_not_negative check (total >= 0);`,
    },
    {
      type: "p",
      text: "Une contrainte comme celle-ci échoue de la même façon, quelle que soit l’application qui envoie l’insertion. Aucune des deux applications n’a besoin de sa propre copie de la vérification. Il en va de même pour une logique qui comporte plus d’une vérification, comme le passage d’une commande à son statut suivant. Je l’écris comme une fonction Postgres, et les deux applications l’appellent par son nom. Appeler une fonction stockée via l’API revient à faire un appel de procédure à distance, ou RPC (remote procedure call). Avec le client Supabase, cela ressemble à ceci.",
    },
    {
      type: "code",
      lang: "ts",
      code: `const { error } = await supabase.rpc("advance_order", { order_id: id });`,
    },
    {
      type: "h2",
      text: "Partager les types générés",
    },
    {
      type: "p",
      text: "La CLI de Supabase peut lire votre schéma et écrire un fichier TypeScript qui décrit chaque table. La commande ci-dessous lit le projet hébergé lié au dépôt. Pour la base locale, utilisez `--local` à la place.",
    },
    {
      type: "code",
      lang: "bash",
      code: `npx supabase gen types typescript --linked > database.types.ts`,
    },
    {
      type: "p",
      text: "Je garde ce fichier dans un dossier partagé, comme packages/db dans un monorepo (un dépôt qui regroupe plusieurs projets), et je l’importe dans les deux applications. Quand je renomme une colonne, la compilation échoue dans les deux applications en même temps. C’est ce que je veux, car je préfère trouver le problème sur mon ordinateur plutôt que chez un utilisateur. Je régénère ce fichier après chaque migration, jamais seulement quand je m’en souviens. Un script dans package.json réduit cela à une seule commande.",
    },
    {
      type: "h2",
      text: "Garder les migrations dans le dépôt",
    },
    {
      type: "p",
      text: "Une migration est un fichier SQL numéroté qui modifie le schéma. La CLI m’en crée un vide, et j’y écris le SQL. Ensuite, je l’applique à ma base locale, et je reconstruis cette base à partir de toutes les migrations lorsque j’ai besoin d’un départ propre.",
    },
    {
      type: "code",
      lang: "bash",
      code: `npx supabase migration new add_order_status
npx supabase migration up
npx supabase db reset

npx supabase db push`,
    },
    {
      type: "p",
      text: "La première commande crée un fichier dans supabase/migrations. La deuxième applique les migrations en attente, en local. La troisième supprime et reconstruit la base locale à partir de toutes les migrations et du fichier de données initiales (seed). La dernière envoie les migrations au projet hébergé.",
    },
    {
      type: "p",
      text: "La règle que je suis est simple : aucune modification du schéma en cliquant dans le tableau de bord. Si je modifie une table dans l’éditeur SQL, l’historique du dépôt ne correspond plus à la base, et le prochain envoi échoue avec une erreur de synchronisation. Si j’essaie quelque chose dans le tableau de bord local, je le capture avec `supabase db diff` et j’enregistre le résultat dans un commit.",
    },
    {
      type: "note",
      text: "L’envoi avec `--include-seed` charge aussi le fichier seed dans la base hébergée. Gardez les utilisateurs de test et les exemples de lignes hors de ce fichier, sinon ils se retrouvent en production.",
    },
    {
      type: "h2",
      text: "L’authentification fonctionne différemment sur chaque client",
    },
    {
      type: "p",
      text: "Les deux applications utilisent les mêmes comptes d’utilisateurs, mais elles conservent la session de connexion à des endroits différents. L’application web tourne sur un serveur Next.js et dans le navigateur, donc la session est stockée dans des cookies, de petits fichiers que le navigateur envoie avec chaque requête. J’utilise @supabase/ssr pour cela. Il me donne un client pour le navigateur et un client pour le code serveur, comme les gestionnaires de route, et les deux lisent les mêmes cookies.",
    },
    {
      type: "p",
      text: "Un téléphone n’a pas de cookies. La session est une paire de jetons (tokens) que le client Supabase stocke là où je le lui indique. Le guide de démarrage rapide d’Expo chez Supabase utilise un polyfill localStorage (une petite bibliothèque qui imite l’API localStorage du navigateur) qui s’appuie sur expo-sqlite. AsyncStorage, utilisé dans d’anciens exemples, n’est pas chiffré. Pour la session, je préfère expo-secure-store, qui conserve les valeurs dans le trousseau iOS (Keychain) et dans le Keystore Android.",
    },
    {
      type: "p",
      text: "SecureStore pose un problème de taille. Expo n’impose pas de limite, mais sa documentation avertit que les grandes valeurs peuvent être refusées, et que certaines versions d’iOS ont historiquement refusé les valeurs de plus d’environ 2 048 octets. Une session Supabase peut dépasser cette taille une fois les données de l’utilisateur incluses. Une solution consiste à découper la session en morceaux numérotés, chacun stocké sous sa propre clé, puis à les rassembler à la lecture. L’autre est le modèle du tutoriel Expo de Supabase : garder une clé de chiffrement aléatoire dans SecureStore et la session chiffrée dans AsyncStorage. Les deux fonctionnent. Testez avec un compte réel qui a une longue session.",
    },
    {
      type: "p",
      text: "Le client lui-même se configure de la même façon sur toutes les plateformes, avec les options d’authentification et un écouteur qui détecte le passage au premier plan ou en arrière-plan de l’application.",
    },
    {
      type: "code",
      lang: "ts",
      code: `import { AppState } from "react-native";
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(supabaseUrl, publishableKey, {
  auth: {
    storage: secureStorage, // un adaptateur de stockage appuyé sur SecureStore
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});`,
    },
    {
      type: "p",
      text: "Le renouvellement automatique du jeton exige que l’application soit en cours d’exécution. Le téléphone suspend de toute façon le travail en arrière-plan. L’écouteur démarre donc le renouvellement quand l’application revient au premier plan, et l’arrête quand elle le quitte. Enregistrez-le une seule fois, au niveau racine de l’application, et non dans un écran. detectSessionInUrl sert à lire les jetons dans une adresse web, ce qu’un téléphone n’a pas, donc je le désactive.",
    },
    {
      type: "h2",
      text: "Liens profonds pour les liens magiques et OAuth",
    },
    {
      type: "p",
      text: "Un lien magique (un e-mail avec un bouton de connexion) et une connexion OAuth (Google ou Apple) finissent tous deux par renvoyer l’utilisateur vers une URL. Sur le web, cette URL est une page de mon site. Sur le téléphone, c’est un lien profond (deep link), une URL qui ouvre mon application. Je donne à l’application un schéma d’URL sous la clé `scheme` de sa configuration Expo, puis j’ajoute ce schéma à la liste « Redirect URLs » (URL de redirection autorisées) dans les paramètres d’authentification de Supabase. Je passe la même URL quand je lance la connexion : `emailRedirectTo` pour un lien magique, `redirectTo` pour OAuth. `makeRedirectUri()` de `expo-auth-session` la construit pour moi.",
    },
    {
      type: "p",
      text: "La redirection doit correspondre à une entrée de cette liste. Quand une connexion mobile semble ne rien faire, une entrée manquante ou mal écrite est la première chose que je vérifie. La liste doit contenir une entrée pour chaque rappel (callback) web et une pour chaque schéma d’application, et les deux ne sont jamais interchangeables.",
    },
    {
      type: "h2",
      text: "Le travail côté serveur reste sur le serveur",
    },
    {
      type: "p",
      text: "Tout ce qui demande un secret va dans une Edge Function ou un gestionnaire de route Next.js. Une Edge Function est une petite fonction serveur que Supabase héberge. La clé secrète de Stripe, la clé d’un service d’e-mail et toute tâche d’administration y ont leur place. L’application mobile les appelle via le client Supabase.",
    },
    {
      type: "code",
      lang: "ts",
      code: `const { data, error } = await supabase.functions.invoke("send-invoice", {
  body: { invoiceId },
});`,
    },
    {
      type: "p",
      text: "Faites attention au préfixe EXPO_PUBLIC_. Expo copie ces variables dans le bundle JavaScript, donc quiconque extrait le contenu de l’application peut les lire. La clé publiable de Supabase est faite pour cela. Une clé secrète Stripe ne l’est pas : elle ne doit jamais recevoir ce préfixe, ni se trouver dans le projet mobile.",
    },
    {
      type: "h2",
      text: "Les anciennes versions de l’application sont la vraie contrainte",
    },
    {
      type: "p",
      text: "C’est la partie d’un backend partagé à laquelle je pense le plus. Une application web change au moment où je la déploie. Une application mobile ne change que lorsque l’utilisateur installe la nouvelle version depuis l’App Store ou Google Play, et beaucoup de personnes attendent des semaines, ou ne mettent jamais leur application à jour. Ma base de données sert donc pendant longtemps deux versions de l’application à la fois : la nouvelle et celle du mois dernier. Une migration qui casse l’ancienne version casse ces utilisateurs, et je ne peux pas faire le retour arrière à leur place.",
    },
    {
      type: "p",
      text: "Le modèle que j’utilise s’appelle « expand, then contract » : d’abord élargir le schéma, puis le réduire. À l’étape d’élargissement, j’ajoute la nouvelle colonne, table ou fonction, et je laisse l’ancienne fonctionner. À l’étape de réduction, qui vient beaucoup plus tard, je supprime l’ancienne. Une fois la nouvelle application publiée, j’attends que les anciennes versions aient en grande partie disparu de l’usage avant de réduire le schéma.",
    },
    {
      type: "p",
      text: "Un renommage est le cas qui piège les gens. Cela semble être un seul changement, mais pour une ancienne application, c’est une suppression suivie d’un ajout. Je le fais donc en trois étapes.",
    },
    {
      type: "code",
      lang: "sql",
      code: `-- 1. Élargissement : ajouter la nouvelle colonne et la remplir à partir de l’ancienne.
alter table public.orders add column order_status text;
update public.orders set order_status = status where order_status is null;
-- Un déclencheur copie les écritures faites sur status vers order_status pour les anciennes applications.

-- 2. Publication : la nouvelle application lit et écrit order_status.

-- 3. Réduction : seulement une fois les anciennes versions disparues.
alter table public.orders drop column status;`,
    },
    {
      type: "p",
      text: "La même réflexion s’applique aux autres changements. Une nouvelle colonne doit accepter NULL ou avoir une valeur par défaut, pour que les anciennes insertions réussissent encore. Ajouter une valeur à un type énuméré (enum) est généralement sans danger, mais en retirer une ne l’est pas. Une nouvelle politique RLS peut bloquer une ancienne application qui dépendait de la précédente. Donc, avant chaque livraison, je lance l’ancienne version sur la nouvelle base de données, et pas seulement la nouvelle version.",
    },
    {
      type: "p",
      text: "Les réponses de l’API suivent la même règle. Une ancienne application doit ignorer les champs qu’elle ne connaît pas : ajouter des champs est donc acceptable, mais en retirer ou en renommer ne l’est pas. J’inscris cette règle dans le dépôt, à côté des migrations, pour qu’elle soit visible lors de la prochaine modification.",
    },
    {
      type: "note",
      text: "La validation sur l’App Store et Google Play et les déploiements progressifs font qu’une nouvelle version mobile peut mettre plusieurs jours à atteindre tout le monde. Raisonnez à partir de la plus ancienne version encore installée, pas de celle que vous venez de publier.",
    },
    {
      type: "h2",
      text: "Temps réel et notifications push, en bref",
    },
    {
      type: "p",
      text: "Supabase Realtime peut envoyer les changements de lignes aux clients connectés, donc un tableau de bord web peut se mettre à jour quand un téléphone enregistre une commande. Les notifications push sont une fonctionnalité distincte. Le téléphone obtient un jeton push auprès du service push d’Expo, et le serveur envoie des messages à ce jeton, généralement depuis une Edge Function. Je n’ajouterais les deux que lorsqu’une fonctionnalité en a besoin. L’interrogation périodique (polling) est plus simple à bien faire au départ. Si vous utilisez Realtime, vérifiez que RLS limite ce que reçoit chaque client.",
    },
    {
      type: "p",
      text: "La règle qui relie tout cela est courte. La base de données est le seul endroit auquel les deux applications font confiance. Mettez-y les règles, modifiez-la avec soin, et gardez les deux clients légers.",
    },
  ],
};
