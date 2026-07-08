
interface UserHomeViewModelParams {
  isSearchBottomsheetVisible: boolean;
  openSearchBottomsheet: () => void;
  closeSearchBottomsheet: () => void;
  searchText: string;
  setSearchText: (text: string) => void;
  clearSearchText: () => void;
  isChartBottomsheetVisible: boolean;
  openChartBottomsheet: () => void;
  closeChartBottomsheet: () => void;
}

export function getUserHomeViewModel({
  isSearchBottomsheetVisible,
  openSearchBottomsheet,
  closeSearchBottomsheet,
  searchText,
  setSearchText,
  clearSearchText,
  isChartBottomsheetVisible,
  openChartBottomsheet,
  closeChartBottomsheet,
}: UserHomeViewModelParams) {
  const handleCloseSearchBottomsheet = () => {
    clearSearchText();
    closeSearchBottomsheet();
  };

  return {
    isSearchBottomsheetVisible,
    openSearchBottomsheet,
    closeSearchBottomsheet: handleCloseSearchBottomsheet,
    searchText,
    setSearchText,
    clearSearchText,
    isChartBottomsheetVisible,
    openChartBottomsheet,
    closeChartBottomsheet,
  };
}