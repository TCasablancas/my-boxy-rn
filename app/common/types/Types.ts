export interface CadastroFormData {
  nomeCompleto: string;
  username: string;
  email: string;
  celular: string;
  cpf: string;
  otpCode: string;
  endereco: {
    preenchido: boolean;
    cep: string;
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    uf: string;
  };
}

export const initialCadastroForm: CadastroFormData = {
  nomeCompleto: '',
  username: '',
  email: '',
  celular: '',
  cpf: '',
  otpCode: '',
  endereco: {
    preenchido: false,
    cep: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    uf: '',
  },
};

export interface StepProps {
  data: CadastroFormData;
  updateData: (patch: Partial<CadastroFormData>) => void;
  onNext: () => void;
  onBack?: () => void;
}

/**
 * Assinatura da função chamada quando o usuário conclui o cadastro
 * (na tela de sucesso). O componente pai injeta a navegação real,
 * por ex: () => navigation.replace('Home')
 */
export type OnFinishCadastro = (data: CadastroFormData) => void;
