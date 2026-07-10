import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View, StyleSheet, ViewStyle } from 'react-native';

interface Props {
  children: React.ReactNode;
  contentStyle?: ViewStyle;
}

/**
 * Envolve o conteúdo da tela com comportamento de teclado (ajusta padding no iOS,
 * altura no Android) e permite rolagem quando o formulário é maior que a tela.
 */
export function KeyboardAwareScreen({ children, contentStyle }: Props) {
  const verticalOffset = Platform.OS === 'ios' ? 24 : 0;
  return (
    <KeyboardAvoidingView
      style={[  styles.flex]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={verticalOffset}
    >
      <ScrollView
        style={styles.flex}
        contentContainerStyle={[styles.content, contentStyle]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.stack}>{children}</View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { 
    flex: 1 
  },
  content: { 
    flexGrow: 1,
    padding: 24,
    height: '100%',
  },
  stack: { gap: 24 },
});