import { useState } from 'react';
import { LayoutChangeEvent } from 'react-native';

export function useCartHooks() {
  const [toggleDisplayBottomInfo, setToggleDisplayBottomInfo] = useState<boolean>(false);
  const [bottomContainerHeight, setBottomContainerHeight] = useState(0);
  const [availableCoupons, setAvailableCoupons] = useState<string[]>(['CUPOM10', 'CUPOM20', 'CUPOM30']);
  const [shippingFee, setShippingFee] = useState(0);
  const [serviceFee, setServiceFee] = useState(0);
  const [discountValue, setDiscountValue] = useState(0);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const handleBottomContainerHeight = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setBottomContainerHeight(height);
  };

  return {
    toggleDisplayBottomInfo,
    setToggleDisplayBottomInfo,
    bottomContainerHeight,
    setBottomContainerHeight,
    handleBottomContainerHeight,
    availableCoupons,
    setAvailableCoupons,
    shippingFee,
    setShippingFee,
    serviceFee,
    setServiceFee,
    discountValue,
    setDiscountValue,
  };
}