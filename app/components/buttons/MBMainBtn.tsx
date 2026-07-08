import { View, StyleSheet, Text, Pressable } from 'react-native';
import { PrimaryColors } from '../../common/colors/Colors';

interface MBMainBtnProps {
  title: string;
  onPress: () => void;
  isDisabled?: boolean;
  icon?: React.ReactNode;
  textColor?: string;
  backgroundColor?: string;
  position?: 'absolute' | 'relative';
  size?: 'main' | 'small';
  rounded?: boolean;
  textAlign?: 'center' | 'left' | 'right';
}

export default function MBMainBtn({
  title,
  onPress,
  isDisabled = false,
  icon,
  textColor,
  backgroundColor,
  position = 'relative',
  size = 'main',
  rounded = true,
  textAlign = 'center',
}: MBMainBtnProps) {
  const resolvedTextColor = textColor || 'white';
  const resolvedBackgroundColor = backgroundColor || PrimaryColors.primary;

  const handlePress = () => {
    if (!isDisabled) {
      onPress();
    }
  };

  return (
    <Pressable
      style={[
        styles.button,
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
    backgroundColor: PrimaryColors.primary,
    paddingVertical: 10,
    paddingHorizontal: 26,
    borderRadius: 16,
    height: 50,
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
    backgroundColor: PrimaryColors.primary,
    marginRight: 8,
  },
});