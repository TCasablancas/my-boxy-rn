
interface UserHomeViewModelParams {
  isChartBottomsheetVisible: boolean;
  openChartBottomsheet: () => void;
  closeChartBottomsheet: () => void;
}

export function getUserHomeViewModel({
  isChartBottomsheetVisible,
  openChartBottomsheet,
  closeChartBottomsheet,
}: UserHomeViewModelParams) {
  return {
    isChartBottomsheetVisible,
    openChartBottomsheet,
    closeChartBottomsheet,
  };
}