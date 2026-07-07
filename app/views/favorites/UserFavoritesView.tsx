import { View, StyleSheet, Text, Image, FlatList } from 'react-native';
import MBTitledViewHeader from '../../components/header/MBTitledViewHeader';
import { Icons } from '../../common/constants/Icons';
import MBRoundedIconBtn from '../../components/buttons/MBRoundedIconBtn';
import MBStoreProductHeader from '../../components/header/MBStoreProductHeader';
import MBUserFavoriteCard from '../../components/cards/MBUserFavoriteCard';

const sampleData = [
  { id: '1', 
    itemPic: 'https://cultured.guru/wp-content/uploads/2019/09/FullSizeRender-1.jpg', 
    name: 'Item 1', 
    price: 10.99 
  },
  { id: '2', 
    itemPic: 'https://wondrwood.com/cdn/shop/articles/terrarium_steps.jpg?v=1634833473', 
    name: 'Item 2', 
    price: 15.49 
  },
  { id: '3', 
    itemPic: 'https://via.placeholder.com/150', 
    name: 'Item 3', 
    price: 7.99 
  },
  { id: '4', 
    itemPic: 'https://via.placeholder.com/150', 
    name: 'Item 4', 
    price: 12.99 
  },
  { id: '5', 
    itemPic: 'https://via.placeholder.com/150', 
    name: 'Item 5', 
    price: 9.99 
  },
  { id: '6', 
    itemPic: 'https://via.placeholder.com/150', 
    name: 'Item 3', 
    price: 7.99 
  },
  { id: '7', 
    itemPic: 'https://via.placeholder.com/150', 
    name: 'Item 4', 
    price: 12.99 
  },
  { id: '8', 
    itemPic: 'https://via.placeholder.com/150', 
    name: 'Item 5', 
    price: 9.99 
  },
];

export default function UserFavoritesView() {
  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        <View style={styles.headerWrapper}>
          <MBTitledViewHeader 
            title="Curtidas"
            btnsRight={<MBRoundedIconBtn 
              icon={<Icons.barcode width={16} height={16} />} 
              onPress={() => {}}
            />}
          />
        </View>
        <View style={styles.listWrapper}>
          <FlatList
            data={sampleData}
            renderItem={({ item }) => (
              <MBUserFavoriteCard item={item} />
            )}
            keyExtractor={(item) => item.id}
            style={styles.flatList}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0E5E4',
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    flexDirection: 'column',
  },
  headerWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  listWrapper: {
    position: 'absolute',
    top: 120,
    left: 16,
    right: 16,
    bottom: 0,
    flex: 1,
    marginTop: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 8,
    marginBottom: 8,
  },
  flatList: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
});