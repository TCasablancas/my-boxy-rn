import type { StoreSignupFormData } from './StoreSignupModel';

export function resolveStoreSignupNextStepIndex(currentStepIndex: number, totalSteps: number) {
  const nextStepIndex = currentStepIndex + 1;
  const shouldComplete = nextStepIndex >= totalSteps;

  return {
    nextStepIndex: shouldComplete ? currentStepIndex : nextStepIndex,
    shouldComplete,
  };
}

export function resolveStoreSignupBackStepIndex(currentStepIndex: number) {
  return Math.max(0, currentStepIndex - 1);
}

export function finishStoreSignup(formData: StoreSignupFormData) {
  return formData;
}
