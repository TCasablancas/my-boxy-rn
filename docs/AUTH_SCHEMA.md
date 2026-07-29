# Login, Cadastro e Logout — Levantamento e Design de Schema/API

> Documento de handoff para o dev backend. Reflete o estado do código em
> `fix/singupstore` na data deste levantamento. Ver seção final para decisões
> em aberto antes de implementar.

## 1. O que já existe hoje

| Fluxo | Estado | Onde |
|---|---|---|
| Login | **Real**, funcional — `supabase.auth.signInWithPassword` | `app/views/login/LoginService.ts` |
| Logout | **Real**, funcional — `supabase.auth.signOut` | `app/views/login/LoginService.ts:49`, acionado em `app/views/moreconfigs/MoreConfigsView.tsx` |
| Sessão/bootstrap | **Real** — `getSession` + `onAuthStateChange` | `app/views/main/EntryTabHooks.ts` |
| Signup usuário | **UI completa, sem chamada real** — wizard de 5 passos coleta nome, username, email, celular, CPF, endereço (opcional) e um OTP **falso** (`getFakeOtpValue()` sempre `'111111'`). `finishUserSignup` só chama `onFinish(formData)`, não grava nada | `app/views/usersignup/UserSignupModel.ts`, `app/views/usersignup/UserSignupService.ts` |
| Signup loja | **UI completa, sem chamada real** — `findUserByCpf` e `getCurrentAuthenticatedUser` são stubs com TODO explícito pedindo endpoint real | `app/common/constants/StoreOwnerSearch.ts` |
| Esqueci senha | **Não existe** — botão é no-op | `app/views/login/LoginView.tsx` |
| `profiles`/`products` | App **já assume** essas tabelas existirem no Supabase (`from('profiles').eq('id', userId)`, `from('products').eq('user_id', userId)`) | `app/views/userhome/UserHomeService.ts` |

**Achado importante que muda o design:** o cadastro de usuário **não coleta
senha em nenhum passo** — só o login tem campo de senha. Ou seja, hoje existe
uma inconsistência: não dá pra criar conta (sem senha) mas o login exige uma.
Isso precisa ser decidido antes do backend dev sair implementando — ver
decisão #1 abaixo.

## 2. Decisões que precisam ser batidas antes de implementar

1. **Senha ou passwordless no cadastro?** Como o wizard já tem um passo de
   OTP (hoje falso), a recomendação é usar `supabase.auth.signInWithOtp` +
   `verifyOtp` (email OTP nativo do Supabase) como o próprio mecanismo de
   autenticação — sem senha nenhuma, nem no cadastro nem no login. Isso
   reaproveita a `StepOTP` que já existe. Se quiserem manter login com senha,
   falta adicionar um passo de senha no wizard. **Escolham um dos dois** — o
   resto do design funciona nos dois casos, mas o `LoginView` atual (com
   campo de senha) só faz sentido se optarem por senha.
2. **Uma loja por usuário, ou várias?** O flag `hasRegisteredStore` em
   `EntryTabHooks.ts` é booleano, sugerindo 1:1. Modelei assim (constraint
   `unique(owner_id)`), fácil de relaxar depois.
3. **Endereço: 1 por perfil/loja, ou múltiplos (ex: entrega)?** Hoje é sempre
   1 endereço opcional por entidade. Modelei como colunas simples na própria
   tabela — se no futuro precisar de múltiplos endereços de entrega, aí sim
   vale normalizar numa tabela `addresses` à parte.

## 3. Schema (Postgres/Supabase)

