import { Icons } from './icons/Icons';
import { ProductDetailProps } from '../views/productdetail/ProductDetailModel';
import { v4 as uuidv4 } from 'uuid';
import NotificationsView from '../views/notifications/NotificationsView';
import ProductDetailView from '../views/productdetail/ProductDetailView';
import { UserHomeStoreSignupView } from '../views/userhome/UserHomeNavigation';
import { HomeCarouselItem } from '../sections/home/HomeCarouselListHeader';

export const userHomeCarouselItems: HomeCarouselItem[] = [
  {
    id: 'home-hero-1',
    title: 'Promoção em Hogwarts',
    imageUri:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdAmS7St9lVWfFDMOjWtPEuntoWHgcD_P3muUsW0nuLhE_Gxudes4f53E&s=10',
    targetView: ProductDetailView,
    targetParams: { productId: '1' },
  },
  {
    id: 'home-hero-2',
    title: 'Coleção de acessórios da estação',
    imageUri:
      'https://www.baublebar.com/cdn/shop/files/GoodThingsAheadBraceletSet.png?crop=center&height=1448&v=1779283978&width=1086',
    targetView: UserHomeStoreSignupView,
  },
  {
    id: 'home-hero-3',
    title: 'Bolsas para todos os gostos, na boutique Sassy',
    imageUri:
      'https://shopsassyboutique.com/cdn/shop/files/17794714796d05712619adbbc1e0a3de2f0554519a3e0b748931afee883a170f5d5b40daec.png?v=1779472201&width=533',
    targetView: NotificationsView,
  },
];

export const homeProducts: ProductDetailProps[] = [
  {
    productId: uuidv4(),
    title: 'Grama de Pote',
    description: 'Planta de grama em pote para decoração e jardinagem.',
    price: '29.99',
    images: ['https://cultured.guru/wp-content/uploads/2019/09/FullSizeRender-1.jpg'],
    storeData: {
      storeId: uuidv4(),
      storeName: 'Gardening Co.',
      storeAlias: 'gardeningCo',
      storeImageUri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRNCAanOzvGxJsBzy7Ubfet7WBEIhjy0seSNYKNlWBF_EaE_T5TYCClt8&s=10',
      storeLocation: {
        city: 'São Paulo',
        state: 'SP',
      },
    },
    tags: [],
    rating: 4,
    isFavorite: true,
    likes: 120,
    details: 'Esta é uma planta de grama em pote, perfeita para decoração e jardinagem.',
    comments: [],
    moreFromStore: [],
    youLike: [],
    onPress: () => { },
    onPressFavorite: () => { },
  },
  {
    productId: uuidv4(),
    title: 'Mini terrário com Rolha',
    description: 'Mini terrário com rolha para decoração e jardinagem.',
    price: '79.99',
    images: ['https://wondrwood.com/cdn/shop/articles/terrarium_steps.jpg?v=1634833473'],
    storeData: {
      storeId: uuidv4(),
      storeName: 'Plant Store',
      storeAlias: 'plantStore',
      storeImageUri: 'https://thumbs.dreamstime.com/b/plant-market-logo-design-house-plant-shop-garden-plant-nursery-store-vector-design-market-stall-flower-pot-plant-logotype-250412974.jpg',
      storeLocation: {
        city: 'São Paulo',
        state: 'SP',
      },
    },
    tags: [],
    isFavorite: false,
    rating: 5,
    likes: 200,
    details: 'Este é um mini terrário com rolha, perfeito para decoração e jardinagem.',
    comments: [],
    moreFromStore: [],
    youLike: [],
    onPress: () => {},
    onPressFavorite: () => {},
  },
  {
    productId: uuidv4(),
    title: 'Terrário Externo de Mesa',
    description: 'Terrário externo de mesa para decoração e jardinagem.',
    price: '149.99',
    images: ['https://blog.papermart.com/wp-content/uploads/2024/04/2024-EarthDay-Mason-Jar-Planters_1080x1080.jpg'],
    storeData: {
      storeId: uuidv4(),
      storeName: 'Loja de Plantas',
      storeAlias: 'lojaDePlantas',
      storeImageUri: 'https://thumbs.dreamstime.com/b/plant-market-logo-design-house-plant-shop-garden-plant-nursery-store-vector-design-market-stall-flower-pot-plant-logotype-250412974.jpg',
      storeLocation: {
        city: 'São Paulo',
        state: 'SP',
      },
    },
    tags: [],
    rating: 4,
    isFavorite: true,
    likes: 150,
    details: 'Este é um terrário externo de mesa, perfeito para decoração e jardinagem.',
    comments: [],
    moreFromStore: [],
    youLike: [],
    onPress: () => {},
    onPressFavorite: () => {},
  },
  {
    productId: uuidv4(),
    title: 'Vaso Suculenta Mesa',
    description: 'Vaso de suculenta para decoração e jardinagem.',
    price: '199.99',
    images: ['https://www.thegardener.co.za/wp-content/uploads/2025/07/3-12-683x1024.png'],
    storeData: {
      storeId: uuidv4(),
      storeName: 'Plant Shop',
      storeAlias: 'plantShop',
      storeImageUri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYqtPusjji-GhXuqkiXJPlEzAx-VcHzbUU8tJJIW5KHsKXRnxnpl3n_5s&s=10',
      storeLocation: {
        city: 'São Paulo',
        state: 'SP',
      },
    },
    tags: [],
    rating: 4,
    isFavorite: false,
    likes: 180,
    details: 'Este é um vaso de suculenta para decoração e jardinagem.',
    comments: [],
    moreFromStore: [],
    youLike: [],
    onPress: () => {},
    onPressFavorite: () => {},
  },
  {
    productId: uuidv4(),
    title: 'Carnivora Pendular',
    description: 'Planta carnívora pendular para decoração e jardinagem.',
    price: '249.99',
    images: ['https://www.monkeyjars.com/img/plant.jpg?_cchid=b15f930c04b4eb892ef0e63cac44d9fc'],
    storeData: {
      storeId: uuidv4(),
      storeName: 'Loja de Plantas',
      storeAlias: 'lojaDePlantas',
      storeImageUri: 'https://thumbs.dreamstime.com/b/plant-market-logo-design-house-plant-shop-garden-plant-nursery-store-vector-design-market-stall-flower-pot-plant-logotype-250412974.jpg',
      storeLocation: {
        city: 'São Paulo',
        state: 'SP',
      },
    },
    tags: [],
    rating: 3,
    isFavorite: true,
    likes: 90,
    details: 'Esta é uma planta carnívora pendular, perfeita para decoração e jardinagem.',
    comments: [],
    moreFromStore: [],
    youLike: [],
    onPress: () => {},
    onPressFavorite: () => {},
  },
  {
    productId: uuidv4(),
    title: 'Terrário Fechado',
    description: 'Terrário fechado, com tampa, para mesa.',
    price: '249.99',
    images: ['https://img.drz.lazcdn.com/static/bd/p/04efdc1ca1e2b33f92c2ff260def6daf.jpg_960x960q80.jpg_.webp'],
    storeData: {
      storeId: uuidv4(),
      storeName: 'Loja de Plantas',
      storeAlias: 'lojaDePlantas',
      storeImageUri: 'https://thumbs.dreamstime.com/b/plant-market-logo-design-house-plant-shop-garden-plant-nursery-store-vector-design-market-stall-flower-pot-plant-logotype-250412974.jpg',
      storeLocation: {
        city: 'São Paulo',
        state: 'SP',
      },
    },
    tags: [],
    rating: 3,
    isFavorite: true,
    likes: 90,
    details: 'Este é um terrário fechado, com tampa, perfeito para decoração e jardinagem.',
    comments: [],
    moreFromStore: [],
    youLike: [],
    onPress: () => {},
    onPressFavorite: () => {},
  },
  {
    productId: uuidv4(),
    title: 'Suculeta de Tampa',
    description: 'Suculenta, no vaso, com tampa para decoração de mesa.',
    price: '249.99',
    images: ['https://www.housedigest.com/img/gallery/12-beautiful-houseplants-you-can-grow-in-glass-jars-bottles/succulents-1720462391.jpg'],
    storeData: {
      storeId: uuidv4(),
      storeName: 'Loja de Plantas',
      storeAlias: 'lojaDePlantas',
      storeImageUri: 'https://thumbs.dreamstime.com/b/plant-market-logo-design-house-plant-shop-garden-plant-nursery-store-vector-design-market-stall-flower-pot-plant-logotype-250412974.jpg',
      storeLocation: {
        city: 'São Paulo',
        state: 'SP',
      },
    },
    tags: [],
    rating: 3,
    isFavorite: true,
    likes: 90,
    details: 'Esta é uma suculenta, no vaso, com tampa para decoração de mesa.',
    comments: [],
    moreFromStore: [],
    youLike: [],
    onPress: () => {},
    onPressFavorite: () => {},
  }
];

export const homeTags = [
  {
    id: '1',
    title: 'plantas',
  },
  {
    id: '2',
    title: 'vasos',
  },
  {
    id: '3',
    title: 'terrários',
  },
  {
    id: '4',
    title: 'suculentas',
  },
  {
    id: '5',
    title: 'perfume floral',
  },
  {
    id: '6',
    title: 'vela aromática',
  },
];  

export const homeCategories = [
  {
    id: '1',
    title: 'Plantas',
    icon: `<Icons.bag width={22} height={22} />`
  },
  {
    id: '2',
    title: 'Vasos',
    icon: `<Icons.barcode width={22} height={22} />`
  },
  {
    id: '3',
    title: 'Terrários',
    icon: `<Icons.fire width={22} height={22} />`
  },
  {
    id: '4',
    title: 'Suculentas',
    icon: `<Icons.photo width={22} height={22} />`
  },
];  