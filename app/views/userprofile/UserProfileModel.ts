
export interface UserProfileProps {
  userId: string;
  name: string;
  alias: string;
  email: string;
  phoneNumber: string;
  isWhatsapp?: boolean;
  profileImageUri: string;
  document: string;
  birthDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface StoreOwnerProps {
  userId: string;
  name: string;
  email: string;
  phoneNumber: string;
  isWhatsapp?: boolean;
  profileImageUri: string;
}