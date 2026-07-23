import { ShopItemProps } from '../views/myshop/MyShopModel';
import { Icons } from './icons/Icons';
import { ProductStatus } from '../models/StatusModel';

// Added shop_date to MyShopsViewProps
declare module '../views/myshop/MyShopModel' {
  interface MyShopsViewProps {
    shop_date: string;
  }
}

import { v4 as uuidv4 } from 'uuid';

export const myShopsData: ShopItemProps[] = [
  {
    shop_item_id: uuidv4(),
    name: 'Loja de Plantas',
    price: 'R$100,00',
    shop_date: '2026-07-22T12:00:00',
    category: 'Jardinagem',
    status: ProductStatus.AVAILABLE,
  },
  {
    shop_item_id: uuidv4(),
    name: 'Loja de Jardinagem',
    price: 'R$200,00',
    shop_date: '2023-06-02T12:00:00',
    category: 'Jardinagem',
    status: ProductStatus.UNAVAILABLE,
  },
  {
    shop_item_id: uuidv4(),
    name: 'Loja de Decoração',
    price: 'R$300,00',
    shop_date: '2023-06-03T12:00:00',
    category: 'Jardinagem',
    status: ProductStatus.SHIPPING,
  },
  {
    shop_item_id: uuidv4(),
    name: 'Loja de Ferramentas',
    price: 'R$400,00',
    shop_date: '2023-06-04T12:00:00',
    category: 'Jardinagem',
    status: ProductStatus.RECEIVED,
  },
  {
    shop_item_id: uuidv4(),
    name: 'Loja de Móveis',
    price: 'R$500,00',
    shop_date: '2023-06-05T12:00:00',
    category: 'Jardinagem',
    status: ProductStatus.RETURNED,
  },
  {
    shop_item_id: uuidv4(),
    name: 'Loja de Eletrodomésticos',
    price: 'R$600,00',
    shop_date: '2023-06-06T12:00:00',
    category: 'Jardinagem',
    status: ProductStatus.CANCELED,
  },
];