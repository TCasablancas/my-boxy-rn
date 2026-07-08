import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import useWalletViewModel from './WalletViewModel';

export default function WalletView() {
  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.name}</Text>
      <Text style={styles.itemText}>{item.amount}</Text>
    </View>
  );

  const { transactions } = useWalletViewModel();

  return (
    <View style={styles.container}>
      <FlatList
        data={transactions}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 16,
  },
});