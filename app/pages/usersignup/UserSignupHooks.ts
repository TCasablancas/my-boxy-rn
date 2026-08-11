import { useCallback, useRef, useState } from 'react';
import { Animated, ScrollView } from 'react-native';
import { initialCadastroForm } from '../../common/types/Types';
import type { CadastroFormData } from '../../common/types/Types';

export function useMainUserSignupHooks() {
  const [stepIndex, setStepIndex] = useState(0);
  const [formData, setFormData] = useState<CadastroFormData>(initialCadastroForm);
  const [isComplete, setIsComplete] = useState(false);

  const scrollViewRef = useRef<ScrollView>(null as unknown as ScrollView);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const updateData = useCallback((patch: Partial<CadastroFormData>) => {
    setFormData((prev) => ({ ...prev, ...patch }));
  }, []);

  return {
    stepIndex,
    setStepIndex,
    formData,
    updateData,
    isComplete,
    setIsComplete,
    scrollViewRef,
    fadeAnim,
  };
}
