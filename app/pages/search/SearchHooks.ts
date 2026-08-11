import { useCallback, useMemo, useState } from 'react';
import { filterSearchProducts, toggleIdSelection } from './SearchService';
import type { SearchCategory, SearchProduct, SearchTag } from './SearchModel';
import { ProductProps } from '../../models/ProductCardModel';

type UseSearchHooksParams = {
	tags: SearchTag[];
	categories: SearchCategory[];
	products: ProductProps[];
};

export function useSearchHooks({ tags, categories, products }: UseSearchHooksParams) {
	const [searchText, setSearchText] = useState('');
	const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);
	const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
	const [submittedCriteria, setSubmittedCriteria] = useState({
		text: '',
		selectedTagIds: [] as string[],
		selectedCategoryIds: [] as string[],
	});
	const [hasSubmittedSearch, setHasSubmittedSearch] = useState(false);

	const onToggleTag = useCallback((tagId: string) => {
		setSelectedTagIds((prev) => toggleIdSelection(prev, tagId));
	}, []);

	const onToggleCategory = useCallback((categoryId: string) => {
		setSelectedCategoryIds((prev) => toggleIdSelection(prev, categoryId));
	}, []);

	const onClearSearch = useCallback(() => {
		setSearchText('');
	}, []);

	const onSubmitSearch = useCallback(() => {
		setSubmittedCriteria({
			text: searchText,
			selectedTagIds,
			selectedCategoryIds,
		});
		setHasSubmittedSearch(true);
	}, [searchText, selectedCategoryIds, selectedTagIds]);

	const filteredProducts = useMemo(() => {
		if (!hasSubmittedSearch) {
			return products;
		}

		return filterSearchProducts(products, tags, categories, submittedCriteria);
	}, [categories, hasSubmittedSearch, products, submittedCriteria, tags]);

	return {
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
	};
}