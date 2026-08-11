import { CommentProps } from "../../models/CommentsModel";
import { StoreTag } from "../../models/TagsModel";
import { StoreHeaderProfileProps } from "../storeprofile/StoreProfileModel";

export interface ProductDetailProps {
  productId: string;
  stock?: number;
  title: string;
  price: string;
  images: string[];
  storeData: StoreHeaderProfileProps;
  tags: StoreTag[];
  rating: number;
  likes: number;
  description: string;
  details: string;
  isFavorite?: boolean;
  comments: CommentProps[];
  moreFromStore: ProductCarouselItem[];
  youLike: ProductCarouselItem[];
  onPress: () => void;
  onPressFavorite: () => void;
}

export interface ProductCarouselItem {
  id: string;
  imageUri: string;
  title?: string;
  price?: string;
  seller?: string;
  isFavorite?: boolean;
}

export interface ProductDetailScreenState {
  productId: string;
  productDetail: ProductDetailProps;
  carouselItems: ProductCarouselItem[];
}
