import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

export default function SearchView() {
  const searchResults = [
    { id: '1', title: 'Product 1' },
    { id: '2', title: 'Product 2' },
    { id: '3', title: 'Product 3' },
    // Add more search results as needed
  ];

  const renderItem = ({ item }: { item: { id: string; title: string } }) => (
    <TouchableOpacity style={styles.resultItem}>
      <Text style={styles.resultText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Results</Text>
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  listContainer: {
    paddingBottom: 16,
  },
  resultItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  resultText: {
    fontSize: 18,
  },
});