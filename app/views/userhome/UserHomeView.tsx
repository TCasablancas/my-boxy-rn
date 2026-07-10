import { View, StyleSheet, StatusBar, Text, Image, FlatList, Animated } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { getUserHomeViewModel } from './UserHomeViewModel';
import { useUserHomeBottomsheetState } from './UserHomeHooks';
import MBHomeProductCard from '../../components/cards/MBHomeProductCard';
import MBHeaderUserSimple from '../../components/header/MBHeaderUserSimple';
import { HomeChartBottomsheet } from './UserHomeBottomsheets';
import { homeProducts } from '../../common/UserHomeData';
import MainNavigation, { registerNavigationTarget } from '../../common/navigation/MainNavigation';
import ProductDetailView from '../productdetail/ProductDetailView';
import NotificationsView from '../notifications/NotificationsView';
import HomeCarouselListHeader from '../../sections/home/HomeCarouselListHeader';
import { useRef } from 'react';
import MBLocationTag from '../../components/tags/MBLocationTag';
import MBMainBtn, { MBMainBtnType } from '../../components/buttons/MBMainBtn';
import { Icons } from '../../common/constants/Icons';
import MBTextBtn from '../../components/buttons/MBTextBtn';

registerNavigationTarget('NotificationsView', NotificationsView);

export default function UserHomeView() {
  const backgroundColor = 'white';
  const bottomsheetState = useUserHomeBottomsheetState();
  const userDataHeight = useRef(new Animated.Value(0)).current;
  const userDataOpacity = useRef(new Animated.Value(0)).current;

  const {
    isChartBottomsheetVisible,
    openChartBottomsheet,
    closeChartBottomsheet,
  } = getUserHomeViewModel(bottomsheetState);

  function pushNotificationsView() {
    MainNavigation.push(NotificationsView);
  }

  function openUserData() {
    userDataHeight.stopAnimation((currentValue) => {
      const shouldOpen = currentValue < 60;
      Animated.timing(userDataHeight, {
        toValue: shouldOpen ? 120 : 0,
        duration: 260,
        useNativeDriver: false,
      }).start();
      Animated.timing(userDataOpacity, {
        toValue: shouldOpen ? 1 : 0,
        duration: 260,
        useNativeDriver: true,
      }).start();
    });
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
              onPressNotifications={pushNotificationsView} 
              onPressCart={openChartBottomsheet} 
              onPressUserData={openUserData}
            />
          </View>
          <Animated.View style={[styles.userDataWrapper, { height: userDataHeight }]}>
            <Animated.View style={[styles.userDataContent, { opacity: userDataOpacity }]}>
              <MBLocationTag locationName={'Santos · SP'} onPress={() => {}} />
              {/* <MBMainBtn title="Minha loja" buttonType={MBMainBtnType.OUTLINED} onPress={() => {}} /> */}
              <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 16, width: '100%' }}>
                <MBTextBtn title="Ver meus dados" onPress={() => {}} />
                <MBTextBtn title="Ver minha loja" onPress={() => {}} />
              </View>
            </Animated.View>
          </Animated.View>
          <FlatList
            data={homeProducts}
            style={styles.scrollView} 
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <View style={{ paddingVertical: 8 }}> 
                <HomeCarouselListHeader />
              </View>
            }
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
  },
  headerContainer: {
    width: '100%', 
    height: 70, 
    backgroundColor: 'transparent',
    paddingHorizontal: 8,
  },
  userDataWrapper: {
    width: '100%',
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  userDataContent: {
    paddingHorizontal: 8,
    alignItems: 'center',
    gap: 8,
  },
});