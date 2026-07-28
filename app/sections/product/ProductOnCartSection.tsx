import { View, StyleSheet, Text, Image, TouchableOpacity, Pressable } from 'react-native';
import { CartItemProps } from '../../views/cart/CartModel';
import { spacing } from '../../common/constants/Sizes';
import { Icons } from '../../common/icons/Icons';
import { NeutralColors, PrimaryColors } from '../../common/colors/Colors';
import { IconsActions } from '../../common/icons/IconsActions';
import MBMainSelector from '../../components/selectors/MBMainSelector';

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
  return (
    <>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row' }}>
          <Pressable style={{marginRight: spacing.md}}>
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
            {/* <Pressable>
              <IconsActions.trash width={16} height={16} strokeColor={NeutralColors.textSecondary} />
            </Pressable> */}
            <View style={styles.productCounterWrapper}>
              <Pressable><Text style={styles.counterLabel}>- </Text></Pressable>
              <Text style={styles.quantityLabel}>{product.quantity}</Text>
              <Pressable><Text style={styles.counterLabel}> +</Text></Pressable>
            </View>
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
    // flex: 1,
    justifyContent: 'space-between',
    // alignItems: 'center',
    // backgroundColor: 'white',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    borderRadius: 8,
    // marginBottom: 16,
    // flexDirection: 'row',
    // alignItems: 'center',
  },
  productInfoWrapper: {
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
    fontFamily: 'SNPro-Regular',
  },
  priceLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    color: PrimaryColors.mainBlue,
  },
  currency: {
    fontWeight: 'normal',
    fontSize: 12,
    opacity: 0.7,
  },
  nameLabel: {
    fontSize: 14,
    fontFamily: 'SNPro-Regular',
    color: NeutralColors.text,
  },
  productActionsWrapper: { 
    position: 'absolute', 
    right: 0, top: 0, bottom: 0, 
    flexDirection: 'column',
    alignItems: 'flex-end', 
    justifyContent: 'flex-end', 
    gap: spacing.md 
  },
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