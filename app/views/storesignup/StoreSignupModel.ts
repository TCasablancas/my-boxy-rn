import { AddressProps } from "../../models/AddessModel";
import { ProductCarouselItem } from "../productdetail/ProductDetailModel";
import { StoreOwnerProps } from "../userprofile/UserProfileModel";
import { StoreSignupStep, STORE_SIGNUP_STEP_ORDER } from '../../common/types/StoreSignupTypes';

export const STORE_SIGNUP_STEP_LABELS: string[] = [
  'Documento', 'Proprietário', 'Dados da loja', 'Contato', 'Endereço', 'Revisão'
];

export const STORE_SIGNUP_TOTAL_FORM_STEPS = STORE_SIGNUP_STEP_ORDER.length;

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
  ownerName: string;
  ownerEmail: string;
  ownerPhoneNumber: string;
  ownerIsWhatsapp: boolean;
  ownerProfileImageUri: string;
  storeName: string;
  storeAlias: string;
  storeDescription: string;
  storeEmail: string;
  storePhoneNumber: string;
  isWhatsapp: boolean;
  storeAddress: {
    preenchido: boolean;
    cep: string;
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    uf: string;
  };
}

export interface StoreSignupStepProps {
  data: StoreSignupFormData;
  updateData: (patch: Partial<StoreSignupFormData>) => void;
  onNext: () => void;
  onBack?: () => void;
}

export interface StoreSignupRevisionStepProps {
  data: StoreSignupFormData;
  onBack: () => void;
  onSubmit: () => void;
}

export const initialStoreSignupForm: StoreSignupFormData = {
  storeDocument: '',
  ownerName: '',
  ownerEmail: '',
  ownerPhoneNumber: '',
  ownerIsWhatsapp: false,
  ownerProfileImageUri: '',
  storeName: '',
  storeAlias: '',
  storeDescription: '',
  storeEmail: '',
  storePhoneNumber: '',
  isWhatsapp: false,
  storeAddress: {
    preenchido: false,
    cep: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    uf: '',
  },
};