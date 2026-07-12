export interface ProductProps {
  productId: string;
  title: string;
  price: string;
  imageUri: string;
  storeName: string;
  storeImageUri: string;
  rating?: number;
  isFavorite?: boolean;
  isFavourite?: boolean;
  onPress?: () => void;
  onPressFavorite?: (nextActive: boolean) => void;
}