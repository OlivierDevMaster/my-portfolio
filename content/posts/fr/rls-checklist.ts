import type { Post } from "@/lib/posts";

export const rlsChecklist: Post = {
  slug: "rls-checklist-before-supabase-launch",
  title: "RLS sur Supabase : ma liste de contrôle avant chaque lancement",
  description:
    "Une liste de contrôle simple des règles d’accès que je vérifie dans Supabase avant qu’une application ne soit en ligne, avec les commandes que j’utilise pour les tester.",
  category: "Sécurité",
  date: "2026-11-12",
  blocks: [
    {
      type: "p",
      text: "Plus tôt cette année, plusieurs applications codées rapidement avec des outils d’IA, parfois appelées « vibe-coded », ont exposé les données de leurs utilisateurs. La cause était rarement le code visible à l’écran. Leurs tables Supabase pouvaient être lues par quiconque possédait la clé publique, et cette clé est intégrée dans chaque application web et mobile. La solution était un ensemble de règles d’accès que personne n’avait écrites.",
    },
    {
      type: "p",
      text: "Supabase est une base de données Postgres hébergée, avec une API prête à l’emploi, un système d’authentification et du stockage de fichiers. Postgres est la base de données SQL libre sur laquelle elle repose. La partie qui protège vos données est la sécurité au niveau des lignes (row-level security, ou RLS) : des règles Postgres qui décident quelles lignes chaque utilisateur peut lire ou modifier.",
    },
    {
      type: "p",
      text: "Avant de mettre en ligne quoi que ce soit sur Supabase, je parcours la liste ci-dessous. Chaque vérification explique pourquoi elle compte et, lorsque c’est utile, montre la commande que j’utilise. Les exemples utilisent une table `orders` avec une colonne `user_id`. Le même principe fonctionne pour n’importe quelle table.",
    },
    {
      type: "h2",
      text: "1. Chaque table du schéma public a la RLS activée",
    },
    {
      type: "p",
      text: "Le schéma `public` est l’emplacement par défaut de vos tables, et l’API de Supabase l’expose. Un schéma est un groupe nommé de tables dans Postgres. Une table sans RLS peut être lue et modifiée par quiconque détient la clé publique, c’est pourquoi je lance cette requête en premier.",
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
      text: "pg_tables est un catalogue Postgres intégré qui liste chaque table. Le résultat devrait être vide. Si une table apparaît, activez la RLS avec `alter table public.orders enable row level security;`. Vérifiez aussi les autres schémas exposés par l’API, et pas seulement public.",
    },
    {
      type: "h2",
      text: "2. RLS sans politique signifie tout refuser",
    },
    {
      type: "p",
      text: "Une fois la RLS activée, Postgres bloque chaque ligne tant que vous n’ajoutez pas de politique. Une politique est une règle pour une opération : select, insert, update ou delete. C’est sûr, mais chaque table a donc besoin de ses propres règles. Deux clauses sont importantes. `using` décide quelles lignes existantes une opération peut voir ou toucher. `with check` décide si les nouvelles valeurs écrites par un insert ou un update sont autorisées.",
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
      text: "Écrivez une politique par opération. Une mise à jour a besoin des deux clauses : `using` pour qu’un utilisateur ne puisse modifier que ses propres lignes, et `with check` pour qu’il ne puisse pas déplacer une ligne vers le `user_id` de quelqu’un d’autre.",
    },
    {
      type: "h2",
      text: "3. Encapsulez auth.uid() dans un select et ciblez un rôle",
    },
    {
      type: "p",
      text: "`auth.uid()` renvoie l’identifiant de l’utilisateur connecté, tiré du JWT (JSON Web Token, le jeton de connexion signé que le client envoie avec chaque requête). Écrit tel quel, Postgres peut le réévaluer pour chaque ligne. L’encapsuler sous la forme `(select auth.uid())` permet à Postgres de ne l’évaluer qu’une fois par requête, ce que Supabase recommande pour la vitesse sur les grandes tables. `to authenticated` limite la politique aux utilisateurs connectés, donc les requêtes anonymes l’ignorent.",
    },
    {
      type: "h2",
      text: "4. Ne jamais se fier à user_metadata pour les règles d’accès",
    },
    {
      type: "p",
      text: "Le JWT contient deux objets personnalisés, `user_metadata` et `app_metadata`. N’importe quel utilisateur connecté peut modifier `user_metadata` avec un seul appel côté client, donc une politique qui s’y fie permet à n’importe qui de s’accorder l’accès. Gardez les rôles dans `app_metadata`, que seul votre serveur peut écrire avec la clé secrète, ou dans une table que seuls les administrateurs peuvent mettre à jour.",
    },
    {
      type: "code",
      lang: "sql",
      code: `-- Non sûr : l’utilisateur contrôle cette valeur
(auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'

-- Plus sûr : seul le serveur contrôle cette valeur
(auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'`,
    },
    {
      type: "h2",
      text: "5. Les vues contournent la RLS, sauf si vous les en empêchez",
    },
    {
      type: "p",
      text: "Une vue est une requête enregistrée. Par défaut, elle s’exécute avec les droits du compte qui l’a créée, généralement le propriétaire. Les lignes que la RLS masquerait à l’appelant peuvent alors apparaître dans la vue. À partir de Postgres 15, `security_invoker = true` fait vérifier à la vue les droits de l’appelant. Le Security Advisor de Supabase signale les vues qui s’exécutent avec les droits du propriétaire.",
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
      text: "6. Les fonctions security definer contournent la RLS",
    },
    {
      type: "p",
      text: "Une fonction marquée `security definer` s’exécute avec les droits de son propriétaire, donc la RLS ne s’y applique pas. On en a parfois besoin, par exemple pour compter des lignes de tous les utilisateurs. Gardez ces fonctions hors des schémas exposés, ou sécurisez-les. Fixez le `search_path` (la liste des schémas dans lesquels Postgres cherche les noms) pour qu’un appelant ne puisse pas substituer une table au nom proche, et n’accordez le droit d’exécution qu’aux rôles qui en ont besoin.",
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
      text: "7. La clé secrète reste sur le serveur",
    },
    {
      type: "p",
      text: "Supabase vous donne deux types de clés. La clé publique (appelée anon ou publishable, selon la version du tableau de bord) est destinée au code du navigateur et du mobile. Elle n’est sûre que parce que la RLS limite ce qu’elle peut faire. La cacher ne sert à rien. La clé secrète, anciennement appelée clé service role, contourne entièrement la RLS. Elle ne doit se trouver que sur le serveur.",
    },
    {
      type: "note",
      text: "Next.js insère directement dans le JavaScript, au moment de la compilation, les variables qui commencent par `NEXT_PUBLIC_`, donc un secret placé là atteint le navigateur de chaque visiteur. Il en va de même pour `EXPO_PUBLIC_` dans un paquet React Native. Vérifiez le code client compilé, et pas seulement vos fichiers source.",
    },
    {
      type: "h2",
      text: "8. Côté serveur, utilisez getUser(), pas getSession()",
    },
    {
      type: "p",
      text: "Dans le code serveur, comme les gestionnaires de routes, les actions serveur et les pages qui vérifient l’authentification, vous devez savoir qui fait l’appel. `getSession()` lit la session à partir du cookie sans la vérifier auprès de Supabase Auth, donc son contenu ne peut pas être considéré comme fiable pour l’autorisation. `getUser()` envoie le jeton à Supabase Auth pour le vérifier. Le guide SSR de Supabase utilise cette approche, et les versions plus récentes proposent `getClaims()`, qui vérifie le JWT localement.",
    },
    {
      type: "code",
      lang: "ts",
      code: `const supabase = await createClient(); // votre client serveur, comme dans le guide SSR
const { data: { user } } = await supabase.auth.getUser();
if (!user) redirect("/login");`,
    },
    {
      type: "h2",
      text: "9. Verrouillez les compartiments de stockage",
    },
    {
      type: "p",
      text: "Supabase Storage conserve les fichiers dans des compartiments (buckets). L’accès à chaque fichier est contrôlé par des politiques sur la table storage.objects, comme la RLS pour vos propres tables. Rendez un compartiment privé pour tout ce qui est personnel, comme les documents d’identité, les factures ou les fichiers importés par les utilisateurs. Un compartiment public sert ses fichiers à quiconque possède l’URL. Ici, chaque utilisateur ne peut lire que les fichiers stockés dans son propre dossier.",
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
      text: "10. Testez comme un attaquant avant la mise en ligne",
    },
    {
      type: "p",
      text: "Lire les politiques ne suffit pas. Je teste l’API en ligne comme le ferait un inconnu. L’endpoint REST (le point d’accès de l’API) est l’URL de PostgREST, le service qui transforme vos tables en API web, et il est servi sous /rest/v1/. Je l’appelle d’abord avec seulement la clé publique, sans être connecté. Chaque table qui doit être protégée doit renvoyer une liste vide.",
    },
    {
      type: "code",
      lang: "bash",
      code: `curl "https://<project-ref>.supabase.co/rest/v1/orders?select=*" \\
  -H "apikey: <public-key>"
# résultat attendu : []`,
    },
    {
      type: "p",
      text: "Ensuite, je me connecte en tant qu’utilisateur A et je crée une ligne. Je me connecte ensuite en tant qu’utilisateur B et j’essaie de lire cette ligne par son identifiant avec `?id=eq.<row-id>`, où `eq.` signifie « égal à ». L’utilisateur B devrait obtenir `[]`. Une mise à jour de la ligne de l’utilisateur A par l’utilisateur B ne devrait rien changer. Enfin, j’ouvre le Security Advisor dans le tableau de bord Supabase, dans la section Advisors, et je corrige chaque erreur qu’il liste. Il signale les tables sans RLS, les vues security definer et certains problèmes de fonctions : il repère donc une partie de ce que couvre cette liste.",
    },
    {
      type: "h2",
      text: "Pourquoi c’est plus important maintenant",
    },
    {
      type: "p",
      text: "Les agents de code IA écrivent aujourd’hui une grande partie de mon code. Ils sont rapides sur ce qui paraît juste dans une démo : les écrans, les requêtes et les formulaires. Ils peuvent aussi écrire une politique comme celles présentées plus haut. Ce qu’ils ne peuvent pas décider, c’est qui doit voir quelle ligne. C’est une décision de produit. Elle dépend de ce que vous promettez à vos utilisateurs, et le modèle n’a aucun moyen de le savoir.",
    },
    {
      type: "p",
      text: "Je garde donc les règles d’accès comme mon propre travail. Je lis chaque politique, je note qui devrait pouvoir faire quoi, et j’exécute moi-même les tests ci-dessus avant de mettre en ligne. L’agent peut écrire le SQL. C’est moi qui décide ce que le SQL doit autoriser.",
    },
  ],
};
