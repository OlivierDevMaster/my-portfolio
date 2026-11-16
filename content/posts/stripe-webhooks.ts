import type { Post } from "@/lib/posts";

export const stripeWebhooks: Post = {
  slug: "stripe-webhooks-without-double-charges",
  title: "Stripe webhooks without double charges",
  description:
    "How I make each Stripe webhook event change my system exactly once, covering signature checks, duplicate events and events that arrive out of order.",
  category: "Payments",
  date: "2026-11-16",
  blocks: [
    {
      type: "p",
      text: "A webhook is a message that Stripe sends to a URL on your server when something happens. A payment succeeds, a subscription renews, a refund fails. Your server does not ask for it. Stripe calls you. That is useful, and it is also where most payment bugs I have seen come from. Stripe may send the same message twice, send messages out of order, or send a fake one from someone who found your URL.",
    },
    {
      type: "p",
      text: "The goal is simple to state. Each event should change my system exactly once, no matter how many times it arrives or in what order. The rest of this post is the checks I put around that goal. The examples use the Next.js App Router, with a route handler at `app/api/stripe/webhook/route.ts`. The code is a sketch, not a finished handler.",
    },
    {
      type: "h2",
      text: "1. Verify the signature on the raw body",
    },
    {
      type: "p",
      text: "Stripe signs every webhook with a secret that only Stripe and your server know. The signature arrives in the `Stripe-Signature` header. The check needs the exact bytes Stripe sent. If you parse the body as JSON first and then stringify it again, the bytes change, and the check fails even for real events. So I read the body as text and pass that text to the library.",
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

  // The checks below run only on events that passed verification.
  return NextResponse.json({ received: true });
}`,
    },
    {
      type: "p",
      text: "If verification fails, return a 400 and do nothing else. Do not log the body as trusted data. Stripe's docs warn against any middleware that changes the raw body, so check your framework setup if verification fails on real events.",
    },
    {
      type: "h2",
      text: "2. Store each event ID and skip repeats",
    },
    {
      type: "p",
      text: "Stripe's docs say that a webhook endpoint can receive the same event more than once. Failed deliveries are also retried. In live mode, Stripe keeps trying for up to three days, with the gaps between tries growing each time. So the same event will reach me again, sometimes days later.",
    },
    {
      type: "p",
      text: "The fix is a table of event IDs with a unique constraint. The ID `event.id` is the one to store. Before applying an event, I try to insert its ID. If the insert does nothing, I have seen this event already, and I stop.",
    },
    {
      type: "code",
      lang: "sql",
      code: `create table stripe_events (
  id text primary key,          -- event.id, for example "evt_..."
  type text not null,
  received_at timestamptz not null default now()
);`,
    },
    {
      type: "code",
      lang: "ts",
      code: `// Schematic: \`db\` is your database client, with a query method.
const result = await db.query(
  "insert into stripe_events (id, type) values ($1, $2) on conflict (id) do nothing returning id",
  [event.id, event.type]
);

if (result.rows.length === 0) {
  return NextResponse.json({ received: true }); // already processed
}`,
    },
    {
      type: "p",
      text: "There is one trap here. If the insert succeeds but the change itself fails, the event is marked as seen and never applied. When the change touches my own database, I put the insert and the change in one transaction, so both happen or neither does. When the change lives outside my database, I store a status column too, and I retry the unfinished ones myself.",
    },
    {
      type: "h2",
      text: "3. Do not trust the order of arrival",
    },
    {
      type: "p",
      text: "Stripe does not promise to send events in the order they happened. A subscription creation can produce several events, and any of them can arrive first. The timestamp is no help either. Snapshot events record `created` in whole seconds, so two events can share one. I never use `created` to decide which event is newer.",
    },
    {
      type: "p",
      text: "Instead, I treat each event as a hint and read the current state before I act. If `invoice.paid` arrives before the subscription event I expected, I fetch the invoice and the subscription from the API and use what they say now. If the object is in a state that makes my change wrong, I skip the change and log why.",
    },
    {
      type: "code",
      lang: "ts",
      code: `// Schematic: fetch the current state instead of trusting the event's snapshot.
const invoice = await stripe.invoices.retrieve(invoiceId);

if (invoice.status === "paid") {
  await markOrderPaid(invoice.metadata.order_id);
}`,
    },
    {
      type: "h2",
      text: "4. Answer fast and do the slow work later",
    },
    {
      type: "p",
      text: "Stripe expects a 2xx response quickly. If my handler takes too long, Stripe counts a timeout as a failure and sends the event again. A large batch of renewals on the first of the month can make this happen. So the route handler does three things: verify, record the event ID, and put the work on a queue or a background job. Then it returns 200. The queue runs the slow part, such as sending an email or updating an accounting system.",
    },
    {
      type: "h2",
      text: "5. The webhook is the source of truth, not the redirect",
    },
    {
      type: "p",
      text: "After a customer pays, many checkouts send them back to a success page. That page is useful for a thank-you message, but it is not proof of payment. The browser can be closed before the redirect happens. A person can also type the success URL by hand. So I never mark an order as paid because the success page loaded. I mark it paid when the verified webhook event arrives, or when I fetch the payment from the API and see that it succeeded.",
    },
    {
      type: "h2",
      text: "6. Use idempotency keys on my own outgoing calls",
    },
    {
      type: "p",
      text: "The checks above protect me from Stripe's retries. They do not protect me from my own. If my code times out while creating a refund, I may not know whether Stripe created it. Running the code again would create a second one. An idempotency key stops that. It is a unique string that I send with a create or update request. Stripe uses it to recognize a repeat of the same request and return the first result instead of acting again.",
    },
    {
      type: "p",
      text: "The key goes in the `Idempotency-Key` header, which the Stripe API documents for POST requests. Stripe's docs say it should be a random string, such as a version 4 UUID, of up to 255 characters. Build it from the business action, such as the order ID plus the action name, so the same action always gets the same key. Do not put personal data in it. Stripe's docs also say keys can be pruned after at least 24 hours, so the key protects retries within a short window only.",
    },
    {
      type: "h2",
      text: "7. Separate test and live endpoints",
    },
    {
      type: "p",
      text: "Test and live mode each have their own webhook endpoint and their own signing secret. I keep them in separate environment variables, such as `STRIPE_WEBHOOK_SECRET` for each environment, and I never reuse one secret for both. For local work, the Stripe CLI forwards events from your account to your machine:",
    },
    {
      type: "code",
      lang: "bash",
      code: `stripe listen --forward-to localhost:3000/api/stripe/webhook
# The CLI prints a signing secret for this session. Put it in your local env file.

stripe trigger payment_intent.succeeded`,
    },
    {
      type: "p",
      text: "`stripe trigger` sends a sample event of the type you name. I run each event type my handler supports at least once this way, and I check that the state in my database changes once, not twice, when I trigger the same event again.",
    },
    {
      type: "note",
      text: "A signing secret printed by `stripe listen` is only for that local session. Do not copy it into your production environment.",
    },
    {
      type: "h2",
      text: "8. Subscribe to fewer events, watch the failures",
    },
    {
      type: "p",
      text: "Each event type I subscribe to is one more thing that can fail. Stripe's guidance is to listen only for the types my integration needs. If my handler has no branch for an event type, I should not receive it. For the types I do handle, every unexpected error should be logged with the event ID, and I should get an alert when one fails repeatedly.",
    },
    {
      type: "p",
      text: "Before I launch anything, I open the webhook endpoint in the Stripe dashboard and check the delivery log. It shows each event, whether it was delivered, and the HTTP status my server returned. Any 4xx or 5xx there is a bug to fix first. Redirects also count as failures, so the URL must be the final one.",
    },
    {
      type: "h2",
      text: "Why I write this part myself",
    },
    {
      type: "p",
      text: "An AI coding agent can write a route handler in a few minutes, and the handler will look correct. It can insert the event ID, call the API, and return 200. What it cannot decide is what \"exactly once\" should mean for each event. Should a refund event reopen an order? Should a failed payment email the customer? Those answers depend on what I promise the people who pay me.",
    },
    {
      type: "p",
      text: "So I keep that part as my own work. I write down, for each event type, what it may change and what it must never change. I write the tests that send the same event twice and out of order. The agent can type the handler. I decide what the handler is allowed to do.",
    },
  ],
};
