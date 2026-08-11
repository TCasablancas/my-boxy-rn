
export interface UserHomeProps {
  isLoggedIn: boolean;
  storeOwner: boolean;
  userName: string;
  userAlias: string;
  userAddress: string;
  hasNotifications: boolean;
  itemsInCart: number;
  products: any[];
  categories: any[];
  onPressProduct: (productId: string) => void;
  onPressCategory: (categoryId: string) => void;
  onPressNotifications: () => void;
  onPressCart: () => void;
}

export interface HomeFeedProduct {
  productId: string;
  title: string;
  price: number;
  imageUri: string;
  storeName: string;
  storeImageUri: string;
  rating?: number;
  isFavourite?: boolean;
}

export interface HomeStoreSection {
  storeId: string;
  storeName: string;
  storeImageUri: string;
  isFavorite?: boolean;
  products: HomeFeedProduct[];
}

export interface HomeUserProfile {
  userName: string;
  userAlias: string;
  locationName: string;
}

export interface HomeSingleStoreRowBlock {
  id: string;
  type: 'single-row';
  stores: HomeStoreSection[];
}

export interface HomeCarouselStoreBlock {
  id: string;
  type: 'carousel';
  store: HomeStoreSection;
}