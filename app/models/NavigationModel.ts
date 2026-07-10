
export interface GlobalNavigationProps {
  navigation: { navigate: (screen: string) => void; goBack: () => void };
}