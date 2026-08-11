import { ProductStatus } from '../../models/StatusModel';

export interface MyShopsViewProps {
  shop_id: string;
  name: string;
  price: string;
}

export interface ShopItemProps {
  shop_item_id: string;
  name: string;
  shop_date?: string;
  price: string;
  category?: string;
  status?: ProductStatus;
  icon?: React.ReactNode;
}