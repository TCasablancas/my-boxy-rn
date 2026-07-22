import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { NeutralColors } from '../../common/colors/Colors';

export default function SafeAreaView({ children }: { children: React.ReactNode }) {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={'light-content'} backgroundColor={NeutralColors.backgroundAlt} translucent={true} />
      {children}
    </SafeAreaProvider>
  );
};