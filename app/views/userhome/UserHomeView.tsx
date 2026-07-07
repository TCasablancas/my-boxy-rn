import { View, StyleSheet, StatusBar, ScrollView, Text, Image, FlatList } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function UserHomeView() {
  const backgroundColor = '#F0E5E4';

  const homeProducts = [
    {
      id: '1',
      title: 'Grama de Pote',
      description: 'Planta de grama em pote para decoração e jardinagem.',
      price: 29.99,
      imageUri: 'https://cultured.guru/wp-content/uploads/2019/09/FullSizeRender-1.jpg',
      isFavourite: true,
    },
    {
      id: '2',
      title: 'Mini terrário com Rolha',
      description: 'Mini terrário com rolha para decoração e jardinagem.',
      price: 79.99,
      imageUri: 'https://wondrwood.com/cdn/shop/articles/terrarium_steps.jpg?v=1634833473',
      isFavourite: false,
    },
    {
      id: '3',
      title: 'Terrário Externo de Mesa',
      description: 'Terrário externo de mesa para decoração e jardinagem.',
      price: 149.99,
      imageUri: 'https://blog.papermart.com/wp-content/uploads/2024/04/2024-EarthDay-Mason-Jar-Planters_1080x1080.jpg',
      isFavourite: true,
    },
    {
      id: '4',
      title: 'Vaso Suculenta Mesa',
      description: 'Vaso de suculenta para decoração e jardinagem.',
      price: 199.99,
      imageUri: 'https://www.thegardener.co.za/wp-content/uploads/2025/07/3-12-683x1024.png',
      isFavourite: false,
    },
    {
      id: '5',
      title: 'Carnivora Pendular',
      description: 'Planta carnívora pendular para decoração e jardinagem.',
      price: 249.99,
      imageUri: 'https://www.monkeyjars.com/img/plant.jpg?_cchid=b15f930c04b4eb892ef0e63cac44d9fc',
      isFavourite: true,
    },
    {
      id: '6',
      title: 'Terrário Fechado',
      description: 'Terrário fechado, com tampa, para mesa.',
      price: 249.99,
      imageUri: 'https://img.drz.lazcdn.com/static/bd/p/04efdc1ca1e2b33f92c2ff260def6daf.jpg_960x960q80.jpg_.webp',
      isFavourite: true,
    },
    {
      id: '7',
      title: 'Suculeta de Tampa',
      description: 'Suculenta, no vaso, com tampa para decoração de mesa.',
      price: 249.99,
      imageUri: 'https://www.housedigest.com/img/gallery/12-beautiful-houseplants-you-can-grow-in-glass-jars-bottles/succulents-1720462391.jpg',
      isFavourite: true,
    }
  ];

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={'light-content'} backgroundColor={backgroundColor} />
      <View style={[{ backgroundColor: backgroundColor }, styles.container]}>
        <View style={[styles.contentWrapper]}>
          <View style={styles.headerContainer}>
            <Text>Lorem Ipsum</Text>
          </View>
          <FlatList
            data={homeProducts}
            style={styles.scrollView} 
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.productContainer}>
                <Image source={{ uri: item.imageUri }} style={styles.productImage} />
                <Text style={styles.productTitle}>{item.title}</Text>
                <Text style={styles.productPrice}>{item.price}</Text>
              </View>
            )}
            numColumns={2}
            contentContainerStyle={{ paddingBottom: 16 }}
          />
          {/* <ScrollView 
            style={styles.scrollView} 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}
          >
            {homeProducts.map((product) => (
              <View key={product.id} style={styles.productContainer}>
                <Image source={{ uri: product.imageUri }} style={styles.productImage} />
                <Text style={styles.productTitle}>{product.title}</Text>
                {/* <Text>{product.description}</Text>
                <Text style={styles.productPrice}>{product.price}</Text>
              </View>
            ))}
          </ScrollView> */}
        </View>
      </View>
    </SafeAreaProvider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentWrapper: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    left: 16,
    right: 16,
    bottom: 16,
    borderRadius: 12,
  },
  scrollView: {
    backgroundColor: 'white',
    borderRadius: 12,
    // flexWrap: 'wrap',
    // flexDirection: 'row',
  },
  headerContainer: {
    width: '100%', 
    height: 80, 
    backgroundColor: 'transparent',
    paddingVertical: 16,
  },

  productContainer: {
    paddingHorizontal: 8,
    marginVertical: 8,
    flex: 1,
    width: '50%',
  },
  productImage: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
    marginBottom: 4,
    borderRadius: 8,
  },
  productTitle: {
    fontSize: 12,
    color: '#4c4c4c',
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 16,
    color: '#b3b3b3',
  },
});