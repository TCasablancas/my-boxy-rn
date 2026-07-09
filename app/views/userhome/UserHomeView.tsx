import { View, StyleSheet, StatusBar, Text, Image, FlatList } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { getUserHomeViewModel } from './UserHomeViewModel';
import { useUserHomeBottomsheetState } from './UserHomeHooks';
import MBHomeProductCard from '../../components/cards/MBHomeProductCard';
import MBHeaderUserSimple from '../../components/header/MBHeaderUserSimple';
import { HomeChartBottomsheet } from './UserHomeBottomsheets';
import { homeProducts } from '../../common/UserHomeData';
import MainNavigation from '../../common/navigation/MainNavigation';
import ProductDetailView from '../productdetail/ProductDetailView';

export default function UserHomeView() {
  const backgroundColor = 'white';
  const bottomsheetState = useUserHomeBottomsheetState();

  const {
    isChartBottomsheetVisible,
    openChartBottomsheet,
    closeChartBottomsheet,
  } = getUserHomeViewModel(bottomsheetState);

  function navigateToSearchView() {
    MainNavigation.navigate('MainTabs', { screen: 'busca' });
  }

  return (
    <>
    <SafeAreaProvider>
      <StatusBar barStyle={'light-content'} backgroundColor={backgroundColor} />
      <View style={[{ backgroundColor: backgroundColor }, styles.container]}>
        <View style={[styles.contentWrapper]}>
          <View style={styles.headerContainer}>
            <MBHeaderUserSimple 
              userName="Thiago Silva" 
              userAlias="thyagoacsilva" 
              onPressNotifications={navigateToSearchView} 
              onPressCart={openChartBottomsheet} 
            />
          </View>
          <FlatList
            data={homeProducts}
            style={styles.scrollView} 
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <MBHomeProductCard product={{
                id: item.id,
                title: item.title,
                price: `${item.price.toFixed(2)}`,
                imageUri: item.imageUri,
                storeName: item.storeName,
                storeImageUri: item.storeImageUri,
                rating: item.rating,
                onPress: () => {
                  MainNavigation.push(ProductDetailView, { productId: item.id });
                },
                onPressFavorite: () => {
                  // Handle favorite press
                },
              }} />
            )}
            numColumns={2}
            contentContainerStyle={{ paddingBottom: 16 }}
          />
        </View>
      </View>
    </SafeAreaProvider>

    <HomeChartBottomsheet 
      isVisible={isChartBottomsheetVisible} 
      onClose={closeChartBottomsheet} 
    />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentWrapper: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    left: 8,
    right: 8,
    bottom: 8,
    borderRadius: 12,
  },
  scrollView: {
    backgroundColor: '#EBEBEB',
    borderRadius: 12,
    // flexWrap: 'wrap',
    // flexDirection: 'row',
  },
  headerContainer: {
    width: '100%', 
    height: 70, 
    backgroundColor: 'transparent',
    paddingHorizontal: 8,
  },
});