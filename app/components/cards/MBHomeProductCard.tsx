import { View, StyleSheet, StatusBar, Text, Image, FlatList } from 'react-native';

export default function MBHomeProductCard({ 
    product 
}: { product: { id: string; title: string; price: string; imageUri: string } }) {
  return (
    <View style={styles.productContainer}>
      <Image source={{ uri: product.imageUri }} style={styles.productImage} />
      <Text style={styles.productTitle}>{product.title}</Text>
      <Text style={styles.productPrice}><Text style={styles.currency}>R$ </Text>{product.price}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  productContainer: {
    paddingHorizontal: 8,
    marginVertical: 8,
    flex: 1,
    width: '50%',
  },
  productImage: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
    marginBottom: 4,
    borderRadius: 8,
  },
  productTitle: {
    fontSize: 12,
    color: '#4c4c4c',
    fontFamily: 'SNPro-Bold'
  },
  productPrice: {
    fontSize: 16,
    color: '#b3b3b3',
    fontFamily: 'SNPro-Regular'
  },
  currency: {
    fontSize: 12,
    color: '#b3b3b3',
    fontFamily: 'SNPro-Regular'
  }
});