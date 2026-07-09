import type { CadastroFormData, OnFinishCadastro } from '../../common/types/Types';
import { AddressProps } from '../../models/AddessModel';

export const USER_SIGNUP_STEP_LABELS: string[] = [
  'Dados do usuário', 'Contato', 'Documento', 'Endereço', 'Validação'
];

export const USER_SIGNUP_TOTAL_FORM_STEPS = USER_SIGNUP_STEP_LABELS.length;

export interface UserSignupProps {
  userName: string;
  userAlias: string;
  email: string;
  celular: string;
  cpf: string;
  otpCode: string;
  endereco: AddressProps;
}

export interface CadastroScreenProps {
  onFinish: OnFinishCadastro;
}

export interface UserSignupStepRendererParams {
  stepIndex: number;
  formData: CadastroFormData;
  updateData: (patch: Partial<CadastroFormData>) => void;
  goNext: () => void;
  goBack: () => void;
}

export interface UserSignupScreenState {
  currentStepIndex: number;
  formData: CadastroFormData;
  onFinish: OnFinishCadastro;
}