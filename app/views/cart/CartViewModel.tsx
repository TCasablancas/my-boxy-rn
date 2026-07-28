
import { useState } from 'react';
import type { CartItemProps } from './CartModel';
import { CartItemsData } from '../../common/CartItemsData';
import { useCartHooks } from './CartHooks';

export default function useCartViewModel() {
  const {
    toggleDisplayBottomInfo,
    setToggleDisplayBottomInfo,
    bottomContainerHeight,
    setBottomContainerHeight,
    handleBottomContainerHeight,
    selectedIds,
    toggleSelect,
    toggleSelectAll,
    removeSelectedIds,
    clearSelectedIds,
  } = useCartHooks();

  const [cartItems, setCartItems] = useState<CartItemProps[]>(CartItemsData);

  const isAllItemsSelected = cartItems.length > 0 && cartItems.every(item => selectedIds.includes(item.product_id));

  const toggleSelectAllItems = () => {
    toggleSelectAll(cartItems.map(item => item.product_id));
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price);
      const quantity = typeof item.quantity === 'string' ? parseInt(item.quantity) : item.quantity;
      return total + (price * quantity);
    }, 0);
  };

  const addItemToCart = (item: CartItemProps) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  const removeItemFromCart = (productId: string) => {
    setCartItems((prevItems) => prevItems.filter(item => item.product_id !== productId));
    removeSelectedIds([productId]);
  };

  const removeSelectedItemsFromCart = () => {
    setCartItems((prevItems) => prevItems.filter(item => !selectedIds.includes(item.product_id)));
    clearSelectedIds();
  };

  const updateItemQuantity = (productId: string, quantity: number | string) => {
    setCartItems((prevItems) =>
      prevItems.map(item =>
        item.product_id === productId ? { ...item, quantity } : item
      )
    );
  };

  const toggleBottomInfoView = () => {
    setToggleDisplayBottomInfo((prev) => !prev);
  };

  return {
    cartItems,
    setCartItems,
    selectedIds,
    toggleSelect,
    isAllItemsSelected,
    toggleSelectAllItems,
    removeItemFromCart,
    removeSelectedItemsFromCart,
    updateItemQuantity,
    getCartTotal,
    addItemToCart,
    toggleBottomInfoView,
    toggleDisplayBottomInfo,
    setToggleDisplayBottomInfo,
    bottomContainerHeight,
    handleBottomContainerHeight,
  };
}