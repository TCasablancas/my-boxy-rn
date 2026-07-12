import { View, StyleSheet, Text, Pressable } from 'react-native';
import { PrimaryColors } from '../../common/colors/Colors';
import getContrastingTextColor from '../../common/constants/ColorsHandler';

export enum MBMainBtnType {
  NORMAL = 'normal',
  DARK = 'dark',
  LIGHT = 'light',
  DISABLED = 'disabled',
  CUSTOM = 'custom',
  OUTLINED = 'outlined',
}

interface MBMainBtnProps {
  title: string;
  onPress: () => void;
  icon?: React.ReactNode;
  position?: 'absolute' | 'relative';
  textAlign?: 'center' | 'left' | 'right';
  buttonType?: MBMainBtnType | 'primary';
  onClick?: () => void;
  backgroundColor?: string;
  textColor?: string;
}

export default function MBMainBtn({
  title,
  onPress,
  onClick,
  icon,
  textAlign = 'center',
  buttonType = MBMainBtnType.NORMAL,
  backgroundColor,
  textColor,
}: MBMainBtnProps) {

  const resolvedType = buttonType ?? (backgroundColor || textColor
    ? MBMainBtnType.CUSTOM
    : MBMainBtnType.NORMAL);

  const resolvedBackgroundColor = (() => {
    switch (resolvedType) {
      case MBMainBtnType.DARK:
        return PrimaryColors.primaryDark;
      case MBMainBtnType.LIGHT:
        return PrimaryColors.primaryLight;
      case MBMainBtnType.DISABLED:
        return '#D6D6D6';
      case MBMainBtnType.CUSTOM:
        return backgroundColor || '#6ABA02';
      case MBMainBtnType.NORMAL:
        return '#6ABA02';
      case MBMainBtnType.OUTLINED:
        return 'transparent';
      default:
        return '#6ABA02';
    }
  })();

  const resolvedTextColor = (() => {
    if (resolvedType === MBMainBtnType.DISABLED) return '#8A8A8A';
    if (resolvedType === MBMainBtnType.NORMAL) return '#FFFFFF';
    if (resolvedType === MBMainBtnType.LIGHT) return PrimaryColors.primary;
    if (resolvedType === MBMainBtnType.OUTLINED) return PrimaryColors.primary;
    if (textColor) return textColor;
    return getContrastingTextColor(resolvedBackgroundColor);
  })();

  const isDisabled = resolvedType === MBMainBtnType.DISABLED;
  const handlePress = onClick ?? onPress ?? (() => {});

  return (
    <Pressable
      style={[
        styles.button, 
        MBMainBtnType.OUTLINED === resolvedType && styles.outlinedButton,
        {
          backgroundColor: resolvedBackgroundColor,
          // width: size === 'main' ? '100%' : 'auto',
          opacity: isDisabled ? 0.8 : 1,
        },
      ]}
      onPress={handlePress}
      disabled={isDisabled}
    >
      <View style={styles.buttonContent}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <Text style={[styles.buttonText, { textAlign, color: resolvedTextColor }]}>{title}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    backgroundColor: '#6ABA02',
    paddingVertical: 10,
    paddingHorizontal: 26,
    borderRadius: 16,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'SNPro-Regular',
  },
  iconContainer: {
    marginRight: 8,
  },
  outlinedButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: PrimaryColors.primary,
  },
  outlinedButtonText: {
    color: PrimaryColors.primary,
  },
});