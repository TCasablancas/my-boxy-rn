
export interface StoreProfileModel {
  storeId: string;
  storeName: string;
  storeAlias: string;
  storeImageUri: string;
  storeLocation: string;
  storeRating: number;
  storeDescription: string;
  isFavorite?: boolean;
}

export interface StoreLocationProps {
  city: string;
  state: string;
}

export interface StoreHeaderProfileProps {
  storeId: string;
  storeName: string;
  storeAlias: string;
  storeImageUri: string;
  storeLocation?: StoreLocationProps;
}