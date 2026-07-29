import { View, StyleSheet, Text, Image, Pressable } from 'react-native';
import { Icons } from '../../common/icons/Icons';
import { addItemToCartAndSelect } from '../../common/store/cartStore';
import { formatCurrencyBRL, parsePriceToNumber } from '../../common/constants/Currency';
import { NeutralColors, PrimaryColors } from '../../common/colors/Colors';

import MBFavoriteBtn from '../buttons/MBFavoriteBtn';

import { ProductProps } from '../../models/ProductCardModel';
import type { CartItemProps } from '../../views/cart/CartModel';

export default function MBMainProductCard({ 
    product
}: { product: ProductProps }) {
  const handleAddToCart = () => {
    const cartItem: CartItemProps = {
      product_id: product.productId,
      name: product.title,
      price: product.price,
      quantity: 1,
      imageUri: product.imageUri,
      store_id: product.storeName,
      store_name: product.storeName,
    };

    addItemToCartAndSelect(cartItem);
  };

  const priceToNumber = parsePriceToNumber(product.price);

  return (
    <Pressable style={styles.productContainer} onPress={product.onPress}>
      <View style={styles.storeInfoWrapper}>
        <View style={styles.nameImageWrapper}>
          <Image source={{ uri: product.storeImageUri }} style={styles.storeImage} />
          <Text style={styles.storeName}>{product.storeName}</Text>
        </View>
        {product.rating && (
          <View style={styles.ratingWrapper}>
            <Icons.star width={12} height={12} fill={PrimaryColors.gold} />
            <Text style={styles.ratingText}>{product.rating}</Text>
          </View>
        )}
      </View>
      <View>
        <View style={styles.imageWrapper}>
          <View style={styles.favoriteBtnWrapper}>
            <MBFavoriteBtn
              isActive={product.isFavorite ?? product.isFavourite}
              defaultActive={product.isFavorite ?? product.isFavourite}
              onPress={product.onPressFavorite}
            />
          </View>
          <Image source={{ uri: product.imageUri }} style={styles.productImage} />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={styles.textWrapper}>
            <Text style={styles.productTitle}>{product.title}</Text>
            <Text style={styles.productPrice}>
              <Text style={styles.currency}>R$</Text>{formatCurrencyBRL(priceToNumber)}
            </Text>
          </View>
          <Pressable style={styles.addToCartBtn} onPress={handleAddToCart}>
            <Icons.simpleCart width={16} height={16} strokeColor={PrimaryColors.primary} />
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  productContainer: {
    paddingHorizontal: 8,
    marginVertical: 8,
    flex: 1,
    width: '50%',
  },
  imageWrapper: {
    height: 160,
    backgroundColor: 'transparent',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 8,
    marginBottom: 4,
  },
  nameImageWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  productTitle: {
    fontSize: 12,
    marginTop: 4,
    color: '#4c4c4c',
    fontFamily: 'SNPro-Regular',
    lineHeight: 12,
  },
  productPrice: {
    fontSize: 16,
    color: PrimaryColors.mainBlue,
    fontFamily: 'SNPro-Bold',
    lineHeight: 20,
  },
  currency: {
    fontSize: 12,
    color: PrimaryColors.mainBlue,
    fontFamily: 'SNPro-Regular',
    opacity: 0.5,
  },
  storeInfoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    marginLeft: 4,
    justifyContent: 'space-between',
  },
  textWrapper: {
    marginLeft: 4,
  },
  storeName: {
    fontSize: 10,
    color: NeutralColors.text,
    fontFamily: 'SNPro-Regular',
  },
  storeImage: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 4,
    backgroundColor: '#ccc',
    
  },
  favoriteBtnWrapper: {
    position: 'absolute',
    right: 0,
    zIndex: 1,
  },
  ratingText: {
    fontSize: 11,
    color: '#4c4c4c',
    fontFamily: 'SNPro-Regular',
  },
  addToCartBtn: {
    backgroundColor: PrimaryColors.primaryLight,
    padding: 8,
    borderRadius: 8,
  },
});