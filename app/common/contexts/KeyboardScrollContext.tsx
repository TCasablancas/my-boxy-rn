import React, { createContext, useCallback, useContext, useRef } from 'react';
import { Platform, ScrollView, findNodeHandle, UIManager } from 'react-native';

interface KeyboardScrollContextValue {
  scrollToInput: (inputHandle: number | null) => void;
}

const KeyboardScrollContext = createContext<KeyboardScrollContextValue | null>(null);

/**
 * Provider que deve envolver a ScrollView principal do fluxo de cadastro.
 * Qualquer AppInput dentro dele consegue pedir "me deixe visível acima
 * do teclado" sem precisar de prop-drilling manual em cada step.
 */
export const KeyboardScrollProvider: React.FC<{
  scrollViewRef: React.RefObject<ScrollView>;
  children: React.ReactNode;
  extraOffset?: number;
}> = ({ scrollViewRef, children, extraOffset = 24 }) => {
  const scrollToInput = useCallback(
    (inputHandle: number | null) => {
      if (!inputHandle || !scrollViewRef.current) return;

      // Pequeno delay para aguardar a animação de abertura do teclado
      // e o layout já estar estável antes de medir a posição do input.
      setTimeout(() => {
        const scrollResponder = scrollViewRef.current?.getScrollResponder?.();
        // API legada, mas ainda suportada pelo ScrollResponder do RN,
        // usada largamente para "subir" o campo acima do teclado.
        // @ts-ignore
        if (scrollResponder?.scrollResponderScrollNativeHandleToKeyboard) {
          // @ts-ignore
          scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
            inputHandle,
            extraOffset,
            true,
          );
        }
      }, Platform.OS === 'ios' ? 80 : 120);
    },
    [scrollViewRef, extraOffset],
  );

  return (
    <KeyboardScrollContext.Provider value={{ scrollToInput }}>
      {children}
    </KeyboardScrollContext.Provider>
  );
};

export function useKeyboardScroll() {
  const ctx = useContext(KeyboardScrollContext);
  if (!ctx) {
    // Fallback seguro: se usado fora do provider, vira no-op.
    return { scrollToInput: () => {} };
  }
  return ctx;
}

export function nodeHandleOf(ref: React.RefObject<any>): number | null {
  return ref.current ? findNodeHandle(ref.current) : null;
}
