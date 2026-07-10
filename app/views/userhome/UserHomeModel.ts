
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