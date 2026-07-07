import { View, StyleSheet, StatusBar, Text, Image, FlatList } from 'react-native';
import MBStoreProductHeader from '../header/MBStoreProductHeader';

interface MBUserFavoriteCardProps {
  item: {
    id: string;
    itemPic: string;
    name: string;
    price: number;
  };
}

export default function MBUserFavoriteCard({
  item
}: MBUserFavoriteCardProps) {
  return (
    <View style={styles.cardWrapper}>
      <View style={styles.cardImage}>
        <Image source={{ uri: item.itemPic }} style={{ width: '100%', height: '100%' }} />
      </View>
      <View style={styles.cardContainer}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>
          <Text style={styles.currency}>R$</Text>
          {item.price.toFixed(2)}
        </Text>
        <MBStoreProductHeader />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    flexDirection: 'row',
    marginBottom: 8,
    gap: 8,
  },
  cardContainer: {
    backgroundColor: '#F0E5E4',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  cardImage: {
    width: 100,
    height: 100,
    marginBottom: 8,
    backgroundColor: '#d3d3d3',
    borderRadius: 8,
    overflow: 'hidden',
  },
  itemName: {
    fontSize: 12,
    fontFamily: 'SNPro-Regular',
  },
  itemPrice: {
    fontSize: 18,
    color: '#888',
    fontFamily: 'SNPro-Bold',
  },
  currency: {
    fontSize: 12,
    color: '#888',
    fontFamily: 'SNPro-Bold',
    marginRight: 4,
  },
});