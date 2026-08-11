import { useSyncExternalStore } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { CartItemProps } from '../../pages/cart/CartModel';
import { CartItemsData } from '../CartItemsData';

const CART_STORE_STORAGE_KEY = '@myboxy/cart-store-v1';

type CartStoreSnapshot = {
  cartItems: CartItemProps[];
  selectedIds: string[];
  hasHydrated: boolean;
};

type PersistedCartStore = {
  cartItems: CartItemProps[];
  selectedIds: string[];
};

type Listener = () => void;

let state: CartStoreSnapshot = {
  cartItems: CartItemsData,
  selectedIds: [],
  hasHydrated: false,
};

const listeners = new Set<Listener>();
let isHydrating = false;

const notify = () => {
  listeners.forEach((listener) => listener());
};

const subscribe = (listener: Listener) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

const sanitizeSelectedIds = (selectedIds: string[], items: CartItemProps[]) => {
  const availableIds = new Set(items.map((item) => item.product_id));
  return selectedIds.filter((id) => availableIds.has(id));
};

const setState = (
  updater: CartStoreSnapshot | ((prevState: CartStoreSnapshot) => CartStoreSnapshot),
  options?: { skipPersist?: boolean },
) => {
  state = typeof updater === 'function' ? updater(state) : updater;
  notify();

  if (!options?.skipPersist) {
    void persistState();
  }
};

const persistState = async () => {
  const payload: PersistedCartStore = {
    cartItems: state.cartItems,
    selectedIds: state.selectedIds,
  };
  await AsyncStorage.setItem(CART_STORE_STORAGE_KEY, JSON.stringify(payload));
};

const hydrateCartStore = async () => {
  if (isHydrating || state.hasHydrated) {
    return;
  }

  isHydrating = true;
  try {
    const rawValue = await AsyncStorage.getItem(CART_STORE_STORAGE_KEY);
    if (!rawValue) {
      setState((prevState) => ({ ...prevState, hasHydrated: true }), { skipPersist: true });
      return;
    }

    const parsed = JSON.parse(rawValue) as Partial<PersistedCartStore>;
    const hydratedItems = Array.isArray(parsed.cartItems) ? parsed.cartItems : CartItemsData;
    const hydratedSelectedIds = Array.isArray(parsed.selectedIds)
      ? sanitizeSelectedIds(parsed.selectedIds, hydratedItems)
      : [];

    setState(
      {
        cartItems: hydratedItems,
        selectedIds: hydratedSelectedIds,
        hasHydrated: true,
      },
      { skipPersist: true },
    );
  } catch {
    setState((prevState) => ({ ...prevState, hasHydrated: true }), { skipPersist: true });
  } finally {
    isHydrating = false;
  }
};

void hydrateCartStore();

const normalizeQuantity = (value: number) => {
  if (!Number.isFinite(value)) {
    return 1;
  }
  return Math.max(1, Math.floor(value));
};

export const cartStoreActions = {
  addItem(item: CartItemProps, options?: { select?: boolean }) {
    const shouldSelect = options?.select ?? true;

    setState((prevState) => {
      const existingIndex = prevState.cartItems.findIndex(
        (cartItem) => cartItem.product_id === item.product_id,
      );

      const nextCartItems = [...prevState.cartItems];

      if (existingIndex >= 0) {
        const existingItem = nextCartItems[existingIndex];
        const nextQuantity = normalizeQuantity(existingItem.quantity + normalizeQuantity(item.quantity));
        nextCartItems[existingIndex] = { ...existingItem, ...item, quantity: nextQuantity };
      } else {
        nextCartItems.push({ ...item, quantity: normalizeQuantity(item.quantity) });
      }

      const nextSelectedIds = shouldSelect
        ? Array.from(new Set([...prevState.selectedIds, item.product_id]))
        : prevState.selectedIds;

      return {
        ...prevState,
        cartItems: nextCartItems,
        selectedIds: sanitizeSelectedIds(nextSelectedIds, nextCartItems),
      };
    });
  },

  toggleSelect(productId: string) {
    setState((prevState) => {
      const isSelected = prevState.selectedIds.includes(productId);
      const nextSelectedIds = isSelected
        ? prevState.selectedIds.filter((id) => id !== productId)
        : [...prevState.selectedIds, productId];

      return {
        ...prevState,
        selectedIds: sanitizeSelectedIds(nextSelectedIds, prevState.cartItems),
      };
    });
  },

  toggleSelectAll() {
    setState((prevState) => {
      const allItemIds = prevState.cartItems.map((item) => item.product_id);
      const isAllSelected =
        allItemIds.length > 0 && allItemIds.every((id) => prevState.selectedIds.includes(id));

      return {
        ...prevState,
        selectedIds: isAllSelected ? [] : allItemIds,
      };
    });
  },

  removeItem(productId: string) {
    setState((prevState) => {
      const nextCartItems = prevState.cartItems.filter((item) => item.product_id !== productId);
      const nextSelectedIds = prevState.selectedIds.filter((id) => id !== productId);

      return {
        ...prevState,
        cartItems: nextCartItems,
        selectedIds: nextSelectedIds,
      };
    });
  },

  removeSelectedItems() {
    setState((prevState) => {
      if (prevState.selectedIds.length === 0) {
        return prevState;
      }

      const selectedSet = new Set(prevState.selectedIds);
      const nextCartItems = prevState.cartItems.filter((item) => !selectedSet.has(item.product_id));

      return {
        ...prevState,
        cartItems: nextCartItems,
        selectedIds: [],
      };
    });
  },

  checkoutSelectedItems() {
    this.removeSelectedItems();
  },

  updateItemQuantity(productId: string, quantity: number) {
    const normalizedQuantity = normalizeQuantity(quantity);

    setState((prevState) => ({
      ...prevState,
      cartItems: prevState.cartItems.map((item) =>
        item.product_id === productId ? { ...item, quantity: normalizedQuantity } : item,
      ),
    }));
  },

  clearSelection() {
    setState((prevState) => ({
      ...prevState,
      selectedIds: [],
    }));
  },
};

export const addItemToCartAndSelect = (item: CartItemProps) => {
  cartStoreActions.addItem(item, { select: true });
};

export function useCartStore<T>(selector: (snapshot: CartStoreSnapshot) => T): T {
  return useSyncExternalStore(subscribe, () => selector(state), () => selector(state));
}
