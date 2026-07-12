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
import MBMainProductCard from '../../components/cards/MBMainProductCard';
import { HomeFeedBlock, HomeStoreSection } from './UserHomeViewModel';
import { NeutralColors } from '../../common/colors/Colors';

interface UserHomeViewProps {
  isUserLoggedIn: boolean;
}

export default function UserHomeView({ isUserLoggedIn }: UserHomeViewProps) {
  const safeAreaInsets = useSafeAreaInsets();
  const userDataHeight = useRef(new Animated.Value(0)).current;
  const userDataOpacity = useRef(new Animated.Value(0)).current;
  const { getInitialStoreSections, getNextStoreSections, getHomeFeedBlocks } = useMemo(() => getUserHomeViewModel(), []);
  const [storeSections, setStoreSections] = useState<HomeStoreSection[]>(() => getInitialStoreSections());
  const feedBlocks = useMemo(() => getHomeFeedBlocks(storeSections), [getHomeFeedBlocks, storeSections]);

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

  const handleToggleStoreFavorite = useCallback((storeId: string, nextActive: boolean) => {
    setStoreSections((currentSections) => currentSections.map((section) => {
      if (section.id !== storeId) {
        return section;
      }

      return {
        ...section,
        isFavorite: nextActive,
      };
    }));
  }, []);

  const handleToggleProductFavorite = useCallback((storeId: string, productId: string, nextActive: boolean) => {
    setStoreSections((currentSections) => currentSections.map((section) => {
      if (section.id !== storeId) {
        return section;
      }

      return {
        ...section,
        products: section.products.map((product) => {
          if (product.productId !== productId) {
            return product;
          }

          return {
            ...product,
            isFavourite: nextActive,
          };
        }),
      };
    }));
  }, []);

  const renderStoreCarousel = useCallback((item: HomeStoreSection) => {
    const products = item.products.map((product) => ({
      productId: product.productId,
      title: product.title,
      price: product.price.toFixed(2),
      imageUri: product.imageUri,
      storeName: product.storeName,
      storeImageUri: product.storeImageUri,
      rating: product.rating,
      isFavourite: product.isFavourite,
    }));

    return (
      <View style={{ 
        backgroundColor: NeutralColors.background, 
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 16,
      }}>
        <MBHomeStoreItemCarousel
          storeName={item.storeName}
          products={products}
          isStoreFavorite={item.isFavorite}
          onPressProduct={openProductDetail}
          onToggleStoreFavorite={(nextActive) => handleToggleStoreFavorite(item.id, nextActive)}
          onToggleProductFavorite={(productId, nextActive) => handleToggleProductFavorite(item.id, productId, nextActive)}
        />
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
              key={store.id}
              product={{
                productId: product.productId,
                title: product.title,
                price: product.price.toFixed(2),
                imageUri: product.imageUri,
                storeName: product.storeName,
                storeImageUri: product.storeImageUri,
                rating: product.rating,
                isFavourite: product.isFavourite,
                onPress: () => openProductDetail(product.productId),
                onPressFavorite: (nextActive) => handleToggleProductFavorite(store.id, product.productId, nextActive),
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
    <>
    <SafeAreaProvider>
      <StatusBar barStyle={'light-content'} backgroundColor={NeutralColors.backgroundAlt} />
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
            data={feedBlocks}
            style={styles.scrollView} 
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <View style={{ paddingVertical: 8 }}> 
                <HomeCarouselListHeader items={userHomeCarouselItems} onPressItem={openCarouselTarget} />
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
    backgroundColor: NeutralColors.backgroundAlt,
  },
  contentWrapper: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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