import { View, StyleSheet, Text, Image, TouchableOpacity, Pressable } from 'react-native';
import { useState } from 'react';
import { spacing } from '../../common/constants/Sizes';
import { NeutralColors, PrimaryColors } from '../../common/colors/Colors';

interface MBCartItemCounterProps {
  quantity: number;
}

export default function MBCartItemCounter({ 
  quantity
}: MBCartItemCounterProps) {
  const [currentQuantity, setCurrentQuantity] = useState(quantity);

  const handleIncrement = () => {
    setCurrentQuantity(currentQuantity + 1);
  };

  const handleDecrement = () => {
    if (currentQuantity > 1) {
      setCurrentQuantity(currentQuantity - 1);
    }
  };

  return (
    <View style={styles.productCounterWrapper}>
      <Pressable onPress={handleDecrement}><Text style={styles.counterLabel}>- </Text></Pressable>
      <Text style={styles.quantityLabel}>{currentQuantity}</Text>
      <Pressable onPress={handleIncrement}><Text style={styles.counterLabel}> +</Text></Pressable>
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
});