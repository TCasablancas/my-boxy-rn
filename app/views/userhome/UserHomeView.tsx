import { View, StyleSheet, StatusBar, Text, Image, FlatList } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MBHeaderUserContent from '../../components/header/MBHeaderUserContent';
import MBHomeProductCard from '../../components/cards/MBHomeProductCard';

export default function UserHomeView() {
  const backgroundColor = '#F0E5E4';

  const homeProducts = [
    {
      id: '1',
      title: 'Grama de Pote',
      description: 'Planta de grama em pote para decoração e jardinagem.',
      price: 29.99,
      imageUri: 'https://cultured.guru/wp-content/uploads/2019/09/FullSizeRender-1.jpg',
      storeName: 'Gardening Co.',
      storeImageUri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRNCAanOzvGxJsBzy7Ubfet7WBEIhjy0seSNYKNlWBF_EaE_T5TYCClt8&s=10',
      rating: 4,
      isFavourite: true,
    },
    {
      id: '2',
      title: 'Mini terrário com Rolha',
      description: 'Mini terrário com rolha para decoração e jardinagem.',
      price: 79.99,
      imageUri: 'https://wondrwood.com/cdn/shop/articles/terrarium_steps.jpg?v=1634833473',
      storeName: 'Plant Store',
      storeImageUri: 'https://thumbs.dreamstime.com/b/plant-market-logo-design-house-plant-shop-garden-plant-nursery-store-vector-design-market-stall-flower-pot-plant-logotype-250412974.jpg',
      isFavourite: false,
    },
    {
      id: '3',
      title: 'Terrário Externo de Mesa',
      description: 'Terrário externo de mesa para decoração e jardinagem.',
      price: 149.99,
      imageUri: 'https://blog.papermart.com/wp-content/uploads/2024/04/2024-EarthDay-Mason-Jar-Planters_1080x1080.jpg',
      storeName: 'Loja de Plantas',
      storeImageUri: 'https://thumbs.dreamstime.com/b/plant-market-logo-design-house-plant-shop-garden-plant-nursery-store-vector-design-market-stall-flower-pot-plant-logotype-250412974.jpg',
      rating: 5,
      isFavourite: true,
    },
    {
      id: '4',
      title: 'Vaso Suculenta Mesa',
      description: 'Vaso de suculenta para decoração e jardinagem.',
      price: 199.99,
      imageUri: 'https://www.thegardener.co.za/wp-content/uploads/2025/07/3-12-683x1024.png',
      storeName: 'Plant Shop',
      storeImageUri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYqtPusjji-GhXuqkiXJPlEzAx-VcHzbUU8tJJIW5KHsKXRnxnpl3n_5s&s=10',
      rating: 4,
      isFavourite: false,
    },
    {
      id: '5',
      title: 'Carnivora Pendular',
      description: 'Planta carnívora pendular para decoração e jardinagem.',
      price: 249.99,
      imageUri: 'https://www.monkeyjars.com/img/plant.jpg?_cchid=b15f930c04b4eb892ef0e63cac44d9fc',
      storeName: 'Loja de Plantas',
      storeImageUri: 'https://thumbs.dreamstime.com/b/plant-market-logo-design-house-plant-shop-garden-plant-nursery-store-vector-design-market-stall-flower-pot-plant-logotype-250412974.jpg',
      rating: 3,
      isFavourite: true,
    },
    {
      id: '6',
      title: 'Terrário Fechado',
      description: 'Terrário fechado, com tampa, para mesa.',
      price: 249.99,
      imageUri: 'https://img.drz.lazcdn.com/static/bd/p/04efdc1ca1e2b33f92c2ff260def6daf.jpg_960x960q80.jpg_.webp',
      storeName: 'Loja de Plantas',
      storeImageUri: 'https://thumbs.dreamstime.com/b/plant-market-logo-design-house-plant-shop-garden-plant-nursery-store-vector-design-market-stall-flower-pot-plant-logotype-250412974.jpg',
      isFavourite: true,
    },
    {
      id: '7',
      title: 'Suculeta de Tampa',
      description: 'Suculenta, no vaso, com tampa para decoração de mesa.',
      price: 249.99,
      imageUri: 'https://www.housedigest.com/img/gallery/12-beautiful-houseplants-you-can-grow-in-glass-jars-bottles/succulents-1720462391.jpg',
      storeName: 'Loja de Plantas',
      storeImageUri: 'https://thumbs.dreamstime.com/b/plant-market-logo-design-house-plant-shop-garden-plant-nursery-store-vector-design-market-stall-flower-pot-plant-logotype-250412974.jpg',
      isFavourite: true,
    }
  ];

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={'light-content'} backgroundColor={backgroundColor} />
      <View style={[{ backgroundColor: backgroundColor }, styles.container]}>
        <View style={[styles.contentWrapper]}>
          <View style={styles.headerContainer}>
            <MBHeaderUserContent userName="Thiago Silva" userAlias="thyagoacsilva" />
          </View>
          <FlatList
            data={homeProducts}
            style={styles.scrollView} 
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <MBHomeProductCard product={{
                id: item.id,
                title: item.title,
                price: `${item.price.toFixed(2)}`,
                imageUri: item.imageUri,
                storeName: item.storeName,
                storeImageUri: item.storeImageUri,
                rating: item.rating,
              }} />
            )}
            numColumns={2}
            contentContainerStyle={{ paddingBottom: 16 }}
          />
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
    bottom: 8,
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
    height: 100, 
    backgroundColor: 'transparent',
    // paddingVertical: 16,
  },
});