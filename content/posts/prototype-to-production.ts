import type { Post } from "@/lib/posts";

export const prototypeToProduction: Post = {
  slug: "from-prototype-to-production",
  title: "From prototype to production: what an AI-built MVP still needs",
  description:
    "An app built over a weekend can look finished and still not be ready for paying customers. Here is what is usually missing.",
  category: "Product Engineering",
  date: "2026-11-16",
  blocks: [
    {
      type: "p",
      text: "Over a weekend, you can now describe an app to an AI app builder or a coding agent and get back something you can click through. Sign-up works, the dashboard shows numbers, and it looks like a real product. Founders often show me one of these and ask whether it is almost ready to charge for.",
    },
    {
      type: "p",
      text: "Usually it is close in looks and far in the parts nobody sees. The gap between “it works on my screen” and “people can pay for it” is about what happens when someone else uses the app, with messy data, on a slow phone, or with a card that gets declined. I work on this gap for founders. Each item below comes with a quick way to check it.",
    },
    {
      type: "h2",
      text: "Who can see which data",
    },
    {
      type: "p",
      text: "Many AI-built apps keep their data in a hosted database, often Supabase or Postgres. In a demo, the only thing separating one user from another user's data is the screen you see. That is not a lock. Anyone can open the browser's developer tools and ask the database directly for every row. The fix is a set of access rules inside the database, called row-level security. It is a rule that decides, row by row, who may read or change each record. Without it, a logged-in user can often read every customer's email address.",
    },
    {
      type: "p",
      text: "To check, log in as one test user, then try to fetch a record that belongs to another test user. Use the browser's network tab or a plain request with your own key. If the record comes back, the rules are missing. I keep a longer row-level security checklist for this. The short rule: every table holding user data needs rules for reading, writing and deleting, written before the screens.",
    },
    {
      type: "h2",
      text: "Secrets in the browser",
    },
    {
      type: "p",
      text: "The browser downloads a JavaScript bundle to run the app, and anything inside it is public. Some keys are meant to be public, such as a database's anonymous key, as long as the access rules above are in place. Others are not. A payment provider's secret key, an email service key or an admin token in the bundle means anyone who opens the page can act as your account.",
    },
    {
      type: "p",
      text: "In Next.js, an environment variable (a value stored outside the code, such as a key) is only sent to the browser if its name starts with NEXT_PUBLIC_. To check, search your source for the prefix of each secret key:",
    },
    {
      type: "code",
      lang: "bash",
      code: `grep -rn "sk_live_" app components lib`,
    },
    {
      type: "p",
      text: "If anything shows up outside a server-only file, move that call to the server and rotate the key in the provider's dashboard. A key that was public for even an hour should be treated as leaked.",
    },
    {
      type: "h2",
      text: "Sign-in edge cases",
    },
    {
      type: "p",
      text: "Sign-up is only the first path. Real users forget their password, change their email, sign in on two devices and leave a tab open for a week. Test each one by hand:",
    },
    {
      type: "list",
      items: [
        "Password reset: request it, open the link in a private window, set a new password, and check that the old password no longer works.",
        "Reset links: a link should work once. Opening it a second time should show a clear message, not a blank page.",
        "Email change: the new address should be confirmed before it replaces the old one, and the old address should get a notice.",
        "Session expiry: sign out in one tab, then click a button in another. The app should send the user to sign in again, not show a broken screen.",
      ],
    },
    {
      type: "h2",
      text: "Payments: webhooks, declines and refunds",
    },
    {
      type: "p",
      text: "A webhook is a message that your payment provider sends to an address on your server when something happens, such as a completed payment. The demo often checks the payment on the screen, and that is not enough. The page can close early, the user can refresh, and the browser can lose the connection. Your server should grant access only after the webhook arrives and its signature checks out. The signature is a code that proves the message really came from the provider.",
    },
    {
      type: "list",
      items: [
        "Failed renewals: a card can be declined weeks after sign-up. Decide what happens to access during the retry period, then test it with the provider's test cards.",
        "Refunds and cancellations: access should change when the provider reports them, not only when someone presses a button in your admin screen.",
        "Test and live keys: test keys do not move real money. Confirm that production uses live keys and that no test key is set there.",
        "Duplicates: the same webhook can arrive twice. Handling it twice should not grant access twice or send two emails.",
      ],
    },
    {
      type: "h2",
      text: "Errors and empty states",
    },
    {
      type: "p",
      text: "A demo shows the happy path with data already in place. Real users open an empty account, upload a file that is far too large, or lose their connection halfway through a form. Every main screen needs three answers: what it shows with no data, what it shows while loading, and what it shows when something fails. A blank page or a spinner that never stops usually means these states were skipped.",
    },
    {
      type: "p",
      text: "To check, turn off Wi-Fi and click through each main screen. Then open a brand-new account and do the same.",
    },
    {
      type: "h2",
      text: "Backups and a migration history",
    },
    {
      type: "p",
      text: "A migration is a saved file that describes one change to the database, such as adding a column. If changes are made by clicking in the dashboard, nobody can see what changed, and nobody can rebuild the same setup on a second database. Keep the changes as files in git, the tool that records your code history, so they can be replayed on a fresh database.",
    },
    {
      type: "p",
      text: "Check that backups run, then restore one into a scratch project at least once. A backup you have never restored is a hope, not a backup.",
    },
    {
      type: "h2",
      text: "Logs and error tracking",
    },
    {
      type: "p",
      text: "If an error only happens on a user's phone, you will hear about it from an angry email unless something records it. Add an error tracker, a service that collects crashes from the live app and tells you about them. Then trigger one error on purpose and confirm it arrives. Keep personal data out of these logs. An email address inside an error message is still personal data.",
    },
    {
      type: "h2",
      text: "Staging and production",
    },
    {
      type: "p",
      text: "Production is the live app that real users and real payments touch. Staging is a copy of it where changes are tried first. Without staging, the first place a change is tested is the place where it can hurt people. Two separate databases, two sets of keys and two deploy targets are enough. Never point staging at the production database, and never let test data leak into production.",
    },
    {
      type: "h2",
      text: "Legal basics",
    },
    {
      type: "p",
      text: "Before you charge money, you need a privacy policy, which says what data you collect and why, and terms of service, which set the rules for using the product. I am not a lawyer, and the right wording depends on where you operate and who your customers are. Ask a professional to review both, and link them in the footer from the start.",
    },
    {
      type: "h2",
      text: "Speed on a mid-range phone",
    },
    {
      type: "p",
      text: "Your laptop is not your customer's phone. Open the app on a mid-range Android phone, or use the browser's throttling setting to simulate a slow connection. Look for large images, a heavy chart library loaded on every page, and lists that draw a thousand rows at once. The first screen matters most, because that is where people decide to stay.",
    },
    {
      type: "h2",
      text: "A rollback plan",
    },
    {
      type: "p",
      text: "Before each release, know how you would undo it. Most hosting platforms can return to the previous deploy in a few clicks. The database is harder. A migration that drops a column cannot be undone by redeploying the old code. Write the rollback steps down once, and keep destructive changes in a separate release, so each release is easy to reverse.",
    },
    {
      type: "h2",
      text: "How I would triage it in a week",
    },
    {
      type: "p",
      text: "If you have one week and a working prototype, this is roughly the order I use. It is not a full audit. It is a first pass that prevents the worst surprises.",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Day 1: access rules and secrets. Fix anything a stranger could read or change. This is the only group of problems that can hurt people before you notice them.",
        "Day 2: sign-in and payments. Confirm that access comes from the webhook, that failed and duplicate events are handled, and that the reset and email-change paths work.",
        "Day 3: migrations, backups and a staging copy. Move database changes into files and prove you can restore.",
        "Day 4: errors and empty states. Add error tracking, then walk every screen with no data and with no connection.",
        "Day 5: phone speed, legal pages and a rollback note. Fix the slowest screen first.",
      ],
    },
    {
      type: "p",
      text: "What can wait: visual polish, animations, new features, and the admin screens that only you use. They matter, but none of them will lose a customer's data or money.",
    },
    {
      type: "h2",
      text: "The prototype is the spec",
    },
    {
      type: "p",
      text: "The prototype was not wasted. It showed you what the product should do, which screens people need, and which words they understand. That is your spec, and it is worth keeping. The remaining work is making the parts users never see behave as well as the parts they do. Start with the access rules, and the rest becomes much easier to plan.",
    },
  ],
};
