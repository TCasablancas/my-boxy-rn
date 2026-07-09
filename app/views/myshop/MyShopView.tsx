import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

export default function MyShopView() {
  const products = [
    { id: '1', name: 'Product 1', price: '$10' },
    { id: '2', name: 'Product 2', price: '$20' },
    { id: '3', name: 'Product 3', price: '$30' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Shop</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.productItem}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>{item.price}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  productItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  productName: {
    fontSize: 18,
  },
  productPrice: {
    fontSize: 16,
    color: '#888',
  },
});