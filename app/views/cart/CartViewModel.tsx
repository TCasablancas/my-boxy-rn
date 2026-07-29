
import { useState } from 'react';
import type { CartItemProps } from './CartModel';
import { useCartHooks } from './CartHooks';
import { cartStoreActions, useCartStore } from '../../common/store/cartStore';

export default function useCartViewModel() {
  const {
    toggleDisplayBottomInfo,
    setToggleDisplayBottomInfo,
    bottomContainerHeight,
    setBottomContainerHeight,
    availableCoupons,
    setAvailableCoupons,
    handleBottomContainerHeight,
  } = useCartHooks();

  const cartItems = useCartStore((snapshot) => snapshot.cartItems);
  const selectedIds = useCartStore((snapshot) => snapshot.selectedIds);

  const isAllItemsSelected = cartItems.length > 0 && cartItems.every(item => selectedIds.includes(item.product_id));

  const toggleSelectAllItems = () => {
    cartStoreActions.toggleSelectAll();
  };

  const toggleSelect = (productId: string) => {
    cartStoreActions.toggleSelect(productId);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price);
      const quantity = item.quantity;
      return total + (price * quantity);
    }, 0);
  };

  const getTotalCoupons = () => {
    return availableCoupons.length;
  };

  const addItemToCart = (item: CartItemProps) => {
    cartStoreActions.addItem(item, { select: true });
  };

  const removeItemFromCart = (productId: string) => {
    cartStoreActions.removeItem(productId);
  };

  const removeSelectedItemsFromCart = () => {
    cartStoreActions.removeSelectedItems();
  };

  const checkoutSelectedItems = () => {
    cartStoreActions.checkoutSelectedItems();
  };

  const updateItemQuantity = (productId: string, quantity: number) => {
    cartStoreActions.updateItemQuantity(productId, quantity);
  };

  const toggleBottomInfoView = () => {
    setToggleDisplayBottomInfo((prev) => !prev);
  };

  return {
    cartItems,
    selectedIds,
    toggleSelect,
    getTotalCoupons,
    isAllItemsSelected,
    toggleSelectAllItems,
    removeItemFromCart,
    removeSelectedItemsFromCart,
    checkoutSelectedItems,
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