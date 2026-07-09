import MainNavigation from '../../common/navigation/MainNavigation';
import { homeCategories, homeProducts, homeTags } from '../../common/UserHomeData';
import MBHomeProductCard from '../../components/cards/MBHomeProductCard';
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
					id: item.id,
					title: item.title,
					price: `${item.price.toFixed(2)}`,
					imageUri: item.imageUri,
					storeName: item.storeName,
					storeImageUri: item.storeImageUri,
					rating: item.rating,
					onPress: () => navigateToProduct(item.id),
					onPressFavorite: () => {},
				}}
			/>
		),
	};
}
