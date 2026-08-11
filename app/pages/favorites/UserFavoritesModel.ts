export type FavoritesTabKey = 'products' | 'stores';

export interface FavoriteProductItem {
  productId: string;
  title: string;
  price: string;
  imageUri: string;
  storeName: string;
  storeImageUri: string;
  rating?: number;
  isFavourite: boolean;
}

export interface FavoriteStoreItem {
  storeId: string;
  storeName: string;
  storeImageUri: string;
  rating?: number;
  isFavourite: boolean;
  productsCount: number;
}

export interface FavoritesFilterOption {
  id: string;
  label: string;
}

export interface UserFavoritesScreenState {
  activeTab: FavoritesTabKey;
  selectedFilterId: string;
  isFilterBottomsheetVisible: boolean;
}