import React, { useEffect, useMemo, useRef } from 'react';
import {
  StyleSheet, TextInput, View, type NativeSyntheticEvent, type TextInputKeyPressEventData,
} from 'react-native';
import { PrimaryColors, NeutralColors } from '../../common/colors/Colors';

interface MBOTPCodeInputProps {
  length?: number;
  value: string;
  onChangeValue: (value: string) => void;
  onComplete?: (value: string) => void;
  autoFocus?: boolean;
  editable?: boolean;
}

function clampOtpLength(length: number) {
  return Math.max(3, Math.min(6, length));
}

export default function MBOTPCodeInput({
  length = 4, value, onChangeValue, onComplete, autoFocus, editable = true,
}: MBOTPCodeInputProps) {
  const otpLength = clampOtpLength(length);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const normalizedValue = useMemo(() => {
    return value.replace(/\D/g, '').slice(0, otpLength);
  }, [otpLength, value]);

  useEffect(() => {
    if (normalizedValue.length === otpLength) {
      onComplete?.(normalizedValue);
    }
  }, [normalizedValue, onComplete, otpLength]);

  const setCodeAt = (index: number, char: string) => {
    const currentChars = Array.from({ length: otpLength }, (_, i) => normalizedValue[i] ?? '');
    currentChars[index] = char;
    const nextValue = currentChars.join('').replace(/\D/g, '').slice(0, otpLength);
    onChangeValue(nextValue);
  };

  const fillFromIndex = (index: number, rawText: string) => {
    const digits = rawText.replace(/\D/g, '');
    if (!digits) {
      setCodeAt(index, '');
      return;
    }

    const currentChars = Array.from({ length: otpLength }, (_, i) => normalizedValue[i] ?? '');
    let writeIndex = index;

    for (const digit of digits) {
      if (writeIndex > otpLength - 1) break;
      currentChars[writeIndex] = digit;
      writeIndex += 1;
    }

    const nextValue = currentChars.join('').replace(/\D/g, '').slice(0, otpLength);
    onChangeValue(nextValue);

    const focusIndex = Math.min(writeIndex, otpLength - 1);
    inputRefs.current[focusIndex]?.focus();
  };

  const handleChangeText = (index: number, text: string) => {
    if (text.length > 1) {
      // Handles OTP autofill/paste where all digits may arrive at once.
      fillFromIndex(index === 0 ? 0 : index, text);
      return;
    }

    const sanitized = text.replace(/\D/g, '');
    setCodeAt(index, sanitized);

    if (sanitized && index < otpLength - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (
    index: number,
    event: NativeSyntheticEvent<TextInputKeyPressEventData>,
  ) => {
    if (event.nativeEvent.key !== 'Backspace') {
      return;
    }

    if (normalizedValue[index]) {
      setCodeAt(index, '');
      return;
    }

    if (index > 0) {
      inputRefs.current[index - 1]?.focus();
      setCodeAt(index - 1, '');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
      {Array.from({ length: otpLength }).map((_, index) => (
        <View style={styles.inputBackground} key={`otp-input-${index}`}>
          <TextInput
            key={`otp-${index}`}
            ref={(ref) => { inputRefs.current[index] = ref }}
            style={styles.input}
            value={normalizedValue[index] ?? ''}
            onChangeText={(text) => handleChangeText(index, text)}
            onKeyPress={(event) => handleKeyPress(index, event)}
            keyboardType="number-pad"
            textAlign="center"
            autoCorrect={false}
            autoCapitalize="none"
            textContentType="oneTimeCode"
            autoComplete="sms-otp"
            importantForAutofill="yes"
            editable={editable}
            autoFocus={Boolean(autoFocus && index === 0)}
            selectionColor={PrimaryColors.background}
          />
        </View>
      ))}
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 8,
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 1.5,
    borderColor: NeutralColors.textSecondary,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    fontFamily: 'SNPro-Bold',
    fontSize: 20,
    color: PrimaryColors.primary,
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
  },
  inputBackground: {
    flex: 1,
    height: 50,
    borderRadius: 8,
    backgroundColor: NeutralColors.textSecondary + '1A',
    padding: 2,
  }
});
