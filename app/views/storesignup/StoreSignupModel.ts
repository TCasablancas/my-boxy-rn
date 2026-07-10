import { AddressProps } from "../../models/AddessModel";
import { ProductCarouselItem } from "../productdetail/ProductDetailModel";
import { StoreOwnerProps } from "../userprofile/UserProfileModel";

export const STORE_SIGNUP_STEP_LABELS: string[] = [
  'Dados do usuário', 'Contato', 'Documento', 'Endereço', 'Validação'
];

export interface StoreSignupModel {
  storeId: string;
  storeOwner: StoreOwnerProps;
  storeName: string;
  storeDescription: string;
  storeAddress: AddressProps;
  storePhoneNumber: string;
  isWhatsapp?: boolean;
  storeEmail: string;
  storeWebsite: string;
  storeLogoUri: string;
  storeBannerUri: string;
  products?: ProductCarouselItem[];
  createdAt: string;
  updatedAt: string;
}