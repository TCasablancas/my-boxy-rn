import { StoreOwnerProps } from '../types/StoreSignupTypes';

/**
 * Busca um usuário já cadastrado no sistema pelo CPF informado.
 * Disparada automaticamente assim que o CPF completa 11 dígitos válidos,
 * seja ele digitado manualmente ou obtido da conta autenticada.
 *
 * Troque o corpo da função pela chamada real (API/Supabase).
 */
export async function findUserByCpf(cpf: string): Promise<StoreOwnerProps | null> {
  const digits = cpf.replace(/\D/g, '');
  if (digits.length !== 11) return null;

  // TODO: substituir pelo endpoint real, ex:
  // const { data } = await api.get(`/usuarios/buscar-por-cpf/${digits}`);
  // return data ?? null;

  return null;
}

/**
 * Recupera os dados do usuário atualmente autenticado no app.
 * Usado quando o usuário escolhe "usar dados já cadastrados" na tela de Documento.
 */
export async function getCurrentAuthenticatedUser(): Promise<StoreOwnerProps | null> {
  // TODO: substituir pela leitura real da sessão/contexto de auth do app, ex:
  // const session = await supabase.auth.getSession();
  // return mapSessionToOwner(session);

  return null;
}