import { Pressable, StyleSheet, Text, View } from 'react-native';
import { PrimaryColors } from '../../common/colors/Colors';

interface MBMainCounterProps {
  value: number;
  onDecrement: () => void;
  onIncrement: () => void;
  reset?: () => void;
}

export default function MBMainCounter({
  value, onDecrement, onIncrement, reset,
}: MBMainCounterProps) {
  return (
    <View style={styles.container}>
      <Pressable onPress={onDecrement} style={styles.button}>
        <Text style={styles.buttonText}>-</Text>
      </Pressable>
      <View style={styles.valueBox}>
        <Text style={styles.valueText}>{value}</Text>
      </View>
      <Pressable onPress={onIncrement} style={styles.button}>
        <Text style={styles.buttonText}>+</Text>
      </Pressable>
      {reset && (
        <Pressable onPress={reset} style={styles.button}>
          <Text style={styles.buttonText}>R</Text>
        </Pressable>
      )}
    </View>
   );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    paddingHorizontal: 6,
    borderRadius: 16,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 2,
  },
  button: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: PrimaryColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
    color: '#fff',
  },
  valueBox: {
    minWidth: 42,
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  valueText: {
    fontSize: 14,
    fontWeight: '700',
    color: PrimaryColors.primaryDark,
  },
});