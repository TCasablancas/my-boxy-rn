import { ProductStatusProps } from "../../models/StatusModel";
import { StoreHeaderProfileProps } from "../storeprofile/StoreProfileModel";

export interface UserFavoritesProps {
  userId: string;
  favoriteProducts: FavoriteProduct[];
}

export interface FavoriteProduct {
  favoriteId: string;
  title: string;
  price: string;
  imageUri: string;
  storeData: StoreHeaderProfileProps;
  productStatus: ProductStatusProps;
  rating?: number;
  isFavorite: boolean;
}

export interface UserFavoritesScreenState {
  userId: string;
  favoriteProducts: FavoriteProduct[];
}