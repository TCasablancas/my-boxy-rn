import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { NeutralColors } from '../../common/colors/Colors';

export default function SafeAreaView({ children }: { children: React.ReactNode }) {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaProvider style={{ backgroundColor: NeutralColors.backgroundAlt }}>
      <StatusBar barStyle={'dark-content'} backgroundColor={NeutralColors.backgroundAlt} translucent={true} />
      {children}
    </SafeAreaProvider>
  );
};