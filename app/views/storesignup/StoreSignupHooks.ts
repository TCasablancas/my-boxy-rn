import { useCallback, useEffect, useRef } from 'react';
import { Animated, ScrollView } from 'react-native';
import { useState } from 'react';
import { initialStoreSignupForm } from './StoreSignupModel';
import type { StoreSignupFormData } from './StoreSignupModel';

/**
 * Retorna uma versão "debounced" do callback informado: sucessivas chamadas
 * dentro do intervalo `delayMs` cancelam a anterior, disparando só a última.
 * Útil para não buscar a cada tecla digitada (ex: busca por CPF).
 */
export function useDebouncedCallback<Args extends unknown[]>(
  callback: (...args: Args) => void,
  delayMs: number
) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return useCallback(
    (...args: Args) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => callbackRef.current(...args), delayMs);
    },
    [delayMs]
  );
}

export function useMainStoreSignupHooks() {
  const [stepIndex, setStepIndex] = useState(0);
  const [formData, setFormData] = useState<StoreSignupFormData>(initialStoreSignupForm);
  const [isComplete, setIsComplete] = useState(false);

  const scrollViewRef = useRef<ScrollView>(null as unknown as ScrollView);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const updateData = useCallback((patch: Partial<StoreSignupFormData>) => {
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