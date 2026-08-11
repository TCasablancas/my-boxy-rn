
import { useMemo, useState } from 'react';
import type { CartItemProps } from './CartModel';
import { useCartHooks } from './CartHooks';
import { cartStoreActions, useCartStore } from '../../common/store/cartStore';
import { formatCurrencyBRL, parsePriceToNumber, } from '../../common/constants/Currency';
import { buildCheckoutPayload, resolveCartTotals, submitCheckoutPayload } from './CartService';

export default function useCartViewModel() {
  const {
    toggleDisplayBottomInfo,
    setToggleDisplayBottomInfo,
    bottomContainerHeight,
    setBottomContainerHeight,
    availableCoupons,
    shippingFee,
    setShippingFee,
    serviceFee,
    setServiceFee,
    discountValue,
    setDiscountValue,
    handleBottomContainerHeight,
  } = useCartHooks();

  const cartItems = useCartStore((snapshot) => snapshot.cartItems);
  const selectedIds = useCartStore((snapshot) => snapshot.selectedIds);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  
  const selectedCartItems = useMemo(
    () => cartItems.filter((item) => selectedIds.includes(item.product_id)),
    [cartItems, selectedIds],
  );

  const cartTotals = useMemo(
    () => resolveCartTotals(selectedCartItems, { shipping: shippingFee, serviceFee, discount: discountValue }),
    [discountValue, selectedCartItems, serviceFee, shippingFee],
  );

  const checkoutPayload = useMemo(
    () => buildCheckoutPayload(selectedCartItems, { shipping: shippingFee, serviceFee, discount: discountValue }),
    [discountValue, selectedCartItems, serviceFee, shippingFee],
  );

  const checkoutSummary = useMemo(
    () => ({
      subtotal: formatCurrencyBRL(cartTotals.subtotal),
      discount: formatCurrencyBRL(cartTotals.discount),
      fees: formatCurrencyBRL(cartTotals.fees),
      total: formatCurrencyBRL(cartTotals.total),
    }),
    [cartTotals.discount, cartTotals.fees, cartTotals.subtotal, cartTotals.total],
  );

  const isAllItemsSelected = cartItems.length > 0 && cartItems.every(item => selectedIds.includes(item.product_id));

  const toggleSelectAllItems = () => {
    cartStoreActions.toggleSelectAll();
  };

  const toggleSelect = (productId: string) => {
    cartStoreActions.toggleSelect(productId);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parsePriceToNumber(item.price);
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

  const checkoutSelectedItems = async () => {
    if (selectedCartItems.length === 0 || isCheckingOut) {
      return;
    }

    setIsCheckingOut(true);
    try {
      const result = await submitCheckoutPayload(checkoutPayload);
      if (result.success) {
        cartStoreActions.checkoutSelectedItems();
      }
    } finally {
      setIsCheckingOut(false);
    }
  };

  const updateItemQuantity = (productId: string, quantity: number) => {
    cartStoreActions.updateItemQuantity(productId, quantity);
  };

  const toggleBottomInfoView = () => {
    setToggleDisplayBottomInfo((prev) => !prev);
  };

  const toggleBottomSheet = () => {
    setIsBottomSheetVisible((prev) => !prev);
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
    isCheckingOut,
    cartTotals,
    checkoutSummary,
    checkoutPayload,
    updateItemQuantity,
    getCartTotal,
    addItemToCart,
    toggleBottomInfoView,
    toggleDisplayBottomInfo,
    setToggleDisplayBottomInfo,
    bottomContainerHeight,
    handleBottomContainerHeight,
    shippingFee,
    setShippingFee,
    serviceFee,
    setServiceFee,
    discountValue,
    setDiscountValue,
    isBottomSheetVisible,
    toggleBottomSheet,
  };
}