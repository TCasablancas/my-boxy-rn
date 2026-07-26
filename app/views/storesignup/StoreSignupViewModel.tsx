import { useCallback } from 'react';
import { Animated } from 'react-native';
import { useMainStoreSignupHooks } from './StoreSignupHooks';
import { STORE_SIGNUP_TOTAL_FORM_STEPS } from './StoreSignupModel';
import {
  finishStoreSignup,
  resolveStoreSignupBackStepIndex,
  resolveStoreSignupNextStepIndex,
} from './StoreSignupService';
import { DocumentStep } from './steps/DocumentStep';
import { OwnerStep } from './steps/OwnerStep';
import { StoreDataStep } from './steps/StoreDataStep';
import { StoreContactStep } from './steps/StoreContactStep';
import { AddressStep } from './steps/AddressStep';
import { RevisionStep } from './steps/RevisionStep';
import { STORE_SIGNUP_STEP_ORDER, StoreSignupStep } from '../../common/types/StoreSignupTypes';

export const useStoreSignupViewModel = () => {
  const {
    stepIndex,
    setStepIndex,
    formData,
    updateData,
    isComplete,
    setIsComplete,
    scrollViewRef,
    fadeAnim,
    translateXAnim,
  } = useMainStoreSignupHooks();

  const animateStepChange = useCallback((direction: 'forward' | 'backward', advance: () => void) => {
    const exitOffset = direction === 'forward' ? -28 : 28;
    const enterOffset = direction === 'forward' ? 28 : -28;

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 120,
        useNativeDriver: true,
      }),
      Animated.timing(translateXAnim, {
        toValue: exitOffset,
        duration: 120,
        useNativeDriver: true,
      }),
    ]).start(() => {
      advance();
      scrollViewRef.current?.scrollTo({ y: 0, animated: false });
      translateXAnim.setValue(enterOffset);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 180,
          useNativeDriver: true,
        }),
        Animated.timing(translateXAnim, {
          toValue: 0,
          duration: 180,
          useNativeDriver: true,
        }),
      ]).start();
    });
  }, [fadeAnim, scrollViewRef, translateXAnim]);

  const goNext = useCallback(() => {
    animateStepChange('forward', () => {
      setStepIndex((prev) => {
        const { nextStepIndex, shouldComplete } = resolveStoreSignupNextStepIndex(
          prev,
          STORE_SIGNUP_TOTAL_FORM_STEPS,
        );
        if (shouldComplete) {
          setIsComplete(true);
        }
        return nextStepIndex;
      });
    });
  }, [animateStepChange, setIsComplete, setStepIndex]);

  const goBack = useCallback(() => {
    animateStepChange('backward', () => {
      setStepIndex((prev) => resolveStoreSignupBackStepIndex(prev));
    });
  }, [animateStepChange, setStepIndex]);

  const handleFinish = useCallback(() => {
    finishStoreSignup(formData);
  }, [formData]);

  const renderStep = useCallback(() => {
    const currentStep = STORE_SIGNUP_STEP_ORDER[stepIndex];

    switch (currentStep) {
      case StoreSignupStep.Documento:
        return (
          <DocumentStep data={formData} updateData={updateData} onNext={goNext} />
        );
      case StoreSignupStep.Proprietario:
        return (
          <OwnerStep data={formData} updateData={updateData} onNext={goNext} onBack={goBack} />
        );
      case StoreSignupStep.DadosLoja:
        return (
          <StoreDataStep data={formData} updateData={updateData} onNext={goNext} onBack={goBack} />
        );
      case StoreSignupStep.ContatoLoja:
        return (
          <StoreContactStep data={formData} updateData={updateData} onNext={goNext} onBack={goBack} />
        );
      case StoreSignupStep.Endereco:
        return (
          <AddressStep data={formData} updateData={updateData} onNext={goNext} onBack={goBack} />
        );
      case StoreSignupStep.Revisao:
        return (
          <RevisionStep data={formData} onBack={goBack} onSubmit={() => setIsComplete(true)} />
        );
      default:
        return null;
    }
  }, [formData, goBack, goNext, setIsComplete, stepIndex, updateData]);

  return {
    stepIndex,
    formData,
    isComplete,
    handleFinish,
    renderStep,
    scrollViewRef,
    fadeAnim,
    translateXAnim,
  };
};