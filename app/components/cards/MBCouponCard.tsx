import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { PrimaryColors } from '../../common/colors/Colors';
import MBRoundedIconBtn from '../buttons/MBRoundedIconBtn';
import { Icons } from '../../common/icons/Icons';
import { IconsActions } from '../../common/icons/IconsActions';

export enum DiscountType {
  Percentage = 'percentage',
  FixedAmount = 'fixed_amount',
}

interface MBCouponCardProps {
  couponCode: string;
  discountValue: number;
  type?: DiscountType;
  onPress?: () => void;
}

export default function MBCouponCard({
  couponCode, discountValue, type, onPress,
}: MBCouponCardProps) {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.couponInfo}>
        <Text style={styles.couponCode}>{couponCode}</Text>
        <Text style={styles.discountValue}>
          {type === DiscountType.FixedAmount && (
            <>
              <Text style={styles.currency}>R$</Text>
              {discountValue.toFixed(2)}
            </>
          )}
          {type === DiscountType.Percentage && (
            <>
              {discountValue}
              <Text style={styles.currency}>%</Text>
            </>
          )}
        </Text>
        <Text style={styles.validity}>Válido até 31/12/2024</Text>
      </View>
      <View style={{ flexDirection: 'row', gap: 8, justifyContent: 'center', alignItems: 'center' }}>
        <MBRoundedIconBtn 
          icon={<IconsActions.eye width={16} height={16} strokeColor={PrimaryColors.mainBlue} />}
          onPress={onPress || (() => {})}
        />
        <MBRoundedIconBtn 
          icon={<Icons.check width={16} height={16} strokeColor={PrimaryColors.primaryDark} />}
          backgroundColor={PrimaryColors.primaryLight}
          onPress={onPress || (() => {})}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.2)',
    elevation: 2,
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  couponInfo: {
    flex: 1,
  },
  couponCode: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  discountValue: {
    fontSize: 18,
    color: PrimaryColors.mainBlue,
    marginTop: 4,
  },
  validity: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  currency: {
    fontSize: 12,
    opacity: 0.5,
  },
});