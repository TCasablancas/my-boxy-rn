import { View, Text, StyleSheet, Pressable } from 'react-native';

export default function MBPriceContainer({ price }: { price: string }) {
  return (
    <View style={styles.container}>
      <View style={styles.priceContainer}>
        <Text style={styles.priceCurrencyText}>R$</Text>
        <Text style={styles.priceText} numberOfLines={1}>{price}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  priceCurrencyText: {
    fontSize: 14,
    fontFamily: 'SNPro-Regular',
    color: '#000',
  },
  priceText: {
    fontSize: 24,
    fontFamily: 'SNPro-Bold',
    color: '#000',
  },
});