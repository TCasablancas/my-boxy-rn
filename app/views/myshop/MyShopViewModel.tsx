import { useState } from 'react';

import { myShopsData } from '../../common/MyShopsData';

export function getMyShopViewModel() {
  const [itemBottomsheetVisible, setItemBottomsheetVisible] = useState(false);
  
  const products = myShopsData.map((shop) => ({
    shop_item_id: shop.shop_item_id,
    name: shop.name,
    price: shop.price,
    shop_date: shop.shop_date,
    status: shop.status,
  }));

  

  return {
    products,
    itemBottomsheetVisible,
    setItemBottomsheetVisible,
  };
}