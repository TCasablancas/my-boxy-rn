import { useCallback, useState } from 'react';

export function useUserHomeBottomsheetState() {
    const [isChartBottomsheetVisible, setIsChartBottomsheetVisible] = useState(false);

	const openChartBottomsheet = useCallback(() => {
		setIsChartBottomsheetVisible(true);
	}, []);

	const closeChartBottomsheet = useCallback(() => {
		setIsChartBottomsheetVisible(false);
	}, []);

	return {
		isChartBottomsheetVisible,
		openChartBottomsheet,
		closeChartBottomsheet,
	};
}
