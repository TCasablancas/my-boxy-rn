import { homeProducts } from '../../common/UserHomeData';
import {
	FavoriteProductItem,
	FavoriteStoreItem,
	FavoritesFilterOption,
	FavoritesTabKey,
} from './UserFavoritesModel';

function normalizeFavoriteProducts(): FavoriteProductItem[] {
	return homeProducts.map((product) => ({
		productId: product.productId,
		title: product.title,
		price: parseFloat(product.price).toFixed(2),
		imageUri: product.images.at(0) ?? '',
		storeName: product.storeData.storeName,
		storeImageUri: product.storeData.storeImageUri,
		rating: product.rating,
		isFavourite: Boolean(product.isFavorite),
	}));
}

export function getFavoriteProductsSource() {
	return normalizeFavoriteProducts().filter((product) => product.isFavourite);
}

export function getFavoriteStoresSource(products: FavoriteProductItem[]) {
	const storeMap = new Map<string, FavoriteStoreItem>();

	products.forEach((product) => {
		const storeId = `${product.storeName}-${product.storeImageUri}`;
		const currentStore = storeMap.get(storeId);

		if (!currentStore) {
			storeMap.set(storeId, {
				storeId,
				storeName: product.storeName,
				storeImageUri: product.storeImageUri,
				rating: product.rating,
				isFavourite: true,
				productsCount: 1,
			});
			return;
		}

		currentStore.productsCount += 1;
		if (!currentStore.rating && product.rating) {
			currentStore.rating = product.rating;
		}
	});

	return Array.from(storeMap.values());
}

export function getFavoritesFilterOptions(tab: FavoritesTabKey): FavoritesFilterOption[] {
	if (tab === 'products') {
		return [
			{ id: 'recent', label: 'Mais recentes' },
			{ id: 'price-asc', label: 'Menor preco' },
			{ id: 'price-desc', label: 'Maior preco' },
			{ id: 'alpha', label: 'A-Z' },
		];
	}

	return [
		{ id: 'recent', label: 'Mais recentes' },
		{ id: 'count-desc', label: 'Mais produtos' },
		{ id: 'count-asc', label: 'Menos produtos' },
		{ id: 'alpha', label: 'A-Z' },
	];
}

export function applyProductFilter(
	products: FavoriteProductItem[],
	selectedFilterId: string,
) {
	const sorted = [...products];

	switch (selectedFilterId) {
		case 'price-asc':
			return sorted.sort((a, b) => Number(a.price) - Number(b.price));
		case 'price-desc':
			return sorted.sort((a, b) => Number(b.price) - Number(a.price));
		case 'alpha':
			return sorted.sort((a, b) => a.title.localeCompare(b.title));
		default:
			return sorted;
	}
}

export function applyStoreFilter(stores: FavoriteStoreItem[], selectedFilterId: string) {
	const sorted = [...stores];

	switch (selectedFilterId) {
		case 'count-desc':
			return sorted.sort((a, b) => b.productsCount - a.productsCount);
		case 'count-asc':
			return sorted.sort((a, b) => a.productsCount - b.productsCount);
		case 'alpha':
			return sorted.sort((a, b) => a.storeName.localeCompare(b.storeName));
		default:
			return sorted;
	}
}
