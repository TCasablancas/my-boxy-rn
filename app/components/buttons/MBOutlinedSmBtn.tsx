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
    borderColor: NeutralColors.textSecondary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 100,
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