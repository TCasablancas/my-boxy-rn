export interface ProductCarouselItem {
  id: string;
  imageUri: string;
  title?: string;
  price?: string;
  seller?: string;
  isFavorite?: boolean;
}

export interface ProductDetailContent {
  seller: string;
  subtitle: string;
  title: string;
  price: string;
  description: string;
  rating: number;
  comments: any[];
  favorite: number;
  tags: { id: string; label: string; icon?: React.ReactNode }[];
  isFavorite?: boolean;
}