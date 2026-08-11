import { View, StyleSheet, Text, Pressable } from 'react-native';
import { spacing } from '../../../common/constants/Sizes';
import { NeutralColors, PrimaryColors } from '../../../common/colors/Colors';

interface MBCartItemCounterProps {
  quantity: number;
  onIncrement?: () => void;
  onDecrement?: () => void;
}

export const MBCartItemCounter = ({ 
  quantity, onIncrement, onDecrement,
}: MBCartItemCounterProps) => {
  const canDecrement = quantity > 1;

  return (
    <View style={styles.productCounterWrapper}>
      <Pressable disabled={!canDecrement} onPress={onDecrement}>
        <Text style={[styles.counterLabel, !canDecrement ? styles.counterLabelDisabled : null]}>- </Text>
      </Pressable>
      <Text style={styles.quantityLabel}>{quantity}</Text>
      <Pressable onPress={onIncrement}><Text style={styles.counterLabel}> +</Text></Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  productCounterWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
    backgroundColor: 'white',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 100,
    width: 80,
  },
  quantityLabel: {
    fontSize: 14,
    color: PrimaryColors.mainBlue,
  },
  counterLabel: {
    fontSize: 14,
    color: NeutralColors.textSecondary,
  },
  counterLabelDisabled: {
    opacity: 0.35,
  },
});