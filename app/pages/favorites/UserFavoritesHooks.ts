import { useCallback, useMemo, useState } from 'react';
import { 
  FavoriteProductItem, FavoriteStoreItem, FavoritesTabKey, 
} from './UserFavoritesModel';
import {
	applyProductFilter, applyStoreFilter, getFavoriteProductsSource, getFavoriteStoresSource,
} from './UserFavoritesService';

export function useUserFavoritesHooks() {
	const [activeTab, setActiveTab] = useState<FavoritesTabKey>('products');
	const [isFilterBottomsheetVisible, setIsFilterBottomsheetVisible] = useState(false);
	const [selectedFilterId, setSelectedFilterId] = useState('recent');
	const [favoriteProducts, setFavoriteProducts] = useState<FavoriteProductItem[]>(() => getFavoriteProductsSource());
	const [favoriteStores, setFavoriteStores] = useState<FavoriteStoreItem[]>(() =>
		getFavoriteStoresSource(getFavoriteProductsSource()),
	);

	const visibleProducts = useMemo(
		() => applyProductFilter(favoriteProducts, selectedFilterId),
		[favoriteProducts, selectedFilterId],
	);

	const visibleStores = useMemo(
		() => applyStoreFilter(favoriteStores, selectedFilterId),
		[favoriteStores, selectedFilterId],
	);

	const openFilterBottomsheet = useCallback(() => {
		setIsFilterBottomsheetVisible(true);
	}, []);

	const closeFilterBottomsheet = useCallback(() => {
		setIsFilterBottomsheetVisible(false);
	}, []);

	const changeTab = useCallback((nextTab: FavoritesTabKey) => {
		setActiveTab(nextTab);
		setSelectedFilterId('recent');
	}, []);

	const toggleProductFavorite = useCallback((productId: string, nextActive: boolean) => {
		if (nextActive) {
			return;
		}

		setFavoriteProducts((currentProducts) => {
			const updatedProducts = currentProducts.filter((product) => product.productId !== productId);
			setFavoriteStores(getFavoriteStoresSource(updatedProducts));
			return updatedProducts;
		});
	}, []);

	const toggleStoreFavorite = useCallback((storeId: string, nextActive: boolean) => {
		if (nextActive) {
			return;
		}

		setFavoriteStores((currentStores) => currentStores.filter((store) => store.storeId !== storeId));
		setFavoriteProducts((currentProducts) =>
			currentProducts.filter((product) => `${product.storeName}-${product.storeImageUri}` !== storeId),
		);
	}, []);

	return {
		activeTab,
		selectedFilterId,
		isFilterBottomsheetVisible,
		visibleProducts,
		visibleStores,
		changeTab,
		openFilterBottomsheet,
		closeFilterBottomsheet,
		setSelectedFilterId,
		toggleProductFavorite,
		toggleStoreFavorite,
	};
}
