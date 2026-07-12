import { View, StyleSheet, StatusBar, FlatList } from 'react-native';
import MBTitledViewHeader from '../../components/header/MBTitledViewHeader';
import { Icons } from '../../common/icons/Icons';
import MBRoundedIconBtn from '../../components/buttons/MBRoundedIconBtn';
import { NeutralColors } from '../../common/colors/Colors';
import MBHomeProductCard from '../../components/cards/MBMainProductCard';
import ProductDetailView from '../productdetail/ProductDetailView';
import MainNavigation from '../../common/navigation/MainNavigation';

import { homeProducts } from '../../common/UserHomeData';
import { IconsActions } from '../../common/icons/IconsActions';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function UserFavoritesView() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor={NeutralColors.backgroundAlt} translucent={true} />
      <View style={styles.container}>
        <View style={styles.contentWrapper}>
          <MBTitledViewHeader 
            title="Curtidos"
            btnsRight={<MBRoundedIconBtn 
              icon={<IconsActions.filter width={16} height={16} strokeColor={NeutralColors.textSecondary} />} 
              onPress={() => {}}
            />}
          />
          <View style={styles.listWrapper}>
            <FlatList
              data={homeProducts}
              numColumns={2}
              // ListHeaderComponent={
              //   <View style={{ paddingVertical: 8 }}> 
              //     <HomeCarouselListHeader />
              //   </View>
              // }
              renderItem={({ item }) => (
                <MBHomeProductCard product={{
                  productId: item.productId,
                  title: item.title,
                  price: `${item.price.toFixed(2)}`,
                  imageUri: item.imageUri,
                  storeName: item.storeName,
                  storeImageUri: item.storeImageUri,
                  rating: item.rating,
                  onPress: () => {
                    MainNavigation.push(ProductDetailView, { productId: item.productId });
                  },
                  onPressFavorite: () => {
                    // Handle favorite press
                  },
                }} />
              )}
              keyExtractor={(item) => item.productId}
              style={styles.flatList}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContainer}
            />
          </View>
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: NeutralColors.backgroundAlt,
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 16,
    flexDirection: 'column',
  },
  listWrapper: {
    marginBottom: 42,
    paddingBottom: 16,
    borderRadius: 16,
    padding: 8,
  },
  flatList: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  listContainer: {
    gap: 8,
  },
});