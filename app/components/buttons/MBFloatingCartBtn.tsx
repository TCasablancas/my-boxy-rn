import { View, StyleSheet, Pressable, Text } from 'react-native';
import { Icons } from '../../common/icons/Icons';
import { PrimaryColors } from '../../common/colors/Colors';

interface MBFloatingCartBtnProps {
  items?: number;
  onPress?: () => void;
}

export default function MBFloatingCartBtn({
  items,
  onPress
}: MBFloatingCartBtnProps) {
  return (
    <Pressable style={styles.cartButtonWrapper} onPress={onPress}>
      <View style={styles.cartButtonContent}>
        <Icons.simpleCart width={16} height={16} strokeColor={PrimaryColors.primary} />
        <Text style={styles.cartButtonText}>Carrinho</Text>
        {items && items > 0 && (
          <View style={styles.cartCountWrapper}>
            <Text style={styles.cartButtonBadgeText}>{items}</Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cartButtonWrapper: { 
    height: 40, 
    // width: 120, 
    backgroundColor: PrimaryColors.primaryLight, 
    borderRadius: 100, 
    paddingHorizontal: 12,
  },
  cartButtonContent: {
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center',
    gap: 8,
  },
  cartButtonText: {
    fontSize: 16,
    color: PrimaryColors.primary, 
    fontFamily: 'SNPro-Bold',
  },
  cartCountWrapper: {
    backgroundColor: PrimaryColors.mainRed,
    borderRadius: 100,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartButtonBadgeText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'SNPro-Regular',
  },
});