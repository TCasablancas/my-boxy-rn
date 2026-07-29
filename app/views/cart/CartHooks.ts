import { useState } from 'react';
import { LayoutChangeEvent } from 'react-native';

export function useCartHooks() {
  const [toggleDisplayBottomInfo, setToggleDisplayBottomInfo] = useState<boolean>(false);
  const [bottomContainerHeight, setBottomContainerHeight] = useState(0);
  const [availableCoupons, setAvailableCoupons] = useState<string[]>(['CUPOM10', 'CUPOM20', 'CUPOM30']);

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
  };
}