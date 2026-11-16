import type { Post } from "@/lib/posts";

export const rlsChecklist: Post = {
  slug: "rls-checklist-before-supabase-launch",
  title: "The row-level security checks I run before every Supabase launch",
  description:
    "A plain checklist of the access rules I check in Supabase before an app goes live, with the commands I use to test them.",
  category: "Security",
  date: "2026-11-12",
  blocks: [
    {
      type: "p",
      text: "This year, several apps built quickly with AI tools, sometimes called vibe-coded apps, leaked user data. The reason was rarely the code on screen. Their Supabase tables could be read by anyone who had the public key, and that key ships inside every web and mobile app. The fix was a set of access rules that nobody had written.",
    },
    {
      type: "p",
      text: "Supabase is a hosted Postgres database with a ready-made API, login and file storage. Postgres is the open-source SQL database underneath. The part that protects your data is row-level security (RLS): Postgres rules that decide which rows each user can read or change.",
    },
    {
      type: "p",
      text: "Before I launch anything on Supabase, I run the checklist below. Each check says why it matters and, where it helps, shows the command I use. The examples use an `orders` table with a `user_id` column. The same pattern works for any table.",
    },
    {
      type: "h2",
      text: "1. Every table in public has RLS turned on",
    },
    {
      type: "p",
      text: "The `public` schema is the default home for your tables, and Supabase's API exposes it. A schema is a named group of tables in Postgres. A table with RLS off can be read and written by anyone holding the public key, so this is the first query I run.",
    },
    {
      type: "code",
      lang: "sql",
      code: `select schemaname, tablename
from pg_tables
where schemaname = 'public'
  and rowsecurity = false;`,
    },
    {
      type: "p",
      text: "pg_tables is a built-in Postgres catalog that lists every table. The result should be empty. If a table shows up, turn RLS on with `alter table public.orders enable row level security;`. Check every other schema you expose through the API too, not only public.",
    },
    {
      type: "h2",
      text: "2. RLS with no policy means deny all",
    },
    {
      type: "p",
      text: "Once RLS is on, Postgres blocks every row until you add a policy. A policy is a rule for one operation: select, insert, update or delete. That is safe, but it means each table needs its own rules. Two clauses matter. `using` decides which existing rows an operation can see or touch. `with check` decides whether the new row values written by an insert or update are allowed.",
    },
    {
      type: "code",
      lang: "sql",
      code: `create policy "users read own orders"
on public.orders
for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "users insert own orders"
on public.orders
for insert
to authenticated
with check ((select auth.uid()) = user_id);`,
    },
    {
      type: "p",
      text: "Write one policy per operation. An update needs both clauses: `using` so a user can only change their own rows, and `with check` so they cannot move a row to someone else's `user_id`.",
    },
    {
      type: "h2",
      text: "3. Wrap auth.uid() in select and target a role",
    },
    {
      type: "p",
      text: "`auth.uid()` returns the id of the logged-in user, taken from the JWT (JSON Web Token, the signed login token the client sends with each request). Written bare, Postgres may call it again for every row. Wrapping it as `(select auth.uid())` lets Postgres evaluate it once per query, which Supabase recommends for speed on larger tables. `to authenticated` limits the policy to logged-in users, so anonymous requests skip it.",
    },
    {
      type: "h2",
      text: "4. Never trust user_metadata for access rules",
    },
    {
      type: "p",
      text: "The JWT carries two custom objects, `user_metadata` and `app_metadata`. Any logged-in user can change `user_metadata` with one client call, so a policy that checks it lets people grant themselves access. Keep roles in `app_metadata`, which only your server can write with the secret key, or in a table that only admins can update.",
    },
    {
      type: "code",
      lang: "sql",
      code: `-- Unsafe: the user controls this value
(auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'

-- Safer: only the server controls this value
(auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'`,
    },
    {
      type: "h2",
      text: "5. Views skip RLS unless you ask them not to",
    },
    {
      type: "p",
      text: "A view is a saved query. By default it runs with the rights of the account that created it, usually the owner. Rows that RLS would hide from the caller can then show up through the view. From Postgres 15 on, `security_invoker = true` makes the view check the caller's rights instead. Supabase's Security Advisor flags views that run with the owner's rights.",
    },
    {
      type: "code",
      lang: "sql",
      code: `create view public.my_orders
with (security_invoker = true)
as
select id, total, created_at
from public.orders;`,
    },
    {
      type: "h2",
      text: "6. Security definer functions bypass RLS",
    },
    {
      type: "p",
      text: "A function marked `security definer` runs with its owner's rights, so RLS does not apply inside it. Sometimes you need that, for example to count rows across all users. Keep such functions out of exposed schemas, or make them safe. Pin the `search_path` (the list of schemas Postgres searches for names) so a caller cannot slip in a look-alike table, and grant execute only to the roles that need it.",
    },
    {
      type: "code",
      lang: "sql",
      code: `create or replace function public.count_open_orders()
returns integer
language sql
security definer
set search_path = ''
as $$
  select count(*)::integer
  from public.orders
  where status = 'open';
$$;

revoke execute on function public.count_open_orders() from public, anon;
grant execute on function public.count_open_orders() to authenticated;`,
    },
    {
      type: "h2",
      text: "7. The secret key stays on the server",
    },
    {
      type: "p",
      text: "Supabase gives you two kinds of keys. The public key (called anon or publishable, depending on the dashboard version) is meant to sit in browser and mobile code. It is safe only because RLS limits what it can do. Hiding it protects nothing. The secret key, formerly the service role key, bypasses RLS entirely. It belongs on the server only.",
    },
    {
      type: "note",
      text: "Next.js inlines variables that start with `NEXT_PUBLIC_` into the JavaScript at build time, so a secret stored there reaches every visitor's browser. The same goes for `EXPO_PUBLIC_` in a React Native bundle. Check the built client code, not only your source files.",
    },
    {
      type: "h2",
      text: "8. On the server, use getUser(), not getSession()",
    },
    {
      type: "p",
      text: "In server code, such as route handlers, server actions and pages that check auth, you need to know who the caller is. `getSession()` reads the session from the cookie without verifying it with Supabase Auth, so its contents cannot be trusted for authorization. `getUser()` sends the token to Supabase Auth to check it. Supabase's SSR guide uses this pattern, and newer versions offer `getClaims()`, which verifies the JWT locally.",
    },
    {
      type: "code",
      lang: "ts",
      code: `const supabase = await createClient(); // your server client from the SSR guide
const { data: { user } } = await supabase.auth.getUser();
if (!user) redirect("/login");`,
    },
    {
      type: "h2",
      text: "9. Lock down storage buckets",
    },
    {
      type: "p",
      text: "Supabase Storage keeps files in buckets. Access to each file is controlled by policies on the storage.objects table, the same way RLS works for your own tables. Make a bucket private for anything personal, such as ID documents, invoices or user uploads. A public bucket serves its files to anyone who has the URL. Here, each user can read only the files stored in their own folder.",
    },
    {
      type: "code",
      lang: "sql",
      code: `create policy "users read own documents"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'documents'
  and (storage.foldername(name))[1] = (select auth.uid())::text
);`,
    },
    {
      type: "h2",
      text: "10. Test as an attacker before launch",
    },
    {
      type: "p",
      text: "Reading policies is not enough. I test the live API the way a stranger would. The REST endpoint is the URL PostgREST, the service that turns your tables into a web API, serves under /rest/v1/. First I call it with only the public key and no login. Every table that should be protected must return an empty list.",
    },
    {
      type: "code",
      lang: "bash",
      code: `curl "https://<project-ref>.supabase.co/rest/v1/orders?select=*" \\
  -H "apikey: <public-key>"
# expected output: []`,
    },
    {
      type: "p",
      text: "Next, I log in as user A and create a row. Then I log in as user B and try to read that row by its id with `?id=eq.<row-id>`, where `eq.` means equals. User B should get `[]`. An update from user B to user A's row should change nothing. Finally, I open the Security Advisor in the Supabase dashboard, under Advisors, and clear every error it lists. It flags tables without RLS, security definer views and some function problems, so it catches part of what this list covers.",
    },
    {
      type: "h2",
      text: "Why this matters more now",
    },
    {
      type: "p",
      text: "AI tools now write much of my code. They are fast at the parts that look right in a demo: the screens, the queries and the forms. They can also write a policy like the ones above. What they cannot decide is who should see which row. That is a product decision. It depends on what you promise your users, and the model has no way to know that.",
    },
    {
      type: "p",
      text: "So I keep the access rules as my own work. I read each policy, I write down who should be able to do what, and I run the tests above myself before I ship. The agent can type the SQL. I decide what the SQL should allow.",
    },
  ],
};
