import { View, StyleSheet, StatusBar, FlatList, Animated } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { getUserHomeViewModel } from './UserHomeViewModel';
import { useUserHomeBottomsheetState } from './UserHomeHooks';
import MBHomeProductCard from '../../components/cards/MBHomeProductCard';
import MBHeaderUserSimple from '../../components/header/MBHeaderUserSimple';
import { HomeChartBottomsheet } from './UserHomeBottomsheets';
import { homeProducts } from '../../common/UserHomeData';
import HomeCarouselListHeader from '../../sections/home/HomeCarouselListHeader';
import { useRef } from 'react';
import MBLocationTag from '../../components/tags/MBLocationTag';
import {
  openCarouselTarget,
  openNotifications,
  openProductDetail,
  openStoreSignup,
  openUserProfile,
  userHomeCarouselItems,
} from './UserHomeNavigation';
import MBOutlinedSmBtn from '../../components/buttons/MBOutlinedSmBtn';

export default function UserHomeView() {
  const safeAreaInsets = useSafeAreaInsets();
  const bottomsheetState = useUserHomeBottomsheetState();
  const userDataHeight = useRef(new Animated.Value(0)).current;
  const userDataOpacity = useRef(new Animated.Value(0)).current;

  const {
    isChartBottomsheetVisible,
    openChartBottomsheet,
    closeChartBottomsheet,
  } = getUserHomeViewModel(bottomsheetState);

  function openUserData() {
    userDataHeight.stopAnimation((currentValue) => {
      const shouldOpen = currentValue < 60;
      Animated.timing(userDataHeight, {
        toValue: shouldOpen ? 90 : 0,
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
      <StatusBar barStyle={'light-content'} backgroundColor={"#fff"} translucent={true} />
      <View style={[styles.container]}>
        <View style={[styles.contentWrapper]}>
          <View style={[styles.headerContainer, { paddingTop: safeAreaInsets.top }]}>
            <MBHeaderUserSimple 
              userName="Thiago Silva"
              userAlias="thyagoacsilva" 
              onPressNotifications={openNotifications} 
              onPressCart={openChartBottomsheet} 
              onPressUserData={openUserData}
            />
          </View>
          <Animated.View style={[styles.userDataWrapper, { height: userDataHeight }]}>
            <Animated.View style={[styles.userDataContent, { opacity: userDataOpacity }]}>
              <MBLocationTag locationName={'Santos · SP'} onPress={() => {}} />
              <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 16, width: '100%' }}>
                {/* <MBTextBtn title="Ver meus dados" onPress={openUserProfile} />
                <MBTextBtn title="Ver minha loja" onPress={openStoreSignup} /> */}
                <MBOutlinedSmBtn title="Ver meus dados" onPress={openUserProfile} />
                <MBOutlinedSmBtn title="Ver minha loja" onPress={openStoreSignup} />
              </View>
            </Animated.View>
          </Animated.View>
          <FlatList
            data={homeProducts}
            style={styles.scrollView} 
            keyExtractor={(item) => item.productId}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <View style={{ paddingVertical: 8 }}> 
                <HomeCarouselListHeader items={userHomeCarouselItems} onPressItem={openCarouselTarget} />
              </View>
            }
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
                  openProductDetail(item.productId);
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
    backgroundColor: 'white',
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
    marginVertical: 24,
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