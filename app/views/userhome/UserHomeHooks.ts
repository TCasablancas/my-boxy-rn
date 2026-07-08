import { useCallback, useState } from 'react';

export function useUserHomeBottomsheetState() {
	const [isSearchBottomsheetVisible, setIsSearchBottomsheetVisible] = useState(false);
	const [searchText, setSearchText] = useState('');
    const [isChartBottomsheetVisible, setIsChartBottomsheetVisible] = useState(false);

	const openSearchBottomsheet = useCallback(() => {
		setIsSearchBottomsheetVisible(true);
	}, []);

	const closeSearchBottomsheet = useCallback(() => {
		setIsSearchBottomsheetVisible(false);
	}, []);

	const clearSearchText = useCallback(() => {
		setSearchText('');
	}, []);

	const openChartBottomsheet = useCallback(() => {
		setIsChartBottomsheetVisible(true);
	}, []);

	const closeChartBottomsheet = useCallback(() => {
		setIsChartBottomsheetVisible(false);
	}, []);

	return {
		isSearchBottomsheetVisible,
		openSearchBottomsheet,
		closeSearchBottomsheet,
		searchText,
		setSearchText,
		clearSearchText,
		isChartBottomsheetVisible,
		openChartBottomsheet,
		closeChartBottomsheet,
	};
}
