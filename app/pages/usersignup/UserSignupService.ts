import type { CadastroFormData, OnFinishCadastro } from '../../common/types/Types';

export function resolveNextStepIndex(currentStepIndex: number, totalSteps: number) {
  const nextStepIndex = currentStepIndex + 1;
  const shouldComplete = nextStepIndex >= totalSteps;

  return {
    nextStepIndex: shouldComplete ? currentStepIndex : nextStepIndex,
    shouldComplete,
  };
}

export function resolveBackStepIndex(currentStepIndex: number) {
  return Math.max(0, currentStepIndex - 1);
}

export function finishUserSignup(onFinish: OnFinishCadastro, formData: CadastroFormData) {
  onFinish(formData);
}
