import { useCallback } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import MBMainBtn from '../../components/buttons/MBMainBtn';
import { MBMainInput } from '../../components/form/MBMainInput';
import { useMainStoreSignupHooks } from './StoreSignupHooks';
import { STORE_SIGNUP_TOTAL_FORM_STEPS } from './StoreSignupModel';
import {
  finishStoreSignup,
  resolveStoreSignupBackStepIndex,
  resolveStoreSignupNextStepIndex,
} from './StoreSignupService';

function StepField({
  label,
  value,
  onChangeText,
  onNext,
  onBack,
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  onNext: () => void;
  onBack?: () => void;
}) {
  return (
    <View style={styles.stepWrapper}>
      <MBMainInput label={label} value={value} onChangeText={onChangeText} />
      <View style={styles.actionsWrapper}>
        {onBack ? <MBMainBtn title="Voltar" onPress={onBack} /> : null}
        <MBMainBtn title="Continuar" onPress={onNext} />
      </View>
    </View>
  );
}

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
  } = useMainStoreSignupHooks();

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
    animateStepChange(() => {
      setStepIndex((prev) => resolveStoreSignupBackStepIndex(prev));
    });
  }, [animateStepChange, setStepIndex]);

  const handleFinish = useCallback(() => {
    finishStoreSignup(formData);
  }, [formData]);

  const renderStep = useCallback(() => {
    switch (stepIndex) {
      case 0:
        return (
          <StepField
            label="Documento"
            value={formData.storeDocument}
            onChangeText={(value) => updateData({ storeDocument: value })}
            onNext={goNext}
          />
        );
      case 1:
        return (
          <StepField
            label="Nome da loja"
            value={formData.storeName}
            onChangeText={(value) => updateData({ storeName: value })}
            onNext={goNext}
            onBack={goBack}
          />
        );
      case 2:
        return (
          <StepField
            label="Descrição da loja"
            value={formData.storeDescription}
            onChangeText={(value) => updateData({ storeDescription: value })}
            onNext={goNext}
            onBack={goBack}
          />
        );
      case 3:
        return (
          <StepField
            label="Contato da loja"
            value={formData.storeEmail}
            onChangeText={(value) => updateData({ storeEmail: value })}
            onNext={goNext}
            onBack={goBack}
          />
        );
      case 4:
        return (
          <View style={styles.stepWrapper}>
            <Text style={styles.reviewTitle}>Revise os dados e finalize o cadastro</Text>
            <Text style={styles.reviewText}>Documento: {formData.storeDocument || '-'}</Text>
            <Text style={styles.reviewText}>Loja: {formData.storeName || '-'}</Text>
            <Text style={styles.reviewText}>Descrição: {formData.storeDescription || '-'}</Text>
            <Text style={styles.reviewText}>Contato: {formData.storeEmail || '-'}</Text>
            <View style={styles.actionsWrapper}>
              <MBMainBtn title="Voltar" onPress={goBack} />
              <MBMainBtn title="Finalizar" onPress={goNext} />
            </View>
          </View>
        );
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
};

const styles = StyleSheet.create({
  stepWrapper: {
    gap: 12,
    paddingTop: 16,
  },
  actionsWrapper: {
    gap: 8,
    marginTop: 8,
  },
  reviewTitle: {
    fontSize: 16,
    fontFamily: 'SNPro-Bold',
  },
  reviewText: {
    fontSize: 14,
    fontFamily: 'SNPro-Regular',
  },
});