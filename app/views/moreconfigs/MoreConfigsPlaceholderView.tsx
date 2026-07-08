import { StyleSheet, Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';

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
    fontSize: 24,
    fontFamily: 'SNPro-Bold',
    color: '#111',
  },
  description: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 20,
    color: '#555',
    fontFamily: 'SNPro-Regular',
  },
});