```sql
-- ============================================================
-- profiles: extensão pública de auth.users (1:1)
-- ============================================================
create table public.profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  full_name     text not null,
  username      text not null unique,
  phone         text not null,
  is_whatsapp   boolean not null default false,
  avatar_url    text,
  cpf           text unique,           -- 11 dígitos, sem máscara
  birth_date    date,
  cep           text,
  street        text,
  number        text,
  complement    text,
  neighborhood  text,
  city          text,
  state         text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index profiles_username_idx on public.profiles (username);
create index profiles_cpf_idx      on public.profiles (cpf);

alter table public.profiles enable row level security;

create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);

create policy "profiles_insert_own" on public.profiles
  for insert with check (auth.uid() = id);

create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);

-- trigger updated_at
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end; $$;

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- ============================================================
-- stores: 1 loja por usuário (MVP), atrelada por CPF do dono
-- ============================================================
create table public.stores (
  id            uuid primary key default gen_random_uuid(),
  owner_id      uuid not null unique references public.profiles(id) on delete cascade,
  name          text not null,
  alias         text not null unique,
  description   text,
  email         text,
  phone         text,
  is_whatsapp   boolean not null default false,
  cep           text,
  street        text,
  number        text,
  complement    text,
  neighborhood  text,
  city          text,
  state         text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index stores_alias_idx on public.stores (alias);

alter table public.stores enable row level security;

create policy "stores_select_public" on public.stores
  for select using (true);              -- vitrine pública

create policy "stores_insert_own" on public.stores
  for insert with check (auth.uid() = owner_id);

create policy "stores_update_own" on public.stores
  for update using (auth.uid() = owner_id);

create trigger stores_set_updated_at
  before update on public.stores
  for each row execute function public.set_updated_at();

-- ============================================================
-- RPC: busca de usuário por CPF (para autofill no signup de loja)
-- SECURITY DEFINER pra não expor a tabela profiles inteira via RLS
-- ============================================================
create or replace function public.find_user_by_cpf(p_cpf text)
returns table (
  user_id           uuid,
  name              text,
  email             text,
  phone_number      text,
  is_whatsapp       boolean,
  profile_image_uri text
)
language sql security definer set search_path = public as $$
  select p.id, p.full_name, u.email, p.phone, p.is_whatsapp, p.avatar_url
  from public.profiles p
  join auth.users u on u.id = p.id
  where p.cpf = regexp_replace(p_cpf, '\D', '', 'g')
  limit 1;
$$;

revoke all on function public.find_user_by_cpf(text) from public;
grant execute on function public.find_user_by_cpf(text) to authenticated;
```

Os nomes de coluna aqui batem com os `Props`/`Model` já usados no front
(`StoreOwnerProps`, `UserProfileProps`), só convertendo pra `snake_case`.

## 4. "API" — na prática, a maioria não precisa de backend custom

O próprio código deixa isso documentado (tem um bloco de planejamento
comentado em `app/views/storesignup/steps/StoreContactStep.tsx` descrevendo
essa arquitetura): CRUD simples vai direto do RN pro Supabase protegido por
RLS; um backend custom (Next.js) só entraria para Stripe/pagamentos, que é
outro assunto. Pra login/signup/logout, o "contrato de API" é isso:

| Ação | Chamada | Request | Response | Observação |
|---|---|---|---|---|
| Enviar código de cadastro | `supabase.auth.signInWithOtp({ email })` | email | — | Substitui a `StepOTP` fake |
| Confirmar código | `supabase.auth.verifyOtp({ email, token, type: 'email' })` | email, token | `session`, `user` | Cria a linha em `auth.users` |
| Gravar perfil | `supabase.from('profiles').insert({...})` | ver colunas de `profiles` | linha criada | Só funciona pós-OTP (precisa de `auth.uid()`), protegido pela RLS `insert_own` |
| Login | `supabase.auth.signInWithPassword({ email, password })` (ou trocar por OTP, ver decisão #1) | email, password | `session`, `user` | Já implementado |
| Logout | `supabase.auth.signOut()` | — | — | Já implementado |
| Esqueci senha | `supabase.auth.resetPasswordForEmail(email)` | email | — | Só se mantiverem senha |
| Ler perfil próprio | `supabase.from('profiles').select('*').eq('id', userId).single()` | userId | perfil | Já implementado em `UserHomeService.ts` |
| Buscar usuário por CPF | `supabase.rpc('find_user_by_cpf', { p_cpf: cpf })` | cpf | `StoreOwnerProps` ou null | Resolve o TODO em `StoreOwnerSearch.ts` |
| Tenho loja cadastrada? | `supabase.from('stores').select('id').eq('owner_id', userId).maybeSingle()` | userId | store id ou null | Resolve o `hasRegisteredStore` hardcoded em `EntryTabHooks.ts` |
| Criar loja | `supabase.from('stores').insert({...})` | ver colunas de `stores` | linha criada | RLS garante `owner_id = auth.uid()` |

Ou seja: o "dev backend" aqui é essencialmente **quem escreve as migrations
SQL + policies de RLS** acima — não precisa subir um servidor Node à parte
pra login/cadastro. Vale deixar isso claro pra ele, porque muda a expectativa
de "o que precisa ser criado".

## 5. Outros achados que valem uma nota à parte

Não bloqueiam o design acima, mas merecem atenção:

- `.env` e `env.d.ts` têm a URL e a anon key do Supabase **commitadas no
  repo** (chave anon não é segredo crítico, mas vale confirmar que não tem
  nada de `service_role` vazado — há um placeholder comentado).
- Existe um client Supabase duplicado em `supabase/supabaseClient.ts`, sem
  uso — dá pra remover.
- `products` hoje tem `user_id`, mas o resto do app trata produto como
  pertencente a uma **loja** (`store_id` em `CartItemProps`, `MyShopModel`).
  Antes de o backend criar a tabela `products` de verdade, vale decidir se é
  `products.store_id` em vez de `user_id`.
