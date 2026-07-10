import React, { forwardRef, useRef, useState } from 'react';
import {
  ActivityIndicator, Animated, StyleSheet, Text, TextInput, TextInputProps, TouchableOpacity, View,
} from 'react-native';
import { NeutralColors, OverlayColors, PrimaryColors, StateColors } from '../../common/colors/Colors';
import { radius, spacing, typography } from '../../common/constants/Typgraphy';
import { nodeHandleOf, useKeyboardScroll } from '../../common/contexts/KeyboardScrollContext';
import { IconsActions } from '../../common/icons/IconsActions';

interface AppInputProps extends Omit<TextInputProps, 'onChangeText'> {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string | null;
  helperText?: string;
  loading?: boolean; // ex: enquanto busca CEP
  leftIcon?: React.ReactNode; // ex: ícone de cadeado no campo de senha
  rightAdornment?: React.ReactNode; // sobrescreve o botão de "olhinho" da senha, se precisar de algo custom
}

const CONTAINER_HEIGHT = 64;

/**
 * Input com label flutuante: quando vazio e sem foco, o label aparece
 * grande e centralizado (como um placeholder). Ao focar ou preencher, ele
 * "sobe" para o topo do campo e o valor aparece embaixo — mesmo padrão do
 * mockup de referência, adaptado para a paleta vibrante do app.
 *
 * - Borda muda de cor (cinza -> cor da marca) quando o campo está focado.
 * - Se `secureTextEntry` for passado, exibe automaticamente o botão de
 *   mostrar/ocultar senha (pode ser sobrescrito via `rightAdornment`).
 * - Ao focar, pede ao KeyboardScrollContext para subir a tela, garantindo
 *   que o campo fique visível acima do teclado.
 */
export const MBMainInput = forwardRef<TextInput, AppInputProps>(
  ({ 
    label, 
    value, 
    onChangeText, 
    error, 
    helperText, 
    loading,
    leftIcon, 
    rightAdornment, 
    secureTextEntry, 
    onFocus, 
    onBlur, 
    ...rest 
  }, ref,) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const borderAnim = useRef(new Animated.Value(0)).current;
    const internalRef = useRef<TextInput>(null);
    const { scrollToInput } = useKeyboardScroll();

    const isFloated = isFocused || value.length > 0;
    // Anima o label independente da borda, pois o label reage a
    // foco OU valor preenchido, enquanto a borda reage só ao foco.
    const labelAnim = useRef(new Animated.Value(isFloated ? 1 : 0)).current;

    const setRefs = (node: TextInput | null) => {
      // @ts-ignore
      internalRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as React.MutableRefObject<TextInput | null>).current = node;
    };

    const animateBorder = (toValue: number) => {
      Animated.timing(borderAnim, { toValue, duration: 150, useNativeDriver: false }).start();
    };

    const animateLabel = (toValue: number) => {
      Animated.timing(labelAnim, { toValue, duration: 150, useNativeDriver: false }).start();
    };

    const borderColor = borderAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [
        error ? StateColors.error : NeutralColors.border,
        error ? StateColors.error : NeutralColors.borderFocus,
      ],
    });

    const inputTranslateY = labelAnim.interpolate({ inputRange: [0, 1], outputRange: [4, 0] });
    const showEyeToggle = secureTextEntry && !rightAdornment && !loading;

    return (
      <View>
        <Animated.View
          style={[
            styles.inputContainer,
            { borderColor },
            error ? styles.inputContainerError : null,
          ]}
        >
          <View style={styles.textColumn}>
            <Animated.Text style={ styles.floatingLabel } numberOfLines={1}>
              {label}
            </Animated.Text>

            <Animated.View style={[ styles.inputWrapper, { transform: [{ translateY: inputTranslateY }] }]}>
              <TextInput
                ref={setRefs}
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholderTextColor={NeutralColors.textPlaceholder}
                secureTextEntry={secureTextEntry && !showPassword}
                onFocus={(e) => {
                  setIsFocused(true);
                  animateBorder(1);
                  scrollToInput(nodeHandleOf(internalRef));
                  onFocus?.(e);
                }}
                onBlur={(e) => {
                  setIsFocused(false);
                  animateBorder(0);
                  onBlur?.(e);
                }}
                {...rest}
              />
            </Animated.View>
          </View>

          {loading && <ActivityIndicator size="small" color={PrimaryColors.primary} style={styles.adornment} />}

          {!loading && showEyeToggle && (
            <TouchableOpacity
              onPress={() => setShowPassword((prev) => !prev)}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              style={styles.adornment}
            >
              <Text style={styles.eyeIcon}>{
                showPassword ? 
                  <View style={{width: 20, height: 20}}><IconsActions.eyeSlash /></View>
                : <View style={{width: 20, height: 20}}><IconsActions.eye /></View>
              }</Text>
            </TouchableOpacity>
          )}

          {!loading && !showEyeToggle && rightAdornment && (
            <View style={styles.adornment}>{rightAdornment}</View>
          )}
        </Animated.View>

        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : helperText ? (
          <Text style={styles.helperText}>{helperText}</Text>
        ) : null}
      </View>
    );
  },
);

MBMainInput.displayName = 'MBMainInput';

const styles = StyleSheet.create({
  inputWrapper: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: CONTAINER_HEIGHT,
    borderWidth: 1.5,
    borderRadius: 12,
    backgroundColor: NeutralColors.backgroundAlt,
    paddingTop: 8,
    paddingBottom: 16,
    paddingHorizontal: 8,
    shadowColor: OverlayColors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 1,
    width: '100%'
  },
  inputContainerError: {
    backgroundColor: StateColors.errorLight,
  },
  textColumn: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
  },
  floatingLabel: {
    flex: 1,
    ...typography.label,
    fontFamily: 'SNPro-Regular',
    color: NeutralColors.textPlaceholder,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: NeutralColors.text,
    fontFamily: 'SNPro-Regular',
    width: '100%',
    backgroundColor: 'transparent',
  },
  adornment: {
    marginLeft: spacing.sm,
  },
  eyeIcon: {
    fontSize: 18,
    top: 3,
  },
  errorText: {
    ...typography.caption,
    color: StateColors.error,
    marginTop: spacing.xs,
  },
  helperText: {
    ...typography.caption,
    color: NeutralColors.textSecondary,
    marginTop: spacing.xs,
  },
});
