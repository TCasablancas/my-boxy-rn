import { View, Text, StyleSheet, Pressable } from 'react-native';
import MBMainSelector from './MBMainSelector';
import { NeutralColors, PrimaryColors } from '../../common/colors/Colors';

interface MBTextWithSelectProps {
  text: string;
  value?: string;
  onChange?: () => void;
}

export default function MBTextWithSelect({ 
    text, value, onChange
}: MBTextWithSelectProps) {
  return (
    <Pressable style={styles.container} onPress={onChange}>
      <Text style={styles.text}>{text}</Text>
      <MBMainSelector value={value ?? 'off'} onChange={onChange} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  text: {
    fontSize: 14,
    fontFamily: 'SNPro-Regular',
    color: NeutralColors.text,
  },
});