import { View, Text, StyleSheet, Pressable } from 'react-native';

interface MBPriceContainerProps {
  price: string;
  tags?: React.ReactNode[];
}

export default function MBPriceContainer({ 
  price, tags
}: MBPriceContainerProps) {
  return (
    <View style={styles.container}>
      <View style={styles.priceContainer}>
        <Text style={styles.priceCurrencyText}>R$</Text>
        <Text style={styles.priceText} numberOfLines={1}>{price}</Text>
      </View>
      <View style={styles.tagsContainer}>
        {tags && tags}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    borderRadius: 8,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  priceCurrencyText: {
    fontSize: 14,
    fontFamily: 'SNPro-Regular',
    color: '#1F6607',
  },
  priceText: {
    fontSize: 36,
    fontFamily: 'SNPro-Bold',
    color: '#1F6607',
  },
  tagsContainer: {
    flexDirection: 'row',
    columnGap: 8,
    marginTop: 4,
  },
});