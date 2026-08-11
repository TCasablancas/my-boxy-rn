import { View, StyleSheet, Text, Image, Pressable } from 'react-native';
import { useCounter } from '../../states/useCounter';
import { CartItemProps } from '../../pages/cart/CartModel';
import { spacing } from '../../common/constants/Sizes';
import { NeutralColors, PrimaryColors } from '../../common/colors/Colors';

import MBMainSelector from '../../components/ui/selectors/MBMainSelector';
import { MBCartItemCounter } from '../../components/ui/counter/MBCartItemCounter';

interface ProductOnCartSectionProps {
  product: CartItemProps,
  isItemSelected?: boolean,
  onItemSelectedChange?: () => void,
  onQuantityChange?: (quantity: number) => void,
  onRemoveItem?: () => void,
}

export default function ProductOnCartSection({ 
  product, isItemSelected, onItemSelectedChange, onQuantityChange, onRemoveItem,
}: ProductOnCartSectionProps) {
  // const handleIncrement = () => {
  //   onQuantityChange?.(product.quantity + 1);
  // };

  // const handleDecrement = () => {
  //   if (product.quantity <= 1) {
  //     return;
  //   }
  //   onQuantityChange?.(product.quantity - 1);
  // };

  const { count, increment, decrement } = useCounter(product.quantity);

  return (
    <>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row' }}>
          <Pressable style={{ marginRight: spacing.md }}>
            <MBMainSelector 
              value={isItemSelected ? 'on' : 'off'} 
              onChange={() => { onItemSelectedChange?.() || console.log('onItemSelectedChange not provided') }} 
            />
          </Pressable>
          <View style={styles.imageWrapper}>
            <Image source={{ uri: product.imageUri }} style={styles.imageContent} resizeMode="cover" />
          </View>
          <View style={styles.productInfoWrapper}>
            <Text style={styles.nameLabel} numberOfLines={1} ellipsizeMode="tail">
              {product.name}
            </Text>
            <Text style={styles.priceLabel}>
              <Text style={styles.currency}>R$</Text>{product.price}
            </Text>
            <Text style={styles.shippingLabel}>{product.shipping}</Text>
          </View>
          <View style={styles.productActionsWrapper}>
            <MBCartItemCounter
              quantity={count}
              onIncrement={increment}
              onDecrement={decrement}
            />
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  imageContent: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  container: {
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    borderRadius: 8,
  },
  productInfoWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  imageWrapper: {
    width: 54,
    height: 54,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginRight: spacing.sm,
  },
  shippingLabel: {
    fontSize: 12,
    color: NeutralColors.textSecondary,
    fontFamily: 'SFMonoRegular',
    letterSpacing: -0.5,
  },
  priceLabel: {
    fontFamily: 'SFMonoBold',
    letterSpacing: -0.5,
    fontSize: 16,
    // letterSpacing: -0.5,
    color: PrimaryColors.mainBlue,
  },
  currency: {
    fontFamily: 'SFMonoRegular',
    letterSpacing: -0.5,
    fontSize: 12,
    opacity: 0.7,
  },
  nameLabel: {
    fontSize: 14,
    fontFamily: 'SFMonoRegular',
    letterSpacing: -0.5,
    color: NeutralColors.text,
    // paddingRight: 40,
    // overflow: 'hidden',
    // width: '%',
    // backgroundColor: 'red',
  },
  productActionsWrapper: { 
    position: 'absolute', 
    right: 0, 
    bottom: 0, 
  },
});