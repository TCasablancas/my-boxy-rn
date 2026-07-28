import { useState } from 'react';
import type { CartItemProps } from './CartModel';
import { LayoutChangeEvent } from 'react-native';
import { CartItemsData } from '../../common/CartItemsData';

export function useCartHooks() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const [toggleDisplayBottomInfo, setToggleDisplayBottomInfo] = useState<boolean>(true);
  const [bottomContainerHeight, setBottomContainerHeight] = useState(0);

 const toggleSelect = (id: string) => {
    setSelectedIds((prevSelectedIds) => {
      if (prevSelectedIds.includes(id)) {
        return prevSelectedIds.filter(selectedId => selectedId !== id);
      } else {
        return [...prevSelectedIds, id];
      }
    });
  };

  const toggleSelectAll = (allIds: string[]) => {
    setSelectedIds((prevSelectedIds) => {
      const allSelected = allIds.length > 0 && allIds.every(id => prevSelectedIds.includes(id));
      return allSelected ? [] : allIds;
    });
  };

  const removeSelectedIds = (ids: string[]) => {
    setSelectedIds((prevSelectedIds) => prevSelectedIds.filter(id => !ids.includes(id)));
  };

  const clearSelectedIds = () => {
    setSelectedIds([]);
  };

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
    selectedIds,
    toggleSelect,
    toggleSelectAll,
    removeSelectedIds,
    clearSelectedIds,
  };
}