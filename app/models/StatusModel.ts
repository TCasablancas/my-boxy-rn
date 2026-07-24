import { PrimaryColors, NeutralColors } from '../common/colors/Colors';

export enum ProductStatus {
  AVAILABLE = 'Disponível',
  UNAVAILABLE = 'Indisponível',
  SHIPPING = 'Enviando',
  RECEIVED = 'Recebido',
  RETURNED = 'Devolvido',
  CANCELED = 'Cancelado',
  ON_WAY = 'A Caminho',
  WAITING_RETURN = 'Aguardando Devolução',
  WAITING_SHIPPING = 'Aguardando Envio',
  WAITING_RECEIVED = 'Aguardando Recebimento',
  WAITING_RATING = 'Aguardando Avaliação',
}

export const PRODUCT_STATUS_COLORS: Record<ProductStatus, string> = {
  [ProductStatus.AVAILABLE]: PrimaryColors.limeGreen,
  [ProductStatus.UNAVAILABLE]: PrimaryColors.mainRed,
  [ProductStatus.SHIPPING]: PrimaryColors.gold,
  [ProductStatus.RECEIVED]: PrimaryColors.mainBlue,
  [ProductStatus.RETURNED]: '#800080',
  [ProductStatus.CANCELED]: '#808080',
  [ProductStatus.ON_WAY]: '#FFFF00',
  [ProductStatus.WAITING_RETURN]: PrimaryColors.gold,
  [ProductStatus.WAITING_SHIPPING]: PrimaryColors.gold,
  [ProductStatus.WAITING_RECEIVED]: PrimaryColors.gold,
  [ProductStatus.WAITING_RATING]: PrimaryColors.gold,
};

export interface ProductStatusProps {
  productId: string;
  status: ProductStatus;
}