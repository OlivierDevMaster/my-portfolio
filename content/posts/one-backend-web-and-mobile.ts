import type { Post } from "@/lib/posts";

export const oneBackendWebAndMobile: Post = {
  slug: "one-supabase-backend-web-and-expo",
  title: "One Supabase backend for a web app and an Expo app",
  description:
    "How I share one Supabase project between a Next.js web app and a React Native app built with Expo, and what I keep the same on both sides.",
  category: "System Design",
  date: "2026-11-16",
  blocks: [
    {
      type: "p",
      text: "On products where I ship both a web dashboard and a mobile app, I want one backend, not two. Supabase gives me a Postgres database, login and an API in one project. Postgres is the open-source SQL database underneath. The web app is built with Next.js. The mobile app is built with Expo, a toolkit for React Native, which is a framework for phone apps written in JavaScript or TypeScript. Both apps talk to the same project. That saves a lot of work, but only if I follow a few habits.",
    },
    {
      type: "h2",
      text: "Put the rules in the database",
    },
    {
      type: "p",
      text: "The biggest risk with two clients is that each one enforces rules in its own way. The web form checks that an order total is not negative, the phone app forgets, and now there are bad rows. I avoid that by putting the rules where both clients must pass: in the database. The main tool is row-level security (RLS), which holds Postgres rules about which rows a user may read or change. Constraints, which are checks stored on the table, cover the rest.",
    },
    {
      type: "code",
      lang: "sql",
      code: `alter table public.orders
  add constraint total_not_negative check (total >= 0);`,
    },
    {
      type: "p",
      text: "A constraint like this fails the same way whichever app sends the insert. Neither app needs its own copy of the check. The same goes for logic that is more than one check, such as moving an order to its next status. I write that as a Postgres function and both apps call it by name. Calling a stored function over the API is a remote procedure call, or RPC. With the Supabase client it looks like this.",
    },
    {
      type: "code",
      lang: "ts",
      code: `const { error } = await supabase.rpc("advance_order", { order_id: id });`,
    },
    {
      type: "h2",
      text: "Share the generated types",
    },
    {
      type: "p",
      text: "The Supabase CLI can read your schema and write a TypeScript file that describes every table. The command below reads the hosted project linked to the repo. For the local database, use `--local` instead.",
    },
    {
      type: "code",
      lang: "bash",
      code: `npx supabase gen types typescript --linked > database.types.ts`,
    },
    {
      type: "p",
      text: "I keep that file in one shared folder, such as packages/db in a monorepo (one repository that holds several projects), and import it from both apps. When I rename a column, the build breaks in both apps at once. That is what I want, because I would rather find the problem on my laptop than in a user's hands. I regenerate the file after every migration, never only when I remember. A script in package.json makes that one command.",
    },
    {
      type: "h2",
      text: "Keep migrations in the repo",
    },
    {
      type: "p",
      text: "A migration is a numbered SQL file that changes the schema. The CLI creates an empty one for me, and I write the SQL in it. Then I apply it to my local database and rebuild that database from all the migrations when I need a clean start.",
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
      text: "The first command makes a file in supabase/migrations. The second applies pending migrations locally. The third drops and rebuilds the local database from every migration and the seed file. The last one sends the migrations to the hosted project.",
    },
    {
      type: "p",
      text: "The rule I follow is simple: no schema changes by clicking in the dashboard. If I change a table in the SQL editor, the history in the repo no longer matches the database, and the next push fails with a sync error. If I do try something in the local dashboard, I capture it with supabase db diff and commit the result.",
    },
    {
      type: "note",
      text: "Pushing with --include-seed also loads the seed file into the hosted database. Keep test users and sample rows out of that file, or they end up in production.",
    },
    {
      type: "h2",
      text: "Auth works differently on each client",
    },
    {
      type: "p",
      text: "Both apps use the same user accounts, but they keep the login session in different places. The web app runs on a Next.js server and in the browser, so the session lives in cookies, which are small files the browser sends with each request. I use @supabase/ssr for this. It gives me one client for the browser and one for server code, such as route handlers, and both read the same cookies.",
    },
    {
      type: "p",
      text: "A phone has no cookies. The session is a pair of tokens that the Supabase client stores wherever I tell it to. Supabase's Expo quickstart uses a localStorage polyfill (a small library that fakes the browser's localStorage API) backed by expo-sqlite. Plain AsyncStorage, which older examples use, is not encrypted. For the session, I prefer expo-secure-store, which keeps values in the iOS Keychain and the Android Keystore.",
    },
    {
      type: "p",
      text: "SecureStore has a size problem. Expo does not enforce a limit, but its docs warn that large values can be rejected and that some iOS releases historically refused values above roughly 2048 bytes. A Supabase session can grow past that once the user data is included. One fix is to split the session into numbered chunks, each stored under its own key, and join them on read. The other is the pattern Supabase's own Expo tutorial uses: keep a random encryption key in SecureStore and the encrypted session in AsyncStorage. Either works. Test with a real account that has a long session.",
    },
    {
      type: "p",
      text: "The client itself is set up the same way on any platform, with auth options and a listener for when the app moves to the foreground or the background.",
    },
    {
      type: "code",
      lang: "ts",
      code: `import { AppState } from "react-native";
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(supabaseUrl, publishableKey, {
  auth: {
    storage: secureStorage, // a SecureStore-backed storage adapter
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
      text: "Automatic token refresh needs the app to be running. The phone pauses background work anyway, so the listener starts refreshing when the app comes to the front and stops when it leaves. Register it once, at the top level of the app, not inside a screen. detectSessionInUrl is for reading tokens from a web address, which a phone does not have, so I turn it off.",
    },
    {
      type: "h2",
      text: "Deep links for magic links and OAuth",
    },
    {
      type: "p",
      text: "A magic link (an email with a sign-in button) and an OAuth login (Google or Apple) both end by sending the user back to a URL. On the web, that URL is a page on my site. On the phone, it is a deep link, which is a URL that opens my app. I give the app a URL scheme under the `scheme` key in its Expo config, then add that scheme URL to the Redirect URLs allow list in the Supabase Auth settings. I pass the same URL when I start the sign-in: `emailRedirectTo` for a magic link, `redirectTo` for OAuth. `makeRedirectUri()` from `expo-auth-session` builds it for me.",
    },
    {
      type: "p",
      text: "The redirect has to match an entry on that list. When a mobile sign-in seems to do nothing, a missing or mistyped entry is the first thing I check. The list needs one entry for each web callback and one for each app scheme, and the two are never interchangeable.",
    },
    {
      type: "h2",
      text: "Server work stays on the server",
    },
    {
      type: "p",
      text: "Anything that needs a secret goes into an Edge Function or a Next.js route handler. An Edge Function is a small server function that Supabase hosts. Stripe's secret key, the key for an email service and any admin task belong there. The mobile app calls these through the client.",
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
      text: "Be careful with the EXPO_PUBLIC_ prefix. Expo copies those variables into the JavaScript bundle, so anyone who unpacks the app can read them. The Supabase publishable key is meant for that. A Stripe secret key is not, and it should never get that prefix or sit in the mobile project at all.",
    },
    {
      type: "h2",
      text: "Old app versions are the real constraint",
    },
    {
      type: "p",
      text: "This is the part of a shared backend I think about most. A web app changes the moment I deploy it. A mobile app changes only when the user installs the new version from the store, and many people wait weeks or never update. So for a long time my database serves two versions of the app at once: the new one and the one from last month. A migration that breaks the old version breaks those users, and I cannot roll them back for them.",
    },
    {
      type: "p",
      text: "The pattern I use is expand, then contract. In the expand step, I add the new column, table or function and leave the old one working. In the contract step, which comes much later, I remove the old one. Once the new app is out, I wait until the old versions have mostly disappeared from use before I contract.",
    },
    {
      type: "p",
      text: "A rename is the case that trips people up. It looks like one change, but to an old app it is a removal followed by an addition. So I do it in three steps.",
    },
    {
      type: "code",
      lang: "sql",
      code: `-- 1. Expand: add the new column and fill it from the old one.
alter table public.orders add column order_status text;
update public.orders set order_status = status where order_status is null;
-- A trigger copies writes to status into order_status for old apps.

-- 2. Release: the new app reads and writes order_status.

-- 3. Contract: only after the old versions are gone.
alter table public.orders drop column status;`,
    },
    {
      type: "p",
      text: "The same thinking applies to the other changes. A new column should be nullable or have a default, so old inserts still succeed. Adding a value to an enum is usually safe, but removing one is not. A new RLS policy can block an old app that relied on the previous one. So before a release I run the old build against the new database, not only the new build.",
    },
    {
      type: "p",
      text: "The API responses follow the same rule. An old app should ignore fields it does not know, so adding fields is fine and removing or renaming them is not. I write that down in the repo next to the migrations, so the rule is visible when I make the next change.",
    },
    {
      type: "note",
      text: "Store review and staged rollouts mean a new mobile version can take days to reach everyone. Plan for the oldest version still installed, not the one you just shipped.",
    },
    {
      type: "h2",
      text: "Realtime and push, briefly",
    },
    {
      type: "p",
      text: "Supabase Realtime can send row changes to connected clients, so a web dashboard can update when a phone records an order. Push notifications are a separate feature. The phone gets a push token from Expo's push service, and the server sends messages to it, usually from an Edge Function. I would add both only when a feature needs them. Polling is simpler to get right at first. If you use Realtime, check that RLS limits what each client receives.",
    },
    {
      type: "p",
      text: "The rule that ties all of this together is short. The database is the one place both apps trust. Put the rules there, change it carefully, and keep the two clients thin.",
    },
  ],
};
