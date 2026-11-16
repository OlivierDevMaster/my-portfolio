import type { Post } from "@/lib/posts";

export const whenCodeIsCheap: Post = {
  slug: "product-engineering-when-code-is-cheap",
  title: "Ingénierie produit quand le code coûte peu",
  description:
    "Des agents de code IA écrivent aujourd’hui la plupart de mon code. Voici ce que je fais encore moi-même, et la méthode qui permet de leur confier le reste en toute sécurité.",
  category: "Ingénierie produit",
  date: "2026-11-16",
  blocks: [
    {
      type: "p",
      text: "Il y a un an, pour une fonctionnalité, la partie lente était de la taper au clavier. Aujourd’hui, un agent de code IA peut écrire un formulaire, une page de paramètres ou une route d’API en quelques minutes. J’utilise ces agents tous les jours, sur des produits web et mobiles, et la plupart du code que je mets en production est d’abord écrit par un agent.",
    },
    {
      type: "p",
      text: "Cela ne veut pas dire que le travail a rétréci. Il a changé de place. Quand le code coûte peu, la partie coûteuse consiste à décider ce que le code doit faire, puis à vérifier qu’il le fait. Cet article la met en pratique : ce que je confie à un agent, ce que je garde, et la petite méthode qui rend ce partage efficace.",
    },
    {
      type: "h2",
      text: "Ce que je confie à l’agent",
    },
    {
      type: "p",
      text: "Tout ce qui se vérifie d’un coup d’œil et se corrige facilement revient d’abord à l’agent :",
    },
    {
      type: "list",
      items: [
        "Les écrans et la mise en page. Si une page a mauvaise allure, je le vois tout de suite.",
        "Les formulaires, les messages de validation et les états vides, une fois que j’ai dit ce qu’ils doivent afficher.",
        "Le branchement aux données : appels d’API, récupération des données, états de chargement et d’erreur.",
        "Les refactorisations couvertes par un vérificateur de types, comme renommer des fichiers ou découper un composant.",
        "Les premières versions des tests, que je relis ensuite ligne par ligne.",
      ],
    },
    {
      type: "p",
      text: "Le principe est toujours le même : le résultat se vérifie facilement, et une mauvaise réponse ne fait pas de dégâts avant que je la repère.",
    },
    {
      type: "h2",
      text: "Ce que je garde",
    },
    {
      type: "p",
      text: "Certaines décisions sont vite codées, mais coûtent cher si on les prend mal. Celles-là, je les prends moi-même, même lorsque l’agent écrit le code qui en découle.",
    },
    {
      type: "list",
      items: [
        "Qui peut voir et modifier quelles données. Les règles d’accès découlent de ce que le produit promet à ses utilisateurs, et l’agent ne peut pas connaître cette promesse. J’écris la règle en mots simples, puis je vérifie que la politique la respecte.",
        "Tout ce qui déplace de l’argent. Je décide des états dans lesquels un paiement peut se trouver, des passages autorisés d’un état à l’autre, et de ce qui se passe lors d’une nouvelle tentative, d’un doublon ou d’un montant partiel. L’agent écrit du code pour respecter ces règles, pas pour les inventer.",
        "Les changements qu’on ne peut pas annuler, comme supprimer des données ou restructurer une table de production. Je relis chacun d’eux avant son exécution.",
        "Ce qui sort du périmètre. Un agent construira sans hésiter les trois prochaines fonctionnalités que vous n’avez pas demandées. Dire non reste mon travail.",
        "Ce que le produit dit aux gens. Une phrase sur un écran de confirmation ou dans un e-mail de rappel est une promesse. J’écris ou je valide moi-même ce texte.",
      ],
    },
    {
      type: "note",
      text: "Un test que j’applique : si une mauvaise réponse serait invisible dans une démo, mais visible pour un utilisateur une semaine plus tard, je ne confie pas la décision à l’agent.",
    },
    {
      type: "h2",
      text: "Écrire la règle avant le code",
    },
    {
      type: "p",
      text: "L’habitude la plus utile que j’ai prise est de rédiger un court ticket avant de formuler une demande à l’agent. Il comporte quatre parties : le contexte, ce que l’utilisateur doit pouvoir faire, ce qui est hors périmètre, et les critères d’acceptation, c’est-à-dire les vérifications qui me disent que c’est terminé. Pas de noms de fichiers ni de code, seulement le produit.",
    },
    {
      type: "code",
      lang: "text",
      code: `Objectif : un client peut annuler une réservation depuis l’application.

Hors périmètre : remboursements, modification du créneau, annulation par l’administration.

Terminé lorsque :
- L’annulation est possible jusqu’à 24 h avant le créneau, mais plus après.
- Le créneau redevient réservable immédiatement.
- Le client reçoit un message de confirmation avec la date et l’heure du créneau.
- Annuler deux fois n’a aucun effet la seconde fois.`,
    },
    {
      type: "p",
      text: "Cela prend dix minutes, et cela change le résultat de l’agent plus que n’importe quelle formule astucieuse. Cela me donne aussi quelque chose à vérifier. Sans lui, je finis par juger le code sur son air raisonnable, et c’est exactement le piège.",
    },
    {
      type: "h2",
      text: "Donner à l’agent les règles de la maison",
    },
    {
      type: "p",
      text: "Chaque projet sur lequel je travaille a un petit fichier d’instructions à la racine, que l’agent lit avant de commencer. Il n’est pas long. Il explique comment lancer et vérifier le projet, où se trouvent les choses, et les conventions dont un nouveau coéquipier aurait besoin dès le premier jour : quels composants peuvent s’exécuter dans le navigateur, comment les fichiers sont nommés, quel niveau d’accessibilité est jugé suffisant, et quelles commandes ne jamais lancer.",
    },
    {
      type: "p",
      text: "Ce fichier n’a rien de passionnant, et il me fait gagner plus de temps que tout le reste. Il transforme aussi les remarques de relecture répétées en règle : si je corrige deux fois la même chose, je l’ajoute au fichier.",
    },
    {
      type: "h2",
      text: "Vérifier, ne pas croire sur parole",
    },
    {
      type: "p",
      text: "Un agent qui dit « terminé » ne m’a encore rien appris. Avant d’accepter une modification, le vérificateur de types et le linter doivent réussir, et j’ouvre moi-même le résultat, d’abord sur un écran de la taille d’un téléphone. Pour tout ce qui figure dans la liste « Ce que je garde », je lance aussi à la main la vérification précise du ticket : tenter de lire les données d’un autre utilisateur, annuler deux fois, relancer une étape de paiement.",
    },
    {
      type: "p",
      text: "Je lis chaque diff qui touche aux accès, à l’argent ou à la suppression. Je survole le reste. C’est tout l’intérêt de cette répartition : tout relire avec la même attention, c’est relire moins bien les parties à risque.",
    },
    {
      type: "h2",
      text: "Ce que cela change dans le métier",
    },
    {
      type: "p",
      text: "Je me présente comme ingénieur produit, et c’est parce que le code coûte peu que ce titre n’a jamais été aussi juste. Autrefois, l’écriture du code prenait l’essentiel de ma journée. Aujourd’hui, l’essentiel de mon temps passe à décider ce que le produit doit promettre, à l’écrire assez clairement pour le vérifier, puis à le vérifier. L’agent est rapide. Mon travail consiste à m’assurer qu’il avance dans la bonne direction.",
    },
  ],
};
