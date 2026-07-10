import { AddressProps } from "../../models/AddessModel";
import { ProductCarouselItem } from "../productdetail/ProductDetailModel";
import { StoreOwnerProps } from "../userprofile/UserProfileModel";

export const STORE_SIGNUP_STEP_LABELS: string[] = [
  'Dados do usuário', 'Contato', 'Documento', 'Endereço', 'Validação'
];

export const STORE_SIGNUP_TOTAL_FORM_STEPS = STORE_SIGNUP_STEP_LABELS.length;

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

export interface StoreSignupFormData {
  storeDocument: string;
  storeName: string;
  storeDescription: string;
  storeCategory: string;
  storeEmail: string;
  storePhone: string;
  storeAddress: string;
}

export const initialStoreSignupForm: StoreSignupFormData = {
  storeDocument: '',
  storeName: '',
  storeDescription: '',
  storeCategory: '',
  storeEmail: '',
  storePhone: '',
  storeAddress: '',
};