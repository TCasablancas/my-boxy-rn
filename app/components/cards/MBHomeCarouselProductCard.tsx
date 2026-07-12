import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { ProductProps } from '../../models/ProductCardModel';
import { PrimaryColors } from '../../common/colors/Colors';

interface MBHomeCarouselProductCardProps {
  product: ProductProps;
  onPress?: () => void;
}

export default function MBHomeCarouselProductCard({ 
    product, onPress = () => {}
}: MBHomeCarouselProductCardProps) {
  return (
    <Pressable style={styles.cardContainer} onPress={onPress}>
      <View style={styles.imageWrapper}>
        <Image source={{ uri: product.imageUri }} style={styles.productImage} />
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.productTitle}>{product.title}</Text>
        <Text style={styles.productPrice}><Text style={styles.currency}>R$ </Text>{product.price}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: 120,
    marginRight: 16,
  },
  imageWrapper: {
    width: '100%',
    height: 120,
    marginBottom: 8,
    borderRadius: 16,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 16,
  },
  textWrapper: {
    alignItems: 'flex-start',
  },
  productTitle: {
    fontSize: 14,
    color: '#4c4c4c',
    fontFamily: 'SNPro-Regular',
    lineHeight: 16,
  },
  productPrice: {
    fontSize: 16,
    color: PrimaryColors.primary,
    fontFamily: 'SNPro-Bold',
    lineHeight: 20,
  },
  currency: {
    fontSize: 12,
    color: PrimaryColors.primary,
    fontFamily: 'SNPro-Regular'
  },
});