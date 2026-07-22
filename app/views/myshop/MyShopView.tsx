import { View, Text, StyleSheet, TouchableOpacity, StatusBar, FlatList } from 'react-native';
import MBTitledViewHeader from '../../components/header/MBTitledViewHeader';
import MBRoundedIconBtn from '../../components/buttons/MBRoundedIconBtn';
import { IconsActions } from '../../common/icons/IconsActions';
import { NeutralColors } from '../../common/colors/Colors';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function MyShopView() {
  const products = [
    { id: '1', name: 'Product 1', price: '$10' },
    { id: '2', name: 'Product 2', price: '$20' },
    { id: '3', name: 'Product 3', price: '$30' },
  ];

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor={NeutralColors.backgroundAlt} translucent={true} />
      <View style={styles.container}>
        <MBTitledViewHeader 
          title="Minhas Compras"
          btnsRight={<MBRoundedIconBtn 
            icon={<IconsActions.filter width={16} height={16} strokeColor={NeutralColors.textSecondary} />} 
            onPress={() => {}}
          />}
        />
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
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: NeutralColors.backgroundAlt,
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