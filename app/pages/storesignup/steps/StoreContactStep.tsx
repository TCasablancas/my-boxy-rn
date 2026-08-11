// // Mais uma coisa que preciso lembrar a você é que existe uma chance muito grande deste projeto escalar muito rapidamente. Mais pessoas irão acessar de forma orgânica, mais lojas irão abrir (e mais produtos serão cadastrados) em pouco tempo e preciso de uma ferramenta que seja facilmente escalável e que já esteja pronta e estruturada para lidar com este fluxo alto. Tanto como banco de dados, quanto com acessos multiplos e TPS.
// // Avaliou estratégias de escalabilidade e arquitetura para crescimento exponencial

// // Faz total sentido levar isso em conta agora — é bem melhor pensar em escala antes de escrever a primeira linha de código do que migrar depois com a plataforma em produção. Vou te trazer dados reais de como cada opção se comporta sob carga alta.
// // A real: Supabase escala muito mais do que parece à primeira vista

// // O medo comum é "Supabase é bom pra MVP, mas quebra quando cresce" — isso é meio-verdade. O que na prática quebra os projetos não é o Postgres em si, é configuração errada da camada de conexões. A própria Supabase testou seu pooler (Supavisor) chegando a 20.000 consultas por segundo, com latência mediana de 18,4ms, e ele foi desenhado com multi-tenancy em mente, lidando com milhões de conexões sem overhead ou latência significativos.

// // O ponto crítico: por padrão o Postgres tolera pouquíssimas conexões diretas (na Supabase, o limite padrão é 100). Se seu app RN/Next.js conectar direto no banco, você trava rápido. A solução (obrigatória, não opcional) é sempre usar o pooler em modo transaction — aí você passa a suportar mais de 10.000 conexões concorrentes na mesma instância, em vez de só 100. Há relatos reais de gente escalando 5 backends Supabase diferentes até produção, servindo mais de 50.000 usuários ativos com tempos de consulta abaixo de 50ms — mas isso dependeu de fazer indexação correta e usar o pooler certo desde o início.

// // Os cuidados que você (ou eu, ao te ajudar a montar isso) vai precisar aplicar desde o dia 1, não depois que travar:

// //     Usar sempre a connection string do pooler (porta 6543, modo transaction), nunca a porta direta (5432)
// //     Índices em toda foreign key e coluna usada em filtros (loja_id, status, created_at etc.)
// //     Ativar read replicas quando o volume de leitura (navegação de produtos, busca) começar a pesar mais que o de escrita
// //     Usar Realtime com moderação — funciona muito bem para presença/notificações, mas escutar mudanças de tabelas com milhares de assinantes simultâneos é um ponto conhecido de estrangulamento, então prefira isso só para o que realmente precisa ser "ao vivo"

// // E as outras duas opções, sob esse critério de escala

// // Firebase: a infraestrutura do Google escala tecnicamente sem problema — mas o modelo de cobrança por operação (cada leitura/escrita do Firestore) faz o custo crescer de forma menos previsível justamente quando você mais precisa de previsibilidade (crescimento orgânico rápido). Além disso, à medida que o catálogo de produtos e lojas cresce, a ausência de joins nativos força você a desnormalizar dados agressivamente — o que funciona, mas cada nova feature relacional (ex: "produtos da mesma loja", "pedidos com itens de lojas diferentes") fica mais trabalhosa de manter consistente conforme o volume cresce.

// // AWS (RDS/Aurora + Amplify, ou arquitetura própria): é quem oferece os controles mais explícitos de escala horizontal — read replicas gerenciadas, auto-scaling de compute, multi-região. Só que isso vem com o preço de complexidade que já conversamos: você (ou eu te ajudando) precisaria configurar e operar isso manualmente, e o "aprender fazendo" durante um pico de crescimento orgânico é arriscado.
// // Minha recomendação ajustada

// // Dado que você quer estar pronto para escalar rápido sem reescrever a arquitetura no meio do caminho, o caminho mais seguro é:

// //     Continue com Supabase, mas trate a configuração de conexão e índices como parte do MVP, não como "otimização para depois" — ou seja, eu já te ajudo a montar isso certo desde o schema inicial.
// //     Coloque um CDN na frente das imagens de produto desde já (o storage do Supabase já é compatível com S3 e serve bem com CDN na frente) — em marketplace, fotos de produto costumam ser o maior volume de tráfego, não as consultas de banco.
// //     Configure monitoramento de conexões e latência de query desde o início (a Supabase oferece dashboards Grafana prontos) — assim você vê o problema chegando antes dos usuários.
// //     Guarde uma "carta na manga": como Supabase é Postgres puro por baixo, se um dia você realmente precisar de mais controle (múltiplas regiões, Aurora, etc.), a migração é um pg_dump/pg_restore — não uma reescrita de aplicação, porque as concessões de arquitetura que você toma na AWS (DynamoDB, Cognito, AppSync) que causam esse "lock-in" pesado não existem no seu caso.

// // Na prática: o gargalo não vai ser a escolha da plataforma, vai ser se a arquitetura de conexão e índices está certa. Isso é verdade em Supabase, Firebase ou AWS — a diferença é que no Supabase você chega nesse ponto de configuração correta muito mais rápido e mais barato.

// // Quer que eu já monte o schema Prisma/SQL pensando nesses cuidados de índice e nas foreign keys certas (loja → produtos → pedidos), já vinculado à configuração correta do pooler?

// // Como monto essa camada de API/Backend com Next.js API routes ou Node?
// // Arquitetou padrões Next.js e Supabase com exemplos práticos

// // Ótima pergunta — essa é a parte que costuma gerar mais confusão, então vou destrinchar bem.
// // A decisão mais importante: você provavelmente não precisa de um backend Node separado

// // Como você está no Supabase, ele já te dá uma API REST/GraphQL gerada automaticamente em cima do Postgres, protegida por Row Level Security (RLS). Isso significa que operações simples de CRUD (listar produtos, ver loja, favoritar item) podem ir direto do app React Native e do site Next.js para o Supabase, sem passar por um backend seu.

// // Você só precisa de uma camada de API própria para o que exige segredo de servidor ou lógica sensível:

// //     Criar conta Stripe Connect pra uma loja nova
// //     Processar checkout e split de pagamento
// //     Receber webhooks do Stripe
// //     Regras de negócio complexas (cálculo de comissão, validações cruzadas)

// // E a boa notícia: essa camada própria pode ser só os Route Handlers do Next.js — você não precisa de um Node/Express separado. Um Route Handler em Next.js é simplesmente um endpoint HTTP hospedado no seu domínio (seusite.com/api/...), e qualquer cliente pode chamá-lo — incluindo seu app React Native, via fetch normal. Não é exclusivo do site.
// // Como fica a arquitetura, na prática

// // App React Native  ──┬──► Supabase direto (CRUD simples, protegido por RLS)
// //                      └──► seusite.com/api/... (Stripe, webhooks, regras de negócio)

// // Site Next.js       ──┬──► Supabase direto (Server Components/Actions)
// //                      └──► app/api/... (mesmos endpoints, mesmo backend)

// // Ou seja: o Next.js hospeda tanto o site quanto a sua API — um único deploy no Vercel, dois consumidores (web e mobile).
// // Estrutura de pastas (App Router)

// // app/
// //   api/
// //     produtos/
// //       route.ts              → GET (listar), POST (criar)
// //       [id]/route.ts          → GET, PATCH, DELETE
// //     lojas/
// //       [id]/
// //         stripe-onboard/route.ts   → inicia onboarding Stripe Connect
// //     stripe/
// //       webhook/route.ts       → recebe eventos do Stripe
// //     pedidos/
// //       route.ts               → cria pedido + payment intent com split
// // lib/
// //   supabase/
// //     client.ts     → cliente pro browser (Client Components)
// //     server.ts     → cliente pro servidor (Server Components, Route Handlers)
// //     admin.ts      → cliente com service role (bypassa RLS — só pra webhooks/admin)
// //   stripe.ts       → instância do SDK do Stripe

// // Os três clientes do Supabase que você vai precisar
// // typescript

// // lib/supabase/client.ts — usado no navegador/app (respeita RLS do usuário logado)
// import { createBrowserClient } from '@supabase/ssr'
// export function createClient() {
//   return createBrowserClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
//   )
// }

// // typescript

// // lib/supabase/server.ts — usado dentro de Route Handlers, lê o JWT do usuário
// import { createServerClient } from '@supabase/ssr'
// import { cookies } from 'next/headers'

// export async function createClient() {
//   const cookieStore = await cookies()
//   return createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     { cookies: { getAll: () => cookieStore.getAll() } }
//   )
// }

// // typescript

// // lib/supabase/admin.ts — service role, IGNORA RLS. Só usar em webhooks/tarefas de sistema.
// import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// export const supabaseAdmin = createSupabaseClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.SUPABASE_SERVICE_ROLE_KEY!  // nunca expor no client!
// )

// // Como o React Native se autentica nesses endpoints

// // O RN loga com supabase-js normalmente e recebe um JWT. Quando ele chamar um endpoint seu (/api/lojas/[id]/stripe-onboard), manda esse token no header:
// // typescript

// // no app React Native
// const { data: { session } } = await supabase.auth.getSession()

// const res = await fetch('https://seusite.com/api/lojas/123/stripe-onboard', {
//   method: 'POST',
//   headers: { Authorization: `Bearer ${session?.access_token}` }
// })

// // E no Route Handler, você valida esse token:
// // typescript

// // app/api/lojas/[id]/stripe-onboard/route.ts
// import { createClient } from '@/lib/supabase/server'
// import { stripe } from '@/lib/stripe'

// export async function POST(req: Request, { params }: { params: { id: string } }) {
//   const supabase = await createClient()
//   const { data: { user }, error } = await supabase.auth.getUser()
//   if (error || !user) return Response.json({ error: 'Não autenticado' }, { status: 401 })

//   // confere se o usuário é dono dessa loja (RLS também ajuda aqui)
//   const { data: loja } = await supabase.from('lojas').select('*').eq('id', params.id).single()
//   if (!loja || loja.owner_id !== user.id) {
//     return Response.json({ error: 'Sem permissão' }, { status: 403 })
//   }

//   const account = await stripe.accounts.create({ type: 'express' })
//   await supabase.from('lojas').update({ stripe_account_id: account.id }).eq('id', params.id)

//   const link = await stripe.accountLinks.create({
//     account: account.id,
//     refresh_url: 'https://seusite.com/vendedor/onboarding',
//     return_url: 'https://seusite.com/vendedor/dashboard',
//     type: 'account_onboarding',
//   })

//   return Response.json({ url: link.url })
// }

// // O webhook do Stripe (o endpoint mais delicado)

// // Esse é crítico e costuma ser onde as implementações falham — a assinatura precisa ser verificada, e o handler precisa ser idempotente, porque o Stripe pode entregar o mesmo evento mais de uma vez:
// // typescript

// // app/api/stripe/webhook/route.ts
// import { stripe } from '@/lib/stripe'
// import { supabaseAdmin } from '@/lib/supabase/admin'

// export async function POST(req: Request) {
//   const body = await req.text()
//   const signature = req.headers.get('stripe-signature')!

//   let event
//   try {
//     event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
//   } catch (err) {
//     return Response.json({ error: 'Assinatura inválida' }, { status: 400 })
//   }

//   switch (event.type) {
//     case 'account.updated': {
//       const account = event.data.object
//       await supabaseAdmin.from('lojas')
//         .update({ stripe_charges_enabled: account.charges_enabled })
//         .eq('stripe_account_id', account.id)
//       break
//     }
//     case 'payment_intent.succeeded': {
//       const pi = event.data.object
//       await supabaseAdmin.from('pedidos')
//         .update({ status: 'pago' })
//         .eq('stripe_payment_intent_id', pi.id)
//       break
//     }
//   }

//   return Response.json({ received: true })
// }

// // Repare que aqui uso o supabaseAdmin (service role) — porque quem está chamando é o Stripe, não um usuário logado, então não existe JWT de usuário pra passar pelas policies de RLS.
// // Quando um Node/Express separado passaria a valer a pena

// // Só considere sair dos Route Handlers do Next.js para um serviço Node dedicado (Express/Fastify) se, conforme o projeto crescer, você precisar de:

// //     Jobs em background/filas (ex: processar milhares de notificações, gerar relatórios pesados) — Route Handlers são request/response, não long-running
// //     WebSockets customizados fora do Realtime do Supabase
// //     Um time grande onde separar o deploy do backend do deploy do frontend faz sentido operacionalmente

// // Pro seu estágio atual, isso seria complexidade desnecessária — os Route Handlers do Next.js cobrem tudo que você descreveu (Stripe Connect, regras de negócio, cadastro de produto/loja), com um único deploy no Vercel servindo tanto o site quanto a API que o app RN consome.

// // Quer que eu monte os endpoints principais que faltam (produtos, lojas, pedidos com split de pagamento) seguindo esse mesmo padrão?

// // Olá, Claudio. Gostei muito dessa experiência que você criou. Agora baseado nela faça também uma para cadastro de loja. Vou te passar o contrato de itens, pra que você saiba quais campos colocar na jornada. Itens como cores e componentes já possuo da experiencia já criada, então não precisa repetir a criação deles, só o uso já é suficiente. Uma regra é que para que o usuário crie uma conta de loja, ela precisa estar atrelada a um CPF, portanto esse CPF pode ser digitado diretamente no campo, na pagina Documento, ou pode ser capturado dos dados do usuário já cadastrado (se já houver cadastro deste usuário). Se o usuário optar pelos dados já cadastrados será feito um autofill dos campos com o dados deste usuário. Agora é importante que a pagina de documento venha primeiro, pois é com este documento que faremos a captura dos dados e já será feita uma busca (Assim que for colocado o CPF) para saber se já existe cadastro neste documento.

// // O contrato:

// export interface StoreSignupModel {
//   storeId: string;
// storeOwner: StoreOwnerProps;
// storeName: string;
// storeAlias: string;
// storeDescription: string;
// storeAddress: AddressProps;
// storePhoneNumber: string;
// isWhatsapp?: boolean;
// storeEmail: string;
// createdAt: string;
// updatedAt: string;
// }

// export interface StoreOwnerProps {
//   userId: string;
// name: string;
// email: string;
// phoneNumber: string;
// isWhatsapp?: boolean;
// profileImageUri: string;
// }
// Mapeou fluxo de cadastro de loja e identificou lacunas de informação

// Que bom que gostou! Antes de montar a jornada de cadastro de loja, preciso alinhar uma coisa: como você mencionou, os componentes (inputs com floating label, máscaras de CPF/telefone/CEP, integração ViaCEP, wrapper keyboard-aware) já existem — só não tenho, nesta conversa, os nomes exatos, props e como eles se conectam (ex: como funciona a busca por CPF que você mencionou, se já existe um hook/service pra isso).

// Pra eu montar a jornada usando exatamente o que você já tem (sem reinventar nomes/props que depois vão exigir ajuste):

// P: Como prefere me passar os detalhes dos componentes/serviços já existentes?
// R: Use nomes genéricos, eu ajusto depois
// Examinou lógica customizada do componente DocumentoScreen

// I'm setting up the multi-step signup flow for the store, mapping each field to its corresponding step and building out the React Native components with generic names that follow the established pattern—starting with document verification, then CPF lookup with autofill options, using reusable inputs and a step wizard to guide through the journey. Writing component structure... If the CPF lookup finds an existing user, I'll show a banner with a toggle to reuse their stored data (name, email, phone, WhatsApp preference, profile image, userId) and prefill the wizard state—users can still review and edit these fields on the next screen. If no match is found or they decline to reuse, they proceed with manual entry, and the userId gets assigned by the backend when the account is created. So the flow is: the user creating the store is already logged in, and on the Documento page they have two options — either type the CPF manually or use their own already-registered profile data for autofill. Once a CPF is entered through either path, the system searches to check if that document already belongs to an existing app user. I'll implement this with a toggle at the top for "Usar dados da minha conta" and a manual CPF input field below; typing the CPF triggers a search, and when a match is found, I'll show an inline confirmation card letting the user apply the autofill to the owner step. I'm noting the assumptions about search behavior and edge cases (like CPF belonging to a different account) to clarify with the user if needed.

// For the address step, I can reuse the existing address component from the personal registration flow — I'll import the AddressForm or EnderecoScreen component and pass it the store address state slice, which avoids duplicating work since those components are already built.

// Now I'm setting up the file structure with the store signup types, context, and step definitions.

// …

// Now I'm setting up the context and reducer for state management.

// Now I'm focusing on the DocumentoScreen component, which handles the core custom logic.

// I need to fix the goBack prop so it actually invokes the function with the correct parameters—step and navigation—rather than just passing the function reference. I'll import StoreSignupStep to handle this properly.
// +2-2
// +1-1
// Concluído

// Agora o navegador que amarra tudo:
// Navegador (stack) da jornada de cadastro de loja, envolto no Provider do wizard
// Concluído
// Você está sem mensagens gratuitas até 15:20


import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ScrollViewKeyboard from '../../../components/sections/global/ScrollViewKeyboard';
import { maskPhone } from '../../../common/constants/Masks';
import { isValidEmail } from '../../../common/constants/Validators';
import { spacing } from '../../../common/constants/Sizes';
import { NeutralColors, PrimaryColors } from '../../../common/colors/Colors';
import { useKeyboard } from '../../../common/constants/UseKeyboard';

import { MBMainInput } from '../../../components/ui/form/MBMainInput';
import MBTitleDescripted from '../../../components/ui/texts/MBTitleDescripted';
import MBTextBtn from '../../../components/ui/buttons/MBTextBtn';
import MBOptionToggle from '../../../components/ui/selectors/MBOptionToggle';
import MBMainBtn, { MBMainBtnType } from '../../../components/ui/buttons/MBMainBtn';

import type { StoreSignupStepProps } from '../StoreSignupModel';

export function StoreContactStep({ data, updateData, onNext, onBack }: StoreSignupStepProps) {
  const canContinue = Boolean(data.storePhoneNumber && data.storeEmail && isValidEmail(data.storeEmail));

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'} />
      <ScrollViewKeyboard
        children={
          <>
            <View style={styles.container}>
              <MBTitleDescripted
                colorTitle={PrimaryColors.primaryDark}
                title="Contato da loja"
                description="Informe como os clientes vão falar com sua loja."
              />
              <View style={[{ gap: spacing.lg }]}>
                <MBMainInput
                  label="Telefone da loja"
                  value={data.storePhoneNumber}
                  onChangeText={(value) => updateData({ storePhoneNumber: maskPhone(value) })}
                  keyboardType="phone-pad"
                />
                <MBOptionToggle
                  label="Esse número é WhatsApp"
                  value={data.isWhatsapp}
                  onChange={(value) => updateData({ isWhatsapp: value })}
                />
                <MBMainInput
                  label="E-mail da loja"
                  value={data.storeEmail}
                  onChangeText={(value) => updateData({ storeEmail: value })}
                  onFocus={() => {
                    if (!data.storeEmail) {
                      // updateData({ storeEmail: data.storeOwner.email });
                    }
                  }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>
          </>
        }
      />
      <View style={[
        styles.buttonWrapper, 
        { marginBottom: useKeyboard() ? -46 : 0 }
      ]}>
        {onBack ? <MBTextBtn title="Voltar" onPress={onBack} /> : null}
        <MBMainBtn
          title="Continuar"
          onPress={onNext}
          buttonType={canContinue ? MBMainBtnType.NORMAL : MBMainBtnType.DISABLED}
          flex={1}
        />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.lg,
  },
  buttonWrapper: {
    gap: spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: spacing.xl,
    paddingRight: spacing.lg,
    marginTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: NeutralColors.background,
    paddingTop: spacing.lg,
  }
});