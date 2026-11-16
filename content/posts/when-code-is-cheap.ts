import type { Post } from "@/lib/posts";

export const whenCodeIsCheap: Post = {
  slug: "product-engineering-when-code-is-cheap",
  title: "Product engineering when code is cheap",
  description:
    "AI agents now write most of my code. Here is what I still do by hand, and the setup that keeps the rest safe to delegate.",
  category: "Product Engineering",
  date: "2026-11-16",
  blocks: [
    {
      type: "p",
      text: "A year ago, the slow part of building a feature was typing it. Today an AI coding agent can write a form, a settings page or an API route in minutes. I use agents every day, on web and mobile products, and most of the code I ship now starts as something an agent wrote.",
    },
    {
      type: "p",
      text: "That doesn't mean the job got smaller. It moved. When code is cheap, the expensive part is deciding what the code should do, and checking that it does it. This post is the concrete version of that idea: what I hand to an agent, what I keep, and the small setup that makes the split work.",
    },
    {
      type: "h2",
      text: "What I hand to the agent",
    },
    {
      type: "p",
      text: "Anything where a mistake is visible and cheap to fix goes to the agent first:",
    },
    {
      type: "list",
      items: [
        "Screens and layout. If a page looks wrong, I see it right away.",
        "Forms, validation messages and empty states, once I've said what they should say.",
        "Wiring: API calls, data fetching, loading and error states.",
        "Refactors covered by a type checker, such as renaming files or splitting a component.",
        "First drafts of tests, which I then read line by line.",
      ],
    },
    {
      type: "p",
      text: "The pattern is the same each time. The result is easy to look at, and a wrong result does no harm before I catch it.",
    },
    {
      type: "h2",
      text: "What I keep",
    },
    {
      type: "p",
      text: "Some decisions are cheap to type and expensive to get wrong. Those I make myself, even when the agent writes the code that follows from them.",
    },
    {
      type: "list",
      items: [
        "Who can see and change which data. Access rules come from what the product promises its users, and the agent can't know that promise. I write the rule in plain words, then check the policy against it.",
        "Anything that moves money. I decide which states a payment can be in, which moves between them are allowed, and what happens on a retry, a duplicate or a partial amount. The agent writes code to satisfy those rules, not to invent them.",
        "Changes that can't be undone, such as deleting data or reshaping a production table. I read every one of these before it runs.",
        "What is out of scope. An agent will happily build the next three features you didn't ask for. Saying no is still my job.",
        "What the product says to people. A sentence on a confirmation screen or in a reminder email is a promise. I write or approve that copy myself.",
      ],
    },
    {
      type: "note",
      text: "A quick test I use: if a wrong answer would be invisible in a demo but visible to a user a week later, I don't delegate the decision.",
    },
    {
      type: "h2",
      text: "Write the rule before the code",
    },
    {
      type: "p",
      text: "The most useful habit I've built is writing a short ticket before I prompt anything. It has four parts: the context, what the user should be able to do, what is out of scope, and acceptance criteria, meaning the checks that tell me it's done. No file names and no code, just the product.",
    },
    {
      type: "code",
      lang: "text",
      code: `Goal: a customer can cancel a booking from the app.

Out of scope: refunds, rescheduling, admin-side cancellation.

Done when:
- Cancelling is possible up to 24h before the slot, not after.
- The slot becomes bookable again right away.
- The customer gets a confirmation message with the slot and time.
- Cancelling twice does nothing the second time.`,
    },
    {
      type: "p",
      text: "This takes ten minutes, and it changes the agent's output more than any clever prompt. It also gives me something to review against. Without it, I end up judging the code by whether it looks reasonable, which is exactly the trap.",
    },
    {
      type: "h2",
      text: "Give the agent the house rules",
    },
    {
      type: "p",
      text: "Every project I work on has a small instructions file at the root that the agent reads before it starts. It isn't long. It says how to run and check the project, where things live, and the conventions a new teammate would need on day one: which components are allowed to run in the browser, how files are named, what counts as accessible enough, and which commands not to run.",
    },
    {
      type: "p",
      text: "This file is boring, and it saves more time than anything else I do. It also turns repeated review comments into a rule. When I correct the same thing twice, it goes in the file.",
    },
    {
      type: "h2",
      text: "Verify, don't trust",
    },
    {
      type: "p",
      text: "An agent that says \"done\" has told you nothing yet. Before I accept a change, the type checker and the linter have to pass, and I open the result myself, on a phone-sized screen first. For anything in the second list above, I also run the specific check from the ticket by hand: try to read another user's data, cancel twice, retry a payment step.",
    },
    {
      type: "p",
      text: "I read every diff that touches access, money or deletion. I skim the rest. That split is the whole point. Reviewing everything equally means reviewing the risky parts less carefully.",
    },
    {
      type: "h2",
      text: "What this means for the job",
    },
    {
      type: "p",
      text: "The title I use is product engineer, and cheap code is the reason it fits better than ever. Typing used to fill most of my day. Now most of it goes to deciding what the product should promise, writing that down clearly enough to check, and checking it. The agent is fast. My job is to make sure it is fast in the right direction.",
    },
  ],
};
