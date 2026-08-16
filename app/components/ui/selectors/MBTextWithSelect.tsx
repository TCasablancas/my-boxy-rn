import { Text, StyleSheet, Pressable } from 'react-native';
import MBMainSelector from './MBMainSelector';
import { NeutralColors } from '../../../common/colors/Colors';
import { Fonts } from '../../../common/constants/Fonts';

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
      <MBMainSelector value={value ?? 'off'} onChange={onChange} />
      <Text style={{ color: NeutralColors.textSecondary, ...Fonts.LexendRegular12 }}>
        {text}
      </Text> 
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 4,
  },
});