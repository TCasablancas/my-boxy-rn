
import type { ReactNode } from 'react';

export interface SearchTag {
  id: string;
  title: string;
}

export interface SearchCategory {
  id: string;
  title: string;
  icon: ReactNode;
}

export interface SearchProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUri: string;
  storeName: string;
  storeImageUri: string;
  rating?: number;
  isFavourite: boolean;
}

export interface SearchCriteria {
  text: string;
  selectedTagIds: string[];
  selectedCategoryIds: string[];
}

export interface SearchScreenState {
  searchText: string;
  selectedTagIds: string[];
  selectedCategoryIds: string[];
  hasSubmittedSearch: boolean;
}