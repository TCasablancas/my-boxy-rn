import React, { useRef, useState } from 'react';
import { Animated, TextInput, View, StyleSheet, TextInputProps, TextStyle, } from 'react-native';

interface MBFloatingLabelInputProps extends Omit<TextInputProps, 'style'> {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
}

/**
 * Input com "floating label": o rótulo começa dentro do campo e sobe
 * para o topo quando o usuário foca ou já preencheu algo.
 */
export default function MBFloatingLabelInput({ 
  label, value, onChangeText, editable = true, multiline, ...rest 
}: MBFloatingLabelInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const animatedValue = useRef(new Animated.Value(value ? 1 : 0)).current;

  const animateTo = (toValue: number) => {
    Animated.timing(animatedValue, {
      toValue,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  const handleFocus = () => {
    setIsFocused(true);
    animateTo(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (!value) animateTo(0);
  };

  const labelStyle: TextStyle = {
    position: 'absolute',
    left: 12,
    top: animatedValue.interpolate({ inputRange: [0, 1], outputRange: [multiline ? 16 : 18, -8] }) as unknown as number,
    fontSize: animatedValue.interpolate({ inputRange: [0, 1], outputRange: [15, 12] }) as unknown as number,
    color: isFocused ? '#3457D5' : '#8A93A6',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 4,
  };

  return (
    <View style={styles.wrapper}>
      <Animated.Text style={labelStyle}>{label}</Animated.Text>
      <TextInput
        {...rest}
        value={value}
        editable={editable}
        multiline={multiline}
        onChangeText={onChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={[
          styles.input,
          multiline && styles.multiline,
          !editable && styles.disabled,
          { borderColor: isFocused ? '#3457D5' : '#D8DEEB' },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { position: 'relative', marginTop: 8 },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 14,
    fontSize: 15,
    color: '#1F2A44',
  },
  multiline: { 
    minHeight: 96, 
    textAlignVertical: 'top' 
  },
  disabled: { 
    backgroundColor: '#F3F4F7', 
    color: '#8A93A6' 
  },
});