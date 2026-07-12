import React, { memo } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Pressable } from 'react-native';
import MBHomeCarouselProductCard from '../cards/MBHomeCarouselProductCard';
import { ProductProps } from '../../models/ProductCardModel';
import { NeutralColors } from '../../common/colors/Colors';
import MBProductRatingContainer from '../containers/MBProductRatingContainer';
import { Icons } from '../../common/icons/Icons';

interface MBHomeStoreItemCarouselProps {
  storeName: string;
  products: ProductProps[];
  onPressProduct: (productId: string) => void;
}

function MBHomeStoreItemCarousel({
  storeName,
  products,
  onPressProduct,
}: MBHomeStoreItemCarouselProps) {
  return (
    <View style={styles.carouselContainer}>
      <View style={styles.carouselHeaderWrapper}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={styles.storeImageWrapper}>
            <Image source={{ uri: products[0]?.storeImageUri }} style={styles.storeImage} />
          </View>
          <View style={{ flexDirection: 'column', height: 40, marginLeft: 4 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={styles.storeName}>{storeName}</Text>
              <MBProductRatingContainer rating={products[0]?.rating || 0} reviewCount={3} />
            </View>
            <View style={{}}>
              <Text style={styles.description}>{storeName}</Text>
            </View>
          </View>
        </View>
        <Pressable>
          <Icons.heart width={22} height={22} strokeColor={NeutralColors.textSecondary} />
        </Pressable>
      </View>
      <FlatList
        data={products}
        style={styles.flatList} 
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.productId}
        renderItem={({ item }) => (
          <MBHomeCarouselProductCard
            product={{
              productId: item.productId,
              title: item.title,
              price: item.price,
              imageUri: item.imageUri,
              storeName: item.storeName,
              storeImageUri: item.storeImageUri,
              rating: item.rating,
              onPress: () => onPressProduct(item.productId),
            }}
          />
        )}
        nestedScrollEnabled
        initialNumToRender={6}
        maxToRenderPerBatch={6}
        windowSize={5} 
        removeClippedSubviews
        contentContainerStyle={styles.horizontalContent}
      />
    </View>
  );
}

export default memo(MBHomeStoreItemCarousel);

const styles = StyleSheet.create({
  carouselContainer: {
    paddingVertical: 8,
    backgroundColor: 'transparent',
  },
  carouselHeaderWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
    marginHorizontal: 16,
  },
  storeRatingWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  storeImageWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: 8,
  },
  storeImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  storeName: {
    fontSize: 16,
    fontFamily: 'SNPro-Bold',
  },
  description: {
    fontSize: 12,
    fontFamily: 'SNPro-Regular',
    color: '#666',
    lineHeight: 14,
  },
  carouselItem: {
    padding: 12,
    backgroundColor: 'transparent',
    borderRadius: 8,
    marginBottom: 8,
  },
  carouselItemText: {
    fontSize: 16,
  },
  flatList: {
    width: '100%',
    // backgroundColor: NeutralColors.backgroundAlt,
    borderRadius: 16,
    padding: 8,
  },
  horizontalContent: {
    paddingBottom: 4,
  },
});