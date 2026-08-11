import { StyleSheet, Text, View } from 'react-native';
import { NeutralColors, PrimaryColors } from '../../../common/colors/Colors';
import { spacing } from '../../../common/constants/Sizes';
interface MBCartAmmountDescLblProps {
  label: string;
  amount: string;
  size: 'small' | 'medium' | 'large';
  isLast?: boolean;
}

export default function MBCartAmmountDescLbl({ 
  label, amount, size, isLast 
}: MBCartAmmountDescLblProps) {
  return (
    <View style={[styles.container, !isLast && { borderBottomWidth: 1 }]}>
      <Text style={styles.titleLabel}>{label}</Text>
      <Text style={[
        styles.ammountLabel, 
        { fontSize: size === 'small' ? 14 : size === 'large' ? 24 : 16 }
      ]}>
        <Text style={[styles.currencySymbol, {flex: 1}]}>R$ </Text>{amount}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    borderBottomColor: NeutralColors.border,
  },
  titleLabel: {
    fontSize: 14,
    fontFamily: 'SFMonoRegular',
    letterSpacing: -0.5,
    color: NeutralColors.textSecondary,
  },
  ammountLabel: {
    fontSize: 16,
    fontFamily: 'SFMonoBold',
    letterSpacing: -0.5,
    color: PrimaryColors.mainBlue,
  },
  currencySymbol: {
    fontSize: 12,
    // fontFamily: 'SFMonoBold',
    fontWeight: '400',
    color: PrimaryColors.mainBlue,
    opacity: 0.5,
    marginRight: 12,
  },
});