import type { Post } from "@/lib/posts";

export const prototypeToProduction: Post = {
  slug: "from-prototype-to-production",
  title: "Du prototype à la production",
  description:
    "Une application montée en un week-end peut sembler finie sans être prête pour des clients qui paient. Voici ce qui manque en général.",
  category: "Ingénierie produit",
  date: "2026-11-16",
  blocks: [
    {
      type: "p",
      text: "En un seul week-end, on peut aujourd’hui décrire une application à un générateur d’applications IA ou à un agent de code IA, et obtenir en retour une application cliquable. L’inscription fonctionne, le tableau de bord affiche des chiffres, et on dirait un vrai produit. Les fondateurs me montrent souvent ce genre de résultat et me demandent si l’application est presque prête à faire payer des clients.",
    },
    {
      type: "p",
      text: "Souvent, elle est proche en apparence et loin dans les parties que personne ne voit. L’écart entre « ça marche sur mon écran » et « les gens peuvent payer pour ça » tient à ce qui se passe quand quelqu’un d’autre utilise l’application : avec des données désordonnées, sur un téléphone lent, ou avec une carte refusée. J’aide les fondateurs à combler cet écart. Chaque point ci-dessous s’accompagne d’une façon rapide de le vérifier.",
    },
    {
      type: "h2",
      text: "Qui peut voir quelles données",
    },
    {
      type: "p",
      text: "Beaucoup d’applications construites par IA gardent leurs données dans une base de données hébergée, souvent Supabase ou Postgres. Dans une démo, la seule chose qui sépare un utilisateur des données d’un autre est l’écran que l’on voit. Ce n’est pas un verrou. N’importe qui peut ouvrir les outils de développement du navigateur et demander directement à la base de données chaque ligne. La solution est un ensemble de règles d’accès à l’intérieur de la base, appelées row-level security (RLS, ou sécurité au niveau des lignes). C’est une règle qui décide, ligne par ligne, qui peut lire ou modifier chaque enregistrement. Sans elle, un utilisateur connecté peut souvent lire l’adresse e-mail de chaque client.",
    },
    {
      type: "p",
      text: "Pour vérifier, connectez-vous avec un utilisateur de test, puis tentez de récupérer un enregistrement qui appartient à un autre utilisateur de test. Utilisez l’onglet réseau du navigateur ou une simple requête avec votre propre clé. Si l’enregistrement revient, c’est que les règles manquent. Je tiens une liste de contrôle plus détaillée sur la RLS pour cela. La règle courte : chaque table qui contient des données d’utilisateurs a besoin de règles pour la lecture, l’écriture et la suppression, écrites avant les écrans.",
    },
    {
      type: "h2",
      text: "Les secrets dans le navigateur",
    },
    {
      type: "p",
      text: "Le navigateur télécharge un paquet JavaScript pour faire fonctionner l’application, et tout ce qu’il contient est public. Certaines clés sont censées être publiques, comme la clé anonyme d’une base de données, tant que les règles d’accès ci-dessus sont en place. D’autres ne le sont pas. Une clé secrète d’un fournisseur de paiement, une clé du service d’envoi d’e-mails ou un jeton d’administration dans le paquet signifie que quiconque ouvre la page peut agir comme votre compte.",
    },
    {
      type: "p",
      text: "Dans Next.js, une variable d’environnement (une valeur conservée hors du code, comme une clé) n’est envoyée au navigateur que si son nom commence par NEXT_PUBLIC_. Pour le vérifier, cherchez le préfixe de chaque clé secrète dans votre code source :",
    },
    {
      type: "code",
      lang: "bash",
      code: `grep -rn "sk_live_" app components lib`,
    },
    {
      type: "p",
      text: "Si quelque chose apparaît en dehors d’un fichier réservé au serveur, déplacez cet appel vers le serveur et régénérez la clé dans le tableau de bord du fournisseur. Une clé qui a été publique ne serait-ce qu’une heure doit être considérée comme compromise.",
    },
    {
      type: "h2",
      text: "Les cas limites de la connexion",
    },
    {
      type: "p",
      text: "L’inscription n’est que le premier parcours. Les vrais utilisateurs oublient leur mot de passe, changent d’adresse e-mail, se connectent sur deux appareils et laissent un onglet ouvert pendant une semaine. Testez chacun à la main :",
    },
    {
      type: "list",
      items: [
        "Réinitialisation du mot de passe : demandez-la, ouvrez le lien dans une fenêtre de navigation privée, définissez un nouveau mot de passe, puis vérifiez que l’ancien ne fonctionne plus.",
        "Liens de réinitialisation : un lien ne devrait fonctionner qu’une seule fois. L’ouvrir une seconde fois doit afficher un message clair, et non une page blanche.",
        "Changement d’adresse e-mail : la nouvelle adresse doit être confirmée avant de remplacer l’ancienne, et l’ancienne doit recevoir une notification.",
        "Expiration de la session : déconnectez-vous dans un onglet, puis cliquez sur un bouton dans un autre. L’application doit renvoyer l’utilisateur à la page de connexion, et non afficher un écran cassé.",
      ],
    },
    {
      type: "h2",
      text: "Paiements : webhooks, refus et remboursements",
    },
    {
      type: "p",
      text: "Un webhook est un message que votre fournisseur de paiement envoie à une adresse de votre serveur lorsque quelque chose se produit, comme un paiement effectué. La démo vérifie souvent le paiement à l’écran, et ce n’est pas suffisant. La page peut se fermer trop tôt, l’utilisateur peut la recharger, et le navigateur peut perdre la connexion réseau. Votre serveur ne devrait accorder l’accès qu’une fois le webhook reçu et sa signature validée. La signature est un code qui prouve que le message vient bien du fournisseur.",
    },
    {
      type: "list",
      items: [
        "Renouvellements échoués : une carte peut être refusée des semaines après l’inscription. Décidez ce qui arrive à l’accès pendant la période de nouvelles tentatives, puis testez-le avec les cartes de test du fournisseur.",
        "Remboursements et annulations : l’accès devrait changer lorsque le fournisseur les signale, et non seulement lorsqu’une personne clique sur un bouton de votre écran d’administration.",
        "Clés de test et clés de production : les clés de test ne déplacent pas d’argent réel. Confirmez que la production utilise des clés de production et qu’aucune clé de test n’y est configurée.",
        "Doublons : le même webhook peut arriver deux fois. Le traiter deux fois ne devrait pas accorder l’accès deux fois ni envoyer deux e-mails.",
      ],
    },
    {
      type: "h2",
      text: "Erreurs et états vides",
    },
    {
      type: "p",
      text: "Une démo montre le scénario idéal, avec des données déjà en place. Les vrais utilisateurs ouvrent un compte vide, importent un fichier beaucoup trop lourd, ou perdent leur connexion au milieu d’un formulaire. Chaque écran principal a besoin de trois états : ce qu’il affiche sans données, ce qu’il affiche pendant le chargement, et ce qu’il affiche en cas d’échec. Une page blanche ou une roue de chargement qui tourne sans fin signale en général que ces états ont été oubliés.",
    },
    {
      type: "p",
      text: "Pour vérifier, coupez le Wi-Fi et cliquez sur chaque écran principal. Ensuite, ouvrez un compte tout neuf et refaites la même chose.",
    },
    {
      type: "h2",
      text: "Sauvegardes et historique des migrations",
    },
    {
      type: "p",
      text: "Une migration est un fichier qui décrit un changement dans la base de données, comme l’ajout d’une colonne. Si les modifications sont faites en cliquant dans le tableau de bord, personne ne peut voir ce qui a changé, et personne ne peut reconstruire la même configuration sur une deuxième base. Gardez les changements sous forme de fichiers dans git, l’outil qui enregistre l’historique de votre code, afin qu’ils puissent être rejoués sur une base vierge.",
    },
    {
      type: "p",
      text: "Vérifiez que les sauvegardes s’exécutent, et restaurez-en une dans un projet de test au moins une fois. Une sauvegarde que vous n’avez jamais restaurée est un espoir, pas une sauvegarde.",
    },
    {
      type: "h2",
      text: "Journaux et suivi des erreurs",
    },
    {
      type: "p",
      text: "Si une erreur ne survient que sur le téléphone d’un utilisateur, vous en entendrez parler par un e-mail furieux, à moins que quelque chose ne l’enregistre. Ajoutez un outil de suivi des erreurs, un service qui collecte les plantages de l’application en production et vous en avertit. Puis provoquez volontairement une erreur et vérifiez qu’elle arrive. Gardez les données personnelles hors de ces journaux. Une adresse e-mail dans un message d’erreur reste une donnée personnelle.",
    },
    {
      type: "h2",
      text: "Préproduction et production",
    },
    {
      type: "p",
      text: "La production, c’est l’application réelle, celle qu’utilisent les vrais utilisateurs et où circulent les vrais paiements. La préproduction (staging) en est une copie où les changements sont essayés en premier. Sans préproduction, le premier endroit où un changement est testé est aussi l’endroit où il peut nuire aux gens. Deux bases de données séparées, deux jeux de clés et deux cibles de déploiement suffisent. Ne pointez jamais la préproduction vers la base de production, et ne laissez jamais des données de test arriver en production.",
    },
    {
      type: "h2",
      text: "Les aspects juridiques",
    },
    {
      type: "p",
      text: "Avant de facturer, vous avez besoin d’une politique de confidentialité, qui indique quelles données vous collectez et pourquoi, et de conditions générales d’utilisation (CGU), qui fixent les règles d’usage du produit. Je ne suis pas avocat, et la formulation juste dépend du pays où vous opérez et de qui sont vos clients. Faites-les relire par un professionnel, et liez-les dans le pied de page dès le départ.",
    },
    {
      type: "h2",
      text: "La vitesse sur un téléphone de milieu de gamme",
    },
    {
      type: "p",
      text: "Votre ordinateur portable n’est pas le téléphone de votre client. Ouvrez l’application sur un téléphone Android de milieu de gamme, ou utilisez le réglage de limitation du débit du navigateur pour simuler une connexion lente. Cherchez les grosses images, une bibliothèque de graphiques lourde chargée sur chaque page, et les listes qui affichent mille lignes d’un coup. Le premier écran compte le plus, car c’est là que les gens décident de rester.",
    },
    {
      type: "h2",
      text: "Un plan de retour arrière",
    },
    {
      type: "p",
      text: "Avant chaque mise en production, sachez comment revenir en arrière. La plupart des plateformes d’hébergement peuvent revenir au déploiement précédent en quelques clics. La base de données est plus délicate. Une migration qui supprime une colonne ne peut pas être annulée en redéployant l’ancien code. Écrivez une fois les étapes de retour arrière, et gardez les changements destructeurs dans une version distincte, afin que chaque version soit facile à inverser.",
    },
    {
      type: "h2",
      text: "Comment je trierais tout cela en une semaine",
    },
    {
      type: "p",
      text: "Si vous avez une semaine et un prototype qui fonctionne, voici à peu près l’ordre que j’utilise. Ce n’est pas un audit complet. C’est un premier passage qui évite les pires surprises.",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Jour 1 : règles d’accès et secrets. Corrigez tout ce qu’un inconnu pourrait lire ou modifier. C’est le seul groupe de problèmes qui peut nuire aux gens avant que vous les remarquiez.",
        "Jour 2 : connexion et paiements. Confirmez que l’accès découle du webhook, que les événements échoués et en double sont gérés, et que les parcours de réinitialisation et de changement d’adresse e-mail fonctionnent.",
        "Jour 3 : migrations, sauvegardes et une copie de préproduction. Déplacez les changements de base de données dans des fichiers et prouvez que vous pouvez restaurer.",
        "Jour 4 : erreurs et états vides. Ajoutez le suivi des erreurs, puis parcourez chaque écran sans données et hors connexion.",
        "Jour 5 : vitesse sur téléphone, pages juridiques et une note sur le retour arrière. Corrigez d’abord l’écran le plus lent.",
      ],
    },
    {
      type: "p",
      text: "Ce qui peut attendre : les finitions visuelles, les animations, les nouvelles fonctionnalités et les écrans d’administration que vous seul utilisez. Ils comptent, mais aucun ne fera perdre les données ou l’argent d’un client.",
    },
    {
      type: "h2",
      text: "Le prototype est la spécification",
    },
    {
      type: "p",
      text: "Le prototype n’a pas été gaspillé. Il vous a montré ce que le produit doit faire, les écrans dont les gens ont besoin et les mots qu’ils comprennent. C’est votre spécification, et elle mérite d’être gardée. Il reste à faire en sorte que les parties que les utilisateurs ne voient jamais se comportent aussi bien que celles qu’ils voient. Commencez par les règles d’accès, et le reste devient beaucoup plus facile à planifier.",
    },
  ],
};
