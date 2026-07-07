import { View, StatusBar, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function UserHomeView() {
  const backgroundColor = 'red';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={'light-content'} backgroundColor={backgroundColor} />
      <View style={[{ backgroundColor: backgroundColor }, styles.container]}>
        
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%', 
    height: '100%', 
  },
});