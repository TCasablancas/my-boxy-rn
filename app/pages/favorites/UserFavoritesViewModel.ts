import { useMemo } from 'react';
import { ProductProps } from '../../models/ProductCardModel';
import { getFavoritesFilterOptions } from './UserFavoritesService';
import { openFavoriteProductDetail, openFavoriteStore } from './UserFavoritesNavigator';
import { useUserFavoritesHooks } from './UserFavoritesHooks';

export function useUserFavoritesViewModel() {
	const {
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
	} = useUserFavoritesHooks();

	const filterOptions = useMemo(() => getFavoritesFilterOptions(activeTab), [activeTab]);

	const productCards = useMemo<ProductProps[]>(() => {
		return visibleProducts.map((product) => ({
			productId: product.productId,
			title: product.title,
			price: product.price,
			imageUri: product.imageUri,
			storeName: product.storeName,
			storeImageUri: product.storeImageUri,
			rating: product.rating,
			isFavourite: product.isFavourite,
			onPress: () => openFavoriteProductDetail(product.productId),
			onPressFavorite: (nextActive) => toggleProductFavorite(product.productId, nextActive),
		}));
	}, [toggleProductFavorite, visibleProducts]);

	const storeCards = useMemo(() => {
		return visibleStores.map((store) => ({
			...store,
			onPress: () => openFavoriteStore(store.storeId),
			onPressFavorite: (nextActive: boolean) => toggleStoreFavorite(store.storeId, nextActive),
		}));
	}, [toggleStoreFavorite, visibleStores]);

	return {
		activeTab,
		selectedFilterId,
		isFilterBottomsheetVisible,
		productCards,
		storeCards,
		filterOptions,
		changeTab,
		openFilterBottomsheet,
		closeFilterBottomsheet,
		setSelectedFilterId,
	};
}
