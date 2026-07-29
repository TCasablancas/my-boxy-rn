import { CartItemProps } from '../views/cart/CartModel';
import { v4 as uuidv4 } from 'uuid';

export const CartItemsData: CartItemProps[] = [
  {
    product_id: uuidv4(),
    name: 'Mesa de Centro em Madeira Maciça - Carvalho',
    price: '800,00',
    quantity: 1,
    imageUri: 'https://traditionalbeams.com/cdn/shop/collections/Oak_Coffee_Table_a2f0f0f5-d526-42e9-9bf2-02976884d6b3.jpg?v=1679426793&width=750',
    store_id: 'store1',
    store_name: 'Loja A',
    shipping: 'Frete grátis',
  },
  {
    product_id: uuidv4(),
    name: 'Escrivaninha Compacta com Gavetas em Pinho',
    price: '1.560,42',
    quantity: 1,
    imageUri: 'https://irion-lumber.s3.amazonaws.com/2018/07/Matt-Wolfe-900_8.jpg',
    store_id: 'store2',
    store_name: 'Loja B',
    shipping: 'Frete grátis',
  },
  {
    product_id: uuidv4(),
    name: 'Cadeira Artesanal em Madeira Maciça',
    price: '1.200,00',
    quantity: 1,
    imageUri: 'https://aarsunwoods.com/wp-content/uploads/2020/02/Handmade-Master-Chair-UH-DNGC-0018-jpg.webp',
    store_id: 'store1',
    store_name: 'Loja A',
    shipping: 'Frete grátis',
  },
];