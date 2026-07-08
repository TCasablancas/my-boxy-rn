import { useProductDetailViewModel } from './ProductDetailViewModel';
import { useMemo, useRef, useState } from 'react';
import { Animated, StyleSheet, View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MBMainBtn from '../../components/buttons/MBMainBtn';
import { PrimaryColors } from '../../common/colors/Colors';
import MBProductCarousel from '../../components/carousel/MBProductCarousel';
import MBDivider from '../../components/global/MBDivider';
import MBMainCounter from '../../components/counter/MBMainCounter';
import MBTitledViewHeader from '../../components/header/MBTitledViewHeader';
import MBRoundedIconBtn from '../../components/buttons/MBRoundedIconBtn';
import { Icons } from '../../common/constants/Icons';
import MainNavigation from '../../common/navigation/MainNavigation';
import { IconsNavigation } from '../../common/constants/IconsNavigation';
import MBLocationTag from '../../components/tags/MBLocationTag';
import MBTagWithLabel from '../../components/tags/MBTagWithLabel';
import MBPriceContainer from '../../components/containers/MBPriceContainer';
import MBFavoriteBtn from '../../components/buttons/MBFavoriteBtn';
import { IconsActions } from '../../common/constants/IconsActions';
import MBSimpleLabel from '../../components/labels/MBSimpleLabel';
import MBStoreProductHeader from '../../components/header/MBStoreProductHeader';
import MBTextWithTitle from '../../components/labels/MBTextWithTitle';

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
      <View style={safeAreaStyles({ safeAreaInsets }).container}>
        <View style={styles.headerWrapper}>
          <Animated.View
            pointerEvents="none"
            style={[styles.headerBackground, { opacity: headerBackgroundOpacity }]}
          />
          <MBTitledViewHeader
            midComponent={
              <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 8 }}>
                <MBLocationTag locationName={'Santos · SP'} onPress={() => {}} />
              </View>
            }
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
            <MBProductCarousel items={carouselItems} autoPlayDuration={3000} />
          </View>
          <View style={styles.contentWrapper}>
            <View style={styles.contentTopWrapper}>
              <MBStoreProductHeader />
              <MBTagWithLabel 
                label="Novo" 
                icon={<Icons.arrowBack width={16} height={16} color="white" />}
              />
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
                      id="new"
                      label="Novo" 
                      icon={<Icons.arrowBack width={16} height={16} color="white" />}
                    />,
                    <MBTagWithLabel 
                      id="new"
                      label="Novo" 
                      icon={<Icons.arrowBack width={16} height={16} color="white" />}
                    />
                  ]}
                />
                <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', columnGap: 8, padding: 12, backgroundColor: 'white', borderRadius: 8 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', columnGap: 8 }}>
                    <MBSimpleLabel 
                      text={'3.5'} 
                      icon={<Icons.star width={16} height={16} fillColor="gray" />} 
                    />
                    <View style={{ height: '100%', backgroundColor: 'gray', flex: 1, width: 1 }} />
                    <MBSimpleLabel 
                      text={'235'} 
                      icon={<IconsActions.chatBubbleDouble width={16} height={16} strokeColor="gray" />} 
                    />
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.productActionsWrapper}>
              <MBMainBtn 
                title="Detalhes" 
                icon={<Icons.bag width={16} height={16} color="white" />}
                onPress={() => {}} 
              />
              <MBMainBtn 
                title="Perguntas" 
                icon={<IconsActions.chatBubbleDouble width={16} height={16} strokeColor="white" />}
                onPress={() => {}} 
              />
            </View>
            <MBTextWithTitle title="Descrição" text={productDetail.description} />
            <MBTextWithTitle title="Detalhe do Produto" text={productDetail.description} />
          </View>
        </Animated.ScrollView>
        <View style={styles.bottomActionRow}>
          {/* <MBMainCounter
            value={quantity}
            onDecrement={decreaseQuantity}
            onIncrement={increaseQuantity}
          /> */}
          <MBRoundedIconBtn 
            icon={<Icons.share width={16} height={16} />} 
            onPress={() => {}} 
          />
          <View style={styles.buttonWrapper}>
            <MBMainBtn title="+ carrinho" onPress={addToCart} />
          </View>
          <MBFavoriteBtn />
        </View>
      </View>
    </View>
  );
}

const safeAreaStyles = ({ safeAreaInsets = { top: 0, bottom: 0 } }: { 
  safeAreaInsets?: { top: number; bottom: number } 
}) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    // marginTop: 16,
    // marginHorizontal: 16,
    // marginBottom: (safeAreaInsets?.bottom || 0) + 16,
    justifyContent: 'space-between',
  },
});

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: PrimaryColors.background,
  },
  contentArea: {
    flex: 1,
    // paddingHorizontal: 16,
    marginBottom: 84,
  },
  contentWrapper: {
    borderRadius: 16,
    paddingHorizontal: 16,
  },
  contentTopWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 4,
  },
  headerWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    paddingHorizontal: 16,
  },
  headerBackground: {
    ...StyleSheet.absoluteFill,
    backgroundColor: PrimaryColors.background,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  titleColumn: {
    width: '100%',
  },
  headerLeft: {
    flex: 1,
    minWidth: 0,
  },
  productActionsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
    gap: 16,
  },
  priceContainer: {
    gap: 16,
    marginVertical: 16,
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-around',
  },
  subtitleText: {
    color: 'gray',
    fontSize: 12,
    fontFamily: 'SNPro-Regular',
  },
  titleText: {
    color: PrimaryColors.primary,
    fontSize: 22,
    fontFamily: 'SNPro-Bold',
    lineHeight: 24,
  },
  descriptionText: {
    color: 'gray',
    fontSize: 14,
    fontFamily: 'SNPro-Regular',
  },
  bottomActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    columnGap: 12,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    paddingVertical: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  buttonWrapper: {
    flex: 1,
  },
});