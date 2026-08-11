import { useProductDetailViewModel } from './ProductDetailViewModel';
import { useMemo, useRef, useState } from 'react';
import { Animated, StyleSheet, View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MBMainBtn from '../../components/ui/buttons/MBMainBtn';
import { PrimaryColors } from '../../common/colors/Colors';
import MBProductCarousel from '../../components/ui/carousel/MBProductCarousel';
import MBTitledViewHeader from '../../components/ui/header/MBTitledViewHeader';
import MBRoundedIconBtn from '../../components/ui/buttons/MBRoundedIconBtn';
import { Icons } from '../../common/icons/Icons';
import MainNavigation from '../../common/navigation/MainNavigation';
import { IconsNavigation } from '../../common/icons/IconsNavigation';
import MBLocationTag from '../../components/ui/tags/MBLocationTag';
import MBTagWithLabel from '../../components/ui/tags/MBTagWithLabel';
import MBPriceContainer from '../../components/ui/containers/MBPriceContainer';
import MBFavoriteBtn from '../../components/ui/buttons/MBFavoriteBtn';
import { IconsActions } from '../../common/icons/IconsActions';
import MBSimpleLabel from '../../components/ui/labels/MBSimpleLabel';
import MBStoreProductHeader from '../../components/ui/header/MBStoreProductHeader';
import MBTextWithTitle from '../../components/ui/labels/MBTextWithTitle';
import ProductCommentsSection from '../../components/sections/comments/ProductCommentsSection';
import ProductRatingSection from '../../components/sections/product/ProductRatingSection';
import MBIconInfoContainer from '../../components/ui/containers/MBIconInfoContainer';
import ProductCarouselSmSection from '../../components/sections/product/ProductCarouselSmSection';
import { Fonts } from '../../common/constants/Fonts';

export default function ProductDetailView() {
  const safeAreaInsets = useSafeAreaInsets();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [carouselHeight, setCarouselHeight] = useState(360);

  const headerBackgroundOpacity = useMemo(() => {
    const maxRange = Math.max(carouselHeight, 1);
    return scrollY.interpolate({
      inputRange: [0, maxRange],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });
  }, [carouselHeight, scrollY]);

  const {
    quantity,
    carouselItems,
    productDetail,
    decreaseQuantity,
    increaseQuantity,
    addToCart,
  } = useProductDetailViewModel();

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <View style={styles.headerWrapper}>
          <Animated.View
            pointerEvents="none"
            style={[styles.headerBackground, { opacity: headerBackgroundOpacity }]}
          />
          <MBTitledViewHeader
            btnsLeft={
              <MBRoundedIconBtn 
                icon={<Icons.arrowBack width={16} height={16} />}
                onPress={() => {
                  MainNavigation.pop();
                }} 
              />
            }
            btnsRight={
              <MBRoundedIconBtn 
                icon={<IconsNavigation.moreVertical width={16} height={16} />}
                onPress={() => {
                  // Handle favorite press
                }} 
              />
            }
          />
        </View>
        <Animated.ScrollView
          style={styles.contentArea}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true },
          )}
          scrollEventThrottle={16}
        >
          <View onLayout={(event) => setCarouselHeight(event.nativeEvent.layout.height)}>
            <MBProductCarousel items={carouselItems} autoPlayDuration={3000} tags={productDetail.tags} />
          </View>
          <View style={styles.contentWrapper}>
            <View style={styles.firstItemsWrapper}>
              <View style={styles.contentTopWrapper}>
                <MBStoreProductHeader />
                <MBLocationTag locationName={'Santos · SP'} onPress={() => {}} />
              </View>
              <View style={styles.titleColumn}>
                <View style={styles.headerLeft}>
                  <Text style={styles.subtitleText}>{productDetail.subtitle}</Text>
                  <Text style={styles.titleText}>{productDetail.title}</Text>
                </View>
                <View style={styles.priceContainer}>
                  <MBPriceContainer 
                    price={productDetail.price} 
                    tags={[
                      <MBTagWithLabel 
                        id="plants" label="Plantas" 
                        icon={<Icons.arrowBack width={14} height={14} color="white" />}
                      />,
                      <MBTagWithLabel 
                        id="home" label="Para casa" 
                        icon={<Icons.home width={14} height={14} color="white" />}
                      />,
                      <MBTagWithLabel 
                        id="new" label="Novidade" 
                        icon={<Icons.star width={14} height={14} strokeColor="white" />}
                      />
                    ]}
                  />
                </View>
                <View style={styles.mainActionRow}>
                  <MBRoundedIconBtn 
                    icon={<Icons.share width={16} height={16} />} 
                    onPress={() => {}} 
                  />
                  <View style={styles.buttonWrapper}>
                    <MBMainBtn title="+ carrinho" onPress={addToCart} />
                  </View>
                  <MBFavoriteBtn />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16, }}>
                  <MBIconInfoContainer 
                    icon={<Icons.star width={26} height={26} fillColor="#EDB20E" />} 
                    title={productDetail.rating.toString()} 
                    description="de 5 estrelas"
                    onPressItem={(itemId) => {}} 
                  />
                  <MBIconInfoContainer 
                    icon={<IconsActions.chatBubbleDouble width={26} height={26} strokeColor="black" />} 
                    title={`${productDetail.comments.length}`}
                    description={'comentaram'}
                    onPressItem={(itemId) => {}} 
                  />
                  <MBIconInfoContainer 
                    icon={<Icons.heart width={26} height={26} />} 
                    title={productDetail.favorite.toString()} 
                    description="curtiram"
                    onPressItem={(itemId) => {}} 
                  />
                </View>
              </View>
            </View>
            <MBTextWithTitle title="Descrição" text={productDetail.description} />
            <MBTextWithTitle title="Detalhe do Produto" text={productDetail.description} />
            <ProductCommentsSection />
            <ProductCarouselSmSection title="Mais dessa loja" products={[]} />
            <ProductCarouselSmSection title="Você vai gostar" products={[]} />
          </View>
          <View style={{ height: 16 }} />
        </Animated.ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
  },
  background: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentArea: {
    flex: 1,
  },
  contentWrapper: {
    borderRadius: 16,
    paddingHorizontal: 16,
    gap: 16,
  },
  contentTopWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 4,
  },
  firstItemsWrapper: {
  },
  headerWrapper: {
    position: 'absolute',
    top: 10,
    left: 0,
    right: 0,
    zIndex: 1,
    paddingHorizontal: 16,
  },
  headerBackground: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'white',
  },
  titleColumn: {
    width: '100%',
  },
  headerLeft: {
    flex: 1,
    minWidth: 0,
    alignItems: 'center',
  },
  // productActionsWrapper: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   marginVertical: 16,
  //   gap: 16,
  // },
  // couponWrapper: {

  // },
  priceContainer: {
    gap: 16,
    marginVertical: 16,
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-around',
  },
  subtitleText: {
    color: 'gray',
    ...Fonts.regular12,
  },
  titleText: {
    color: 'black',
    ...Fonts.bold22Line24,
  },
  descriptionText: {
    color: 'gray',
    ...Fonts.regular14,
  },
  mainActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    columnGap: 12,
    paddingVertical: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  buttonWrapper: {
    flex: 1,
  },
});