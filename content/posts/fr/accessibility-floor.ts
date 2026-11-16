import type { Post } from "@/lib/posts";

export const accessibilityFloor: Post = {
  slug: "the-accessibility-floor-i-ship",
  title: "Le plancher d’accessibilité de chaque projet",
  description:
    "La courte liste de règles d’accessibilité que j’applique à chaque projet, pour qu’elle fasse partie du premier jet et non d’un audit tardif.",
  category: "Frontend",
  date: "2026-11-16",
  blocks: [
    {
      type: "p",
      text: "L’accessibilité est facile à reporter. Une équipe livre, puis paie un audit quelques mois plus tard, et les correctifs touchent alors la moitié des composants. J’ai cessé de travailler ainsi. Chaque projet a un plancher : une courte liste de règles, et rien n’est livré en dessous. Le plancher est un minimum, pas un objectif. Il coûte peu à tenir et cher à rattraper plus tard.",
    },
    {
      type: "p",
      text: "Cet article présente les règles, les chiffres qui les sous-tendent et la façon dont je les vérifie. Ce sont les mêmes règles que celles écrites dans le fichier d’instructions de mes projets, pour que le code et les notes concordent.",
    },
    {
      type: "h2",
      text: "Contraste du texte",
    },
    {
      type: "p",
      text: "Le contraste est la différence de luminosité entre le texte et le fond qui se trouve derrière lui. Il s’exprime sous forme de rapport de contraste, de 1:1 (aucune différence) à 21:1 (noir sur blanc). Les WCAG (Web Content Accessibility Guidelines, la norme publiée par le W3C sur l’accessibilité du contenu web) demandent un rapport de contraste d’au moins 4,5:1 pour le texte de taille normale, au niveau AA.",
    },
    {
      type: "p",
      text: "Ma règle est que le texte n’est jamais plus pâle que `text-gray-500` sur fond blanc. Cette couleur est #6b7280, qui donne un rapport de contraste de 4,83:1. Le cran suivant, `text-gray-400`, correspond à #9ca3af, qui donne 2,54:1 et échoue. L’écart semble petit sur un bon écran, mais il devient difficile à lire sur un téléphone en plein jour.",
    },
    {
      type: "code",
      lang: "tsx",
      code: `// Au-dessus du plancher : 4,83:1 sur blanc
<p className="text-gray-500">Last updated in March</p>

// Sous le plancher : 2,54:1 sur blanc
<p className="text-gray-400">Last updated in March</p>`,
    },
    {
      type: "p",
      text: "Le plancher s’applique au texte le plus pâle que j’autorise. Une légende discrète reste du texte, donc elle passe le même contrôle.",
    },
    {
      type: "h2",
      text: "Petites étiquettes et zones tactiles",
    },
    {
      type: "p",
      text: "J’utilise souvent de petites étiquettes en majuscules, donc elles ont une taille minimale de `text-[11px]`. Cette règle est la mienne, pas un chiffre des WCAG. Des étiquettes plus petites passent facilement inaperçues, surtout sur un téléphone.",
    },
    {
      type: "p",
      text: "Les zones tactiles sont les éléments qu’un doigt touche : boutons, liens et éléments de menu. Les WCAG donnent deux chiffres pour elles. Le critère de réussite 2.5.8, au niveau AA, demande au moins 24 × 24 px. Les px sont des pixels CSS, l’unité qu’une page web utilise pour la mise en page, et non une mesure physique de l’écran. Le critère de réussite 2.5.5, au niveau AAA, le plus strict, demande 44 × 44 px. J’ai choisi 44 volontairement. Le pouce est bien moins précis qu’un pointeur de souris, et l’espace supplémentaire coûte peu.",
    },
    {
      type: "p",
      text: "Un lien textuel peut rester petit à l’écran tout en ayant une zone de 44 px de haut. La marge intérieure (padding) fait généralement ce travail, donc le design visible n’a pas à changer.",
    },
    {
      type: "h2",
      text: "Icônes décoratives et animations",
    },
    {
      type: "p",
      text: "Un lecteur d’écran est un logiciel qui lit la page à voix haute pour les personnes aveugles ou malvoyantes. Il annonce chaque élément qu’il trouve. Une icône à côté d’une étiquette n’apporte rien à ce lecteur, donc je la masque au lecteur :",
    },
    {
      type: "code",
      lang: "tsx",
      code: `<Mail aria-hidden="true" className="h-4 w-4" />`,
    },
    {
      type: "p",
      text: "Le mouvement est le second point. Certaines personnes ont des vertiges ou sont gênées par des pages qui bougent, et les navigateurs proposent un réglage pour cela. Le CSS global de mes projets le respecte. Le défilement doux n’est activé que si la personne n’a pas demandé moins de mouvement :",
    },
    {
      type: "code",
      lang: "css",
      code: `@media (prefers-reduced-motion: no-preference) {
  html {
    scroll-behavior: smooth;
  }
}`,
    },
    {
      type: "p",
      text: "Les animations des composants reçoivent le même traitement grâce à la variante `motion-reduce:` de Tailwind, qui désactive une animation sous ce réglage.",
    },
    {
      type: "h2",
      text: "Focus, liens et boutons",
    },
    {
      type: "p",
      text: "Les utilisateurs du clavier parcourent une page avec la touche Tab, et ils doivent voir où ils se trouvent. Le CSS global de chaque projet définit un seul anneau de focus, pour qu’aucun composant n’ait à s’en souvenir :",
    },
    {
      type: "code",
      lang: "css",
      code: `:focus-visible {
  @apply outline-none ring-2 ring-violet-600 ring-offset-2;
}`,
    },
    {
      type: "p",
      text: "`:focus-visible` est un sélecteur CSS qui s’applique lorsque le navigateur juge que le focus doit être visible. En pratique, cela signifie le focus au clavier, et non à chaque clic de souris.",
    },
    {
      type: "p",
      text: "Deux autres règles gardent la page honnête. D’abord, un lien mène quelque part, et un bouton déclenche une action. Utilisez l’élément qui correspond, car le clavier et les lecteurs d’écran ne les traitent pas de la même façon. Ensuite, ce qui n’est pas cliquable n’est jamais mis en forme comme un lien. Un projet sans adresse publique est une simple ligne marquée « Privé », sans soulignement ni flèche. Une flèche signale qu’il y a un endroit où aller, donc elle n’apparaît que là où il y en a un.",
    },
    {
      type: "h2",
      text: "Le lien d’évitement et le HTML sémantique",
    },
    {
      type: "p",
      text: "Le HTML sémantique consiste à choisir l’élément qui décrit ce qu’est le contenu : `nav` pour la navigation, `main` pour le contenu de la page, `button` pour une action. Les lecteurs d’écran construisent une liste de ces repères (landmarks), et un utilisateur peut ainsi sauter directement à la partie qui l’intéresse. Chaque page commence aussi par un lien d’évitement (skip link), caché jusqu’à l’appui sur Tab, qui saute la navigation pour aller directement au contenu :",
    },
    {
      type: "code",
      lang: "tsx",
      code: `<a
  href="#main"
  className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-neutral-950 focus:px-4 focus:py-2 focus:text-sm focus:text-white"
>
  Skip to content
</a>`,
    },
    {
      type: "p",
      text: "Le lien ne fonctionne que si la page possède une cible. Chaque page affiche donc son contenu dans un élément `main` ayant l’identifiant `main`.",
    },
    {
      type: "h2",
      text: "Comment je le vérifie",
    },
    {
      type: "p",
      text: "Les règles ne servent à rien si je ne les vérifie pas. Avant de considérer une page comme terminée, je parcours cette liste :",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Clavier seulement. Je range la souris et j’appuie sur Tab tout au long de la page. Chaque lien et bouton doit afficher l’anneau de focus, dans un ordre qui suit la mise en page, et tout doit être utilisable sans pointeur.",
        "Zoom à 200 %. Le texte doit rester lisible, et rien ne doit être coupé ni se chevaucher.",
        "Un écran de 390 px de large, à peu près la largeur d’un téléphone courant. Il ne doit y avoir aucun défilement horizontal, et chaque zone tactile doit être facile à atteindre avec le pouce.",
        "Mouvement réduit activé dans le système d’exploitation. Les animations doivent s’arrêter, et rien sur la page ne doit en dépendre.",
        "Un vérificateur automatisé. C’est un outil qui analyse la page à la recherche d’erreurs courantes, comme un contraste faible ou des étiquettes manquantes. Il est utile, mais il ne détecte qu’une partie des problèmes. Il ne peut pas dire si la page a du sens lue à voix haute. Il complète la vérification manuelle, sans jamais la remplacer.",
      ],
    },
    {
      type: "note",
      text: "Un vérificateur qui ne signale rien n’a rien trouvé. Cela ne veut pas dire que la page est accessible.",
    },
    {
      type: "p",
      text: "Dans de nombreux pays, l’accessibilité devient aussi une exigence légale, une raison de plus pour poser le plancher tôt.",
    },
    {
      type: "h2",
      text: "Pourquoi le plancher se trouve dans le fichier d’instructions",
    },
    {
      type: "p",
      text: "Une grande partie du code de mes projets est aujourd’hui écrite au départ par un agent de codage IA. Ces agents lisent le fichier d’instructions du projet avant de commencer. Le plancher y est donc écrit en termes simples : la couleur de contraste, la taille des étiquettes, les cibles de 44 px, l’anneau de focus, et les règles pour les icônes et les animations. Un nouveau composant part au-dessus du plancher, sans que personne ait à se souvenir des règles.",
    },
    {
      type: "p",
      text: "Quand une revue relève un oubli, la règle est ajoutée au fichier, comme toute autre correction qui revient. Le plancher ne rend pas une page accessible à lui seul. Il rapproche beaucoup le premier jet de l’objectif, et il raccourcit les vérifications ci-dessus.",
    },
  ],
};
