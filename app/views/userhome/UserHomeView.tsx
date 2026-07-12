import { View, StyleSheet, StatusBar, FlatList, Animated } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { getUserHomeViewModel } from './UserHomeViewModel';
import MBHeaderUserSimple from '../../components/header/MBHeaderUserSimple';
import HomeCarouselListHeader from '../../sections/home/HomeCarouselListHeader';
import { useCallback, useMemo, useRef, useState } from 'react';
import MBLocationTag from '../../components/tags/MBLocationTag';
import {
  openCarouselTarget,
  openCart,
  openNotifications,
  openProductDetail,
  openStoreSignup,
  openUserProfile,
  userHomeCarouselItems,
} from './UserHomeNavigation';
import MBOutlinedSmBtn from '../../components/buttons/MBOutlinedSmBtn';
import MBHomeStoreItemCarousel from '../../components/carousel/MBHomeStoreItemCarousel';
import { HomeStoreSection } from './UserHomeViewModel';

interface UserHomeViewProps {
  isUserLoggedIn: boolean;
}

export default function UserHomeView({ isUserLoggedIn }: UserHomeViewProps) {
  const safeAreaInsets = useSafeAreaInsets();
  const userDataHeight = useRef(new Animated.Value(0)).current;
  const userDataOpacity = useRef(new Animated.Value(0)).current;
  const { getInitialStoreSections, getNextStoreSections } = useMemo(() => getUserHomeViewModel(), []);
  const [storeSections, setStoreSections] = useState<HomeStoreSection[]>(() => getInitialStoreSections());

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

  const handleLoadMoreStores = useCallback(() => {
    setStoreSections((currentSections) => {
      const nextSections = getNextStoreSections(currentSections.length);
      return [...currentSections, ...nextSections];
    });
  }, [getNextStoreSections]);

  const renderStoreCarousel = useCallback(({ 
    item, isFirst 
  }: { item: HomeStoreSection, isFirst: boolean }) => {
    const products = item.products.map((product) => ({
      productId: product.productId,
      title: product.title,
      price: product.price.toFixed(2),
      imageUri: product.imageUri,
      storeName: product.storeName,
      storeImageUri: product.storeImageUri,
      rating: product.rating,
    }));

    return (
      <View style={{
        // backgroundColor: '#EBEBEB', 
        // borderRadius: 16,
        marginVertical: 8,
        // borderTopLeftRadius: isFirst ? 16 : 0, borderTopRightRadius: isFirst ? 16 : 0,
        // marginHorizontal: 16,
      }}>
        <MBHomeStoreItemCarousel
          storeName={item.storeName}
          products={products}
          onPressProduct={openProductDetail}
        />
      </View>
    );
  }, []);

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
              onPressNotifications={isUserLoggedIn ? openNotifications : undefined} 
              onPressCart={openCart} 
              onPressUserData={openUserData}
            />
          </View>
          <Animated.View style={[styles.userDataWrapper, { height: userDataHeight }]}>
            <Animated.View style={[styles.userDataContent, { opacity: userDataOpacity }]}>
              <MBLocationTag locationName={'Santos · SP'} onPress={() => {}} />
              <View style={styles.userActionsWrapper}>
                <MBOutlinedSmBtn title="Ver meus dados" onPress={openUserProfile} />
                <MBOutlinedSmBtn title="Ver minha loja" onPress={openStoreSignup} />
              </View>
            </Animated.View>
          </Animated.View>
          <FlatList
            data={storeSections}
            style={styles.scrollView} 
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <View style={{ paddingVertical: 8 }}> 
                <HomeCarouselListHeader items={userHomeCarouselItems} onPressItem={openCarouselTarget} />
              </View>
            }
            renderItem={({ item, index }) => renderStoreCarousel({ item, isFirst: index === 0 })}
            onEndReached={handleLoadMoreStores}
            onEndReachedThreshold={0.5}
            initialNumToRender={4}
            maxToRenderPerBatch={4}
            windowSize={7}
            removeClippedSubviews
            contentContainerStyle={{ paddingBottom: 16 }}
          />
        </View>
      </View>
    </SafeAreaProvider>

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
    left: 0,
    right: 0,
    bottom: 8,
    borderRadius: 12,
  },
  scrollView: {
    backgroundColor: 'transparent',
    borderRadius: 12,
  },
  headerContainer: {
    width: '100%', 
    height: 70, 
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
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
  userActionsWrapper: { 
    flexDirection: 'row', 
    justifyContent: 'center', 
    gap: 16, 
    width: '100%', 
    marginTop: 8 
  },
});