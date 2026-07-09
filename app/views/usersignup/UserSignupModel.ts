import type { CadastroFormData, OnFinishCadastro } from '../../common/types/Types';

export const USER_SIGNUP_STEP_LABELS: string[] = ['Dados do usuário', 'Contato', 'Documento', 'Endereço', 'Validação'];

export const USER_SIGNUP_TOTAL_FORM_STEPS = USER_SIGNUP_STEP_LABELS.length;

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
