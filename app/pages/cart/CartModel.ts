
export interface CartItemProps {
  product_id: string;
  name: string;
  price: string;
  quantity: number;
  imageUri: string;
  store_id?: string;
  store_name?: string;
  shipping?: string;
}