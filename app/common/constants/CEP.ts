import { stripMask } from './Masks';

export interface AddressFromCEP {
  cep: string;
  logradouro: string;
  bairro: string;
  cidade: string;
  uf: string;
  complemento?: string;
}

/**
 * Busca endereço a partir do CEP usando a API pública do ViaCEP.
 * Lança erro se o CEP for inválido/não encontrado, para o chamador
 * exibir mensagem apropriada no campo.
 */
export async function fetchAddressByCEP(cep: string): Promise<AddressFromCEP> {
  const digits = stripMask(cep);
  if (digits.length !== 8) {
    throw new Error('CEP inválido');
  }

  const response = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
  if (!response.ok) {
    throw new Error('Não foi possível buscar o CEP agora. Tente novamente.');
  }

  const data = await response.json();
  if (data.erro) {
    throw new Error('CEP não encontrado');
  }

  return {
    cep: digits,
    logradouro: data.logradouro ?? '',
    bairro: data.bairro ?? '',
    cidade: data.localidade ?? '',
    uf: data.uf ?? '',
    complemento: data.complemento ?? '',
  };
}
