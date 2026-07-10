// Tipos reaproveitados do projeto (já existem, não recriados aqui):
// - AddressProps -> mesma interface usada no cadastro de usuário (CEP, rua, número, bairro, cidade, estado, complemento)
import { AddressProps } from './Types';

export interface StoreOwnerProps {
  userId: string;
  name: string;
  email: string;
  phoneNumber: string;
  isWhatsapp?: boolean;
  profileImageUri: string;
}

export interface StoreSignupModel {
  storeId: string;
  storeOwner: StoreOwnerProps;
  storeName: string;
  storeAlias: string;
  storeDescription: string;
  storeAddress: AddressProps;
  storePhoneNumber: string;
  isWhatsapp?: boolean;
  storeEmail: string;
  createdAt: string;
  updatedAt: string;
}

/** Rascunho do wizard: tudo opcional até ser preenchido na jornada */
export type StoreSignupDraft = Partial<Omit<StoreSignupModel, 'storeOwner' | 'storeAddress'>> & {
  storeOwner: Partial<StoreOwnerProps>;
  storeAddress: Partial<AddressProps>;
};

/** De onde veio o CPF/dados do proprietário: digitado manualmente ou da conta já cadastrada */
export type DocumentSource = 'manual' | 'existingAccount';

export interface StoreSignupState {
  draft: StoreSignupDraft;
  cpf: string;
  documentSource: DocumentSource;
  existingUserMatch: StoreOwnerProps | null;
  isSearchingCpf: boolean;
  hasAppliedAutofill: boolean;
}

export enum StoreSignupStep {
  Documento = 'Documento',
  Proprietario = 'Proprietario',
  DadosLoja = 'DadosLoja',
  ContatoLoja = 'ContatoLoja',
  Endereco = 'Endereco',
  Revisao = 'Revisao',
}

export const STORE_SIGNUP_STEP_ORDER: StoreSignupStep[] = [
  StoreSignupStep.Documento,
  StoreSignupStep.Proprietario,
  StoreSignupStep.DadosLoja,
  StoreSignupStep.ContatoLoja,
  StoreSignupStep.Endereco,
  StoreSignupStep.Revisao,
];