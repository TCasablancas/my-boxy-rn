import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar, StyleSheet, View } from 'react-native';
import { NeutralColors } from '../../../common/colors/Colors';
import MBTitledViewHeader from '../../ui/header/MBTitledViewHeader';

interface SafeAreaViewProps {
  title?: string;
  leftBtn?: React.ReactNode;
  rightBtn?: React.ReactNode[];
  children: React.ReactNode;
}

export default function SafeAreaView({ title, children, leftBtn, rightBtn }: SafeAreaViewProps) {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaProvider style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} translucent />
      <View style={styles.headerWrapper}>
        <MBTitledViewHeader 
          title={title}
          btnsLeft={leftBtn}
          btnsRight={rightBtn}
        />
      </View>
      {children}
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: NeutralColors.backgroundAlt,
  },
  headerWrapper: {
    padding: 16,
    flexDirection: 'column',
    // alignItems: 'stretch',
    // justifyContent: 'space-around',
  }
});