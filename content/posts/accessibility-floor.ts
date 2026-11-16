import type { Post } from "@/lib/posts";

export const accessibilityFloor: Post = {
  slug: "the-accessibility-floor-i-ship",
  title: "The accessibility floor I ship on every project",
  description:
    "The short list of accessibility rules I apply on every project, so accessibility is part of the first draft and not a late audit.",
  category: "Frontend",
  date: "2026-11-16",
  blocks: [
    {
      type: "p",
      text: "Accessibility is easy to postpone. A team ships, then pays for an audit a few months later, and by then the fixes touch half the components. I stopped working that way. Every project I work on has a floor: a short list of rules that nothing ships below. A floor is the minimum, not the goal. It is cheap to keep and expensive to retrofit.",
    },
    {
      type: "p",
      text: "This post lists the rules, the numbers behind them, and how I check them. The rules are the same ones written in the instructions file of my projects, so the code and the notes agree.",
    },
    {
      type: "h2",
      text: "Text contrast",
    },
    {
      type: "p",
      text: "Contrast is the difference in brightness between text and the background behind it. It is written as a ratio, from 1:1 (no difference) to 21:1 (black on white). The WCAG (Web Content Accessibility Guidelines, the standard published by the W3C) asks for at least 4.5:1 for normal-sized text at level AA.",
    },
    {
      type: "p",
      text: "My rule is that text is never lighter than `text-gray-500` on a white background. That color is #6b7280, which gives a ratio of 4.83:1. The next step down, `text-gray-400`, is #9ca3af, which gives 2.54:1 and fails. The gap looks small on a good monitor and is hard to read on a phone in daylight.",
    },
    {
      type: "code",
      lang: "tsx",
      code: `// Above the floor: 4.83:1 on white
<p className="text-gray-500">Last updated in March</p>

// Below the floor: 2.54:1 on white
<p className="text-gray-400">Last updated in March</p>`,
    },
    {
      type: "p",
      text: "The floor applies to the lightest text I allow. A muted caption is still text, so it gets the same check.",
    },
    {
      type: "h2",
      text: "Small labels and tap targets",
    },
    {
      type: "p",
      text: "I use small uppercase labels a lot, so they have a size floor of `text-[11px]`. This one is my own rule, not a WCAG number. Labels smaller than that are easy to miss, especially on a phone.",
    },
    {
      type: "p",
      text: "Tap targets are the things a finger presses: buttons, links and menu items. The WCAG gives two numbers for them. Success criterion 2.5.8, at level AA, asks for at least 24 by 24 CSS pixels. CSS pixels are the unit a web page uses for layout, not a physical measurement of the screen. Success criterion 2.5.5, at level AAA, the strictest level, asks for 44 by 44. I use 44 on purpose. A thumb is much less precise than a mouse pointer, and the extra room costs little.",
    },
    {
      type: "p",
      text: "A text link can stay small on screen while its box is 44 pixels tall. Padding usually does that work, so the visible design does not have to change.",
    },
    {
      type: "h2",
      text: "Decorative icons and motion",
    },
    {
      type: "p",
      text: "A screen reader is software that reads the page out loud for people who cannot see it. It announces every element it finds. An icon next to a label adds nothing for that reader, so I hide the icon from it:",
    },
    {
      type: "code",
      lang: "tsx",
      code: `<Mail aria-hidden="true" className="h-4 w-4" />`,
    },
    {
      type: "p",
      text: "Motion is the second part. Some people get dizzy or distracted by moving pages, and browsers expose a setting for that. The global CSS in my projects respects it. Smooth scrolling is only switched on when the person has not asked for less motion:",
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
      text: "Component animations get the same treatment through Tailwind's `motion-reduce:` variant, which switches an animation off under that setting.",
    },
    {
      type: "h2",
      text: "Focus, links and buttons",
    },
    {
      type: "p",
      text: "Keyboard users move through a page with the Tab key, and they need to see where they are. Every project's global CSS sets one focus ring, so no single component has to remember it:",
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
      text: "`:focus-visible` is a CSS selector that matches when the browser decides the focus should be visible. In practice that means keyboard focus, not every mouse click.",
    },
    {
      type: "p",
      text: "Two more rules keep the page honest. First, a link goes somewhere and a button does something. Use the element that matches, because keyboards and screen readers treat them differently. Second, anything that is not clickable is never styled as a link. A project without a public address is a plain row marked Private, with no underline and no arrow. An arrow tells the reader there is somewhere to go, so it only appears where there is.",
    },
    {
      type: "h2",
      text: "The skip link and semantic HTML",
    },
    {
      type: "p",
      text: "Semantic HTML means using the element that says what the content is: `nav` for navigation, `main` for the page content, `button` for an action. Screen readers build a list of these landmarks, so a reader can jump straight to the part they want. Every page also starts with a skip link, hidden until someone presses Tab, which jumps past the navigation to the content:",
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
      text: "The link only works if the page has a target, so every page renders its content inside a `main` element with the id `main`.",
    },
    {
      type: "h2",
      text: "How I check it",
    },
    {
      type: "p",
      text: "Rules only help if I test them. Before I call a page done, I go through this list:",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Keyboard only. I put the mouse away and press Tab through the whole page. Every link and button should show the focus ring, in an order that matches the layout, and everything should be usable without a pointer.",
        "Zoom to 200 percent. The text should stay readable, and nothing should be cut off or overlap.",
        "A 390 pixel wide screen, about the width of a common phone. There should be no horizontal scrolling, and every tap target should be easy to hit with a thumb.",
        "Reduced motion turned on in the operating system. The animations should stop, and nothing on the page should depend on them.",
        "An automated checker. This is a tool that scans the page for common mistakes, such as low contrast or missing labels. It is useful, and it catches only part of the problems. It cannot tell whether the page makes sense when read aloud, so it supplements the manual pass and never replaces it.",
      ],
    },
    {
      type: "note",
      text: "A checker that reports no problems means it found none. It does not mean the page is accessible.",
    },
    {
      type: "p",
      text: "In many markets, accessibility is also becoming a legal expectation, which is one more reason to set the floor early.",
    },
    {
      type: "h2",
      text: "Why the floor lives in the instructions file",
    },
    {
      type: "p",
      text: "Most of the code in my projects now starts as something an AI coding agent wrote. These agents read the project's instructions file before they start, so the floor is written there in plain words: the contrast color, the label size, the 44 pixel targets, the focus ring, and the rules for icons and motion. A new component starts above the floor without anyone having to remember the rules.",
    },
    {
      type: "p",
      text: "When a review finds a miss, the rule goes into the file, the same way every other repeated correction does. The floor will not make a page accessible on its own. It makes the first draft much closer, and it makes the checks above shorter.",
    },
  ],
};
