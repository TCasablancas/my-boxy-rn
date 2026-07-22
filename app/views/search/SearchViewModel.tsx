import MainNavigation from '../../common/navigation/MainNavigation';
import { homeCategories, homeProducts, homeTags } from '../../common/UserHomeData';
import MBHomeProductCard from '../../components/cards/MBMainProductCard';
import ProductDetailView from '../productdetail/ProductDetailView';
import { useSearchHooks } from './SearchHooks';

export function useSearchViewModel() {
	const {
		searchText,
		setSearchText,
		selectedTagIds,
		selectedCategoryIds,
		onToggleTag,
		onToggleCategory,
		onClearSearch,
		onSubmitSearch,
		hasSubmittedSearch,
		filteredProducts,
	} = useSearchHooks({
		tags: homeTags,
		categories: homeCategories,
		products: homeProducts,
	});

	function navigateToProduct(productId: string) {
		MainNavigation.push(ProductDetailView, { productId });
	}

	return {
		tags: homeTags,
		categories: homeCategories,
		searchText,
		onChangeSearchText: setSearchText,
		onClearSearch,
		selectedTagIds,
		selectedCategoryIds,
		onToggleTag,
		onToggleCategory,
		onSubmitSearch,
		hasSubmittedSearch,
		results: filteredProducts,
		renderProductCard: (item: (typeof homeProducts)[number]) => (
			<MBHomeProductCard
				product={{
					productId: item.productId,
					title: item.title,
					price: `${parseFloat(item.price).toFixed(2)}`,
					imageUri: item.images[0],
					storeName: item.storeData.storeName,
					storeImageUri: item.storeData.storeImageUri,
					rating: item.rating,
					onPress: () => navigateToProduct(item.productId),
					onPressFavorite: () => {},
				}}
			/>
		),
	};
}
