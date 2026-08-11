import { useCallback } from 'react';
import { Animated } from 'react-native';
import { useMainUserSignupHooks } from './UserSignupHooks';
import { USER_SIGNUP_TOTAL_FORM_STEPS } from './UserSignupModel';
import { finishUserSignup, resolveBackStepIndex, resolveNextStepIndex } from './UserSignupService';
import type { OnFinishCadastro } from '../../common/types/Types';
import { StepNome } from './steps/StepNome';
import { StepContato } from './steps/StepContato';
import { StepDocumento } from './steps/StepDocumento';
import { StepEndereco } from './steps/StepEndereco';
import { StepOTP } from './steps/StepOTP';

type UseUserSignupViewModelParams = {
  onFinish: OnFinishCadastro;
};

const OTP_CODE_LENGTH = 6;

export function useUserSignupViewModel({ onFinish }: UseUserSignupViewModelParams) {
  const {
    stepIndex,
    setStepIndex,
    formData,
    updateData,
    isComplete,
    setIsComplete,
    scrollViewRef,
    fadeAnim,
  } = useMainUserSignupHooks();

  const animateStepChange = useCallback((advance: () => void) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 120,
      useNativeDriver: true,
    }).start(() => {
      advance();
      scrollViewRef.current?.scrollTo({ y: 0, animated: false });
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 180,
        useNativeDriver: true,
      }).start();
    });
  }, [fadeAnim, scrollViewRef]);

  const goNext = useCallback(() => {
    animateStepChange(() => {
      setStepIndex((prev) => {
        const { nextStepIndex, shouldComplete } = resolveNextStepIndex(prev, USER_SIGNUP_TOTAL_FORM_STEPS);
        if (shouldComplete) {
          setIsComplete(true);
        }
        return nextStepIndex;
      });
    });
  }, [animateStepChange, setIsComplete, setStepIndex]);

  const goBack = useCallback(() => {
    animateStepChange(() => {
      setStepIndex((prev) => resolveBackStepIndex(prev));
    });
  }, [animateStepChange, setStepIndex]);

  const handleFinish = useCallback(() => {
    finishUserSignup(onFinish, formData);
  }, [formData, onFinish]);

  const renderStep = useCallback(() => {
    switch (stepIndex) {
      case 0:
        return <StepNome data={formData} updateData={updateData} onNext={goNext} />;
      case 1:
        return <StepContato data={formData} updateData={updateData} onNext={goNext} onBack={goBack} />;
      case 2:
        return <StepDocumento data={formData} updateData={updateData} onNext={goNext} onBack={goBack} />;
      case 3:
        return <StepEndereco data={formData} updateData={updateData} onNext={goNext} onBack={goBack} />;
      case 4:
        return <StepOTP data={formData} updateData={updateData} onNext={goNext} onBack={goBack} otpLength={OTP_CODE_LENGTH} />;
      default:
        return null;
    }
  }, [formData, goBack, goNext, stepIndex, updateData]);

  return {
    stepIndex,
    formData,
    isComplete,
    handleFinish,
    renderStep,
    scrollViewRef,
    fadeAnim,
  };
}
