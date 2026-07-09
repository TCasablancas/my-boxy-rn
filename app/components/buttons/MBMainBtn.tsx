import { View, StyleSheet, Text, Pressable } from 'react-native';
import { PrimaryColors } from '../../common/colors/Colors';

interface MBMainBtnProps {
  title: string;
  onPress: () => void;
  isDisabled?: boolean;
  icon?: React.ReactNode;
  position?: 'absolute' | 'relative';
  textAlign?: 'center' | 'left' | 'right';
  outlined?: boolean;
}

export default function MBMainBtn({
  title,
  onPress,
  isDisabled = false,
  icon,
  textAlign = 'center',
  outlined = false,
}: MBMainBtnProps) {

  const handlePress = () => {
    if (!isDisabled) {
      onPress();
    }
  };

  return (
    <Pressable
      style={[styles.button, outlined ? styles.outlinedButton : {}]}
      onPress={handlePress}
      disabled={isDisabled}
    >
      <View style={styles.buttonContent}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <Text style={[styles.buttonText, outlined ? styles.outlinedButtonText : {}, { textAlign }]}>{title}</Text>
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