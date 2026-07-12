import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NeutralColors } from '../../common/colors/Colors';

interface MBOutlinedSmBtnProps {
  title: string;
  onPress: () => void;
}

export default function MBOutlinedSmBtn({ title, onPress }: MBOutlinedSmBtnProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: NeutralColors.border,
    backgroundColor: NeutralColors.backgroundAlt,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: NeutralColors.textSecondary,
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'SNPro-Regular',
  },
});