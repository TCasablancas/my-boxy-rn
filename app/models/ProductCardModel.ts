export interface ProductProps {
  productId: string;
  title: string;
  price: string;
  imageUri: string;
  storeName: string;
  storeImageUri: string;
  rating?: number;
  onPress?: () => void;
  onPressFavorite?: () => void;
}