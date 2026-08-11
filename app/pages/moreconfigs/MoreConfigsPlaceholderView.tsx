import { StyleSheet, Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Fonts } from '../../common/constants/Fonts';

export default function MoreConfigsPlaceholderView() {
  const route = useRoute();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{route.name}</Text>
      <Text style={styles.description}>
        Esta view esta registrada por path e pronta para ser substituida por uma tela dedicada.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0E5E4',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    ...Fonts.bold24,
    color: '#111',
  },
  description: {
    marginTop: 10,
    ...Fonts.regular14Line20,
    color: '#555',
  },
});
