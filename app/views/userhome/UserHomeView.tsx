import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, StyleSheet, FlatList, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NeutralColors } from '../../common/colors/Colors';
import SafeAreaView from '../../sections/global/SafeAreaView';

import MBHeaderUserSimple from '../../components/header/MBHeaderUserSimple';
import MBLocationTag from '../../components/tags/MBLocationTag';
import HomeCarouselListHeader from '../../sections/home/HomeCarouselListHeader';
import MBOutlinedSmBtn from '../../components/buttons/MBOutlinedSmBtn';
import MBHomeStoreItemCarousel from '../../components/carousel/MBHomeStoreItemCarousel';
import MBMainProductCard from '../../components/cards/MBMainProductCard';

import {
  openCarouselTarget,
  openNotifications,
  openProductDetail,
  openSearchView,
  openStoreSignup,
  openUserProfile,
  userHomeCarouselItems,
} from './UserHomeNavigation';
import {
  DEFAULT_HOME_USER_PROFILE,
  HomeFeedBlock,
  HomeStoreSection,
  HomeUserProfile,
  getUserHomeViewModel,
  normalizeUserHomeProfile,
} from './UserHomeViewModel';
import { getUserHomeData } from './UserHomeService';

interface UserHomeViewProps {
  isUserLoggedIn: boolean;
}

export default function UserHomeView({ isUserLoggedIn }: UserHomeViewProps) {
  const safeAreaInsets = useSafeAreaInsets();
  const userDataHeight = useRef(new Animated.Value(0)).current;
  const userDataOpacity = useRef(new Animated.Value(0)).current;
  const [userProfile, setUserProfile] = useState<HomeUserProfile>(DEFAULT_HOME_USER_PROFILE);
  const [randomProducts, setRandomProducts] = useState<Record<string, unknown>[]>([]);
  const [useMockFallback, setUseMockFallback] = useState(false);

  const {
    getInitialStoreSections,
    getNextStoreSections,
    getHomeFeedBlocks,
  } = useMemo(
    () => getUserHomeViewModel(randomProducts, { useMockFallback }),
    [randomProducts, useMockFallback],
  );
  const [storeSections, setStoreSections] = useState<HomeStoreSection[]>([]);
  const feedBlocks = useMemo(() => getHomeFeedBlocks(storeSections), [getHomeFeedBlocks, storeSections]);

  useEffect(() => {
    setStoreSections(getInitialStoreSections());
  }, [getInitialStoreSections]);

  useEffect(() => {
    let isActive = true;

    async function loadUserHomeData() {
      try {
        const { user, profile, randomProducts: nextRandomProducts } = await getUserHomeData();

        if (!isActive) {
          return;
        }

        setUserProfile(normalizeUserHomeProfile(profile, user.email));
        setRandomProducts(nextRandomProducts);
        setUseMockFallback(false);
      } catch (error) {
        console.error('Error fetching user home data:', error);

        if (!isActive) {
          return;
        }

        setUserProfile(DEFAULT_HOME_USER_PROFILE);
        setRandomProducts([]);
        setUseMockFallback(true);
      }
    }

    loadUserHomeData();

    return () => {
      isActive = false;
    };
  }, []);

  function openUserData() {
    userDataHeight.stopAnimation((currentValue) => {
      const shouldOpen = currentValue < 60;
      Animated.timing(userDataHeight, {
        toValue: shouldOpen ? 70 : 0,
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

  const handleToggleStoreFavorite = useCallback((storeId: string, nextActive: boolean) => {
    setStoreSections((currentSections) => currentSections.map((section) => {
      if (section.storeId !== storeId) {
        return section;
      }

      return { ...section, isFavorite: nextActive, };
    }));
  }, []);

  const handleToggleProductFavorite = useCallback((storeId: string, productId: string, nextActive: boolean) => {
    setStoreSections((currentSections) => currentSections.map((section) => {
      if (section.storeId !== storeId) {
        return section;
      }

      return {
        ...section,
        products: section.products.map((product) => {
          if (product.productId !== productId) { return product; }
          return { ...product, isFavourite: nextActive, };
        }),
      };
    }));
  }, []);

  const renderStoreCarousel = useCallback((item: HomeStoreSection) => {
    const products = item.products.map((product) => ({
      productId: product.productId,
      title: product.title,
      price: parseFloat(product.price.toString()).toFixed(2),
      imageUri: product.imageUri,
      storeName: product.storeName,
      storeImageUri: product.storeImageUri,
      rating: product.rating,
      isFavourite: product.isFavourite,
    }));

    return (
      <View>
        <View style={styles.carouselWrapper}>
          <MBHomeStoreItemCarousel
            storeName={item.storeName}
            products={products}
            isStoreFavorite={item.isFavorite}
            onPressProduct={openProductDetail}
            onToggleStoreFavorite={(nextActive) => handleToggleStoreFavorite(item.storeId, nextActive)}
            onToggleProductFavorite={(productId, nextActive) => handleToggleProductFavorite(item.storeId, productId, nextActive)}
          />
        </View>
        <View style={{width: '100%', height: 4, backgroundColor: 'white', marginVertical: 16, }}></View>
      </View>
    );
  }, [handleToggleProductFavorite, handleToggleStoreFavorite]);

  const renderSingleStoreRow = useCallback((stores: HomeStoreSection[]) => {
    return (
      <View style={styles.singleStoreRow}>
        {stores.map((store) => {
          const product = store.products[0];

          return (
            <MBMainProductCard
              key={store.storeId}
              product={{
                productId: product.productId,
                title: product.title,
                price: parseFloat(product.price.toString()).toFixed(2),
                imageUri: product.imageUri,
                storeName: product.storeName,
                storeImageUri: product.storeImageUri,
                rating: product.rating,
                isFavourite: product.isFavourite,
                onPress: () => openProductDetail(product.productId),
                onPressFavorite: (nextActive) => handleToggleProductFavorite(
                  store.storeId, product.productId, nextActive
                ),
              }}
            />
          );
        })}
        {stores.length === 1 ? <View style={styles.singleStoreSpacer} /> : null}
      </View>
    );
  }, [handleToggleProductFavorite]);

  const renderFeedBlock = useCallback(({ item }: { item: HomeFeedBlock }) => {
    if (item.type === 'single-row') {
      return renderSingleStoreRow(item.stores);
    }

    return renderStoreCarousel(item.store);
  }, [renderSingleStoreRow, renderStoreCarousel]);

  return (
    <SafeAreaView children={
      <View style={[styles.container]}>
        <View style={[styles.contentWrapper, { paddingTop: safeAreaInsets.top }]}>
          <View style={{alignItems: 'center', marginBottom: 8, justifyContent: 'center', width: '100%'}}>
            <MBHeaderUserSimple 
              userName={userProfile.userName}
              userAlias={userProfile.userAlias}
              onPressNotifications={isUserLoggedIn ? openNotifications : undefined} 
              onPressCart={openSearchView} 
              onPressUserData={openUserData}
            />
            <Animated.View style={[styles.userDataWrapper, { height: userDataHeight }]}>
              <Animated.View style={[styles.userDataContent, { opacity: userDataOpacity }]}>
                <MBLocationTag locationName={userProfile.locationName} onPress={() => {}} />
                <View style={styles.userActionsWrapper}>
                  <MBOutlinedSmBtn title="Ver meus dados" onPress={openUserProfile} />
                  <MBOutlinedSmBtn title="Ver minha loja" onPress={openStoreSignup} />
                </View>
              </Animated.View>
            </Animated.View>
          </View>
          <FlatList
            data={feedBlocks}
            style={styles.scrollView} 
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <View style={{ paddingVertical: 8 }}> 
                <HomeCarouselListHeader items={userHomeCarouselItems} onPressItem={openCarouselTarget} />
                <View style={{width: '100%', height: 4, backgroundColor: 'white'}}></View>
              </View>
            }
            renderItem={renderFeedBlock}
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
    }/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: NeutralColors.backgroundAlt,
  },
  carouselWrapper: { 
    backgroundColor: NeutralColors.background, 
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 16,
  },
  contentWrapper: {
    marginTop: 16,
    borderRadius: 12,
  },
  scrollView: {
    backgroundColor: 'transparent',
    borderRadius: 12,
  },
  userDataWrapper: {
    width: '100%',
    backgroundColor: 'transparent',
    overflow: 'hidden',
    alignItems: 'center',
  },
  userDataContent: {
    width: '100%',
    paddingHorizontal: 8,
    alignItems: 'center',
    gap: 4,
  },
  userActionsWrapper: { 
    flexDirection: 'row', 
    justifyContent: 'center', 
    gap: 16, 
    marginTop: 8 
  },
  singleStoreRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 8,
  },
  singleStoreSpacer: {
    flex: 1,
    width: '50%',
  },
});