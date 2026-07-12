
import { homeProducts } from '../../common/UserHomeData';

interface HomeFeedProduct {
  productId: string;
  title: string;
  price: number;
  imageUri: string;
  storeName: string;
  storeImageUri: string;
  rating?: number;
  isFavourite?: boolean;
}

export interface HomeStoreSection {
  id: string;
  storeName: string;
  storeImageUri: string;
  isFavorite?: boolean;
  products: HomeFeedProduct[];
}

export interface HomeSingleStoreRowBlock {
  id: string;
  type: 'single-row';
  stores: HomeStoreSection[];
}

export interface HomeCarouselStoreBlock {
  id: string;
  type: 'carousel';
  store: HomeStoreSection;
}

export type HomeFeedBlock = HomeSingleStoreRowBlock | HomeCarouselStoreBlock;

const MAX_PRODUCTS_PER_STORE = 10;
const STORES_BATCH_SIZE = 6;

function getBaseStoreTemplates(): Omit<HomeStoreSection, 'id'>[] {
  const storeMap = new Map<string, Omit<HomeStoreSection, 'id'>>();

  homeProducts.forEach((product) => {
    const storeKey = `${product.storeName}-${product.storeImageUri}`;
    const existingStore = storeMap.get(storeKey);

    if (!existingStore) {
      storeMap.set(storeKey, {
        storeName: product.storeName,
        storeImageUri: product.storeImageUri,
        isFavorite: product.isFavourite,
        products: [{ ...product }],
      });
      return;
    }

    if (existingStore.products.length < MAX_PRODUCTS_PER_STORE) {
      existingStore.products.push({ ...product });
    }
  });

  return Array.from(storeMap.values()).filter((store) => store.products.length > 0);
}

function createStoreSections(
  templates: Omit<HomeStoreSection, 'id'>[],
  startIndex: number,
  count: number,
): HomeStoreSection[] {
  if (!templates.length || count <= 0) {
    return [];
  }

  return Array.from({ length: count }).map((_, offset) => {
    const absoluteIndex = startIndex + offset;
    const template = templates[absoluteIndex % templates.length];

    return {
      id: `${template.storeName}-${absoluteIndex}`,
      storeName: template.storeName,
      storeImageUri: template.storeImageUri,
      isFavorite: template.isFavorite,
      products: template.products,
    };
  });
}

function createHomeFeedBlocks(storeSections: HomeStoreSection[]): HomeFeedBlock[] {
  const feedBlocks: HomeFeedBlock[] = [];
  let pendingSingleStores: HomeStoreSection[] = [];

  const flushPendingSingles = () => {
    if (!pendingSingleStores.length) {
      return;
    }

    feedBlocks.push({
      id: `single-row-${pendingSingleStores.map((store) => store.id).join('-')}`,
      type: 'single-row',
      stores: pendingSingleStores,
    });

    pendingSingleStores = [];
  };

  storeSections.forEach((storeSection) => {
    const shouldRenderAsSingleCard = storeSection.products.length <= 3;

    if (!shouldRenderAsSingleCard) {
      flushPendingSingles();
      feedBlocks.push({
        id: `carousel-${storeSection.id}`,
        type: 'carousel',
        store: storeSection,
      });
      return;
    }

    pendingSingleStores.push(storeSection);

    if (pendingSingleStores.length === 2) {
      flushPendingSingles();
    }
  });

  flushPendingSingles();

  return feedBlocks;
}

export function getUserHomeViewModel() {
  const storeTemplates = getBaseStoreTemplates();

  function getInitialStoreSections() {
    return createStoreSections(storeTemplates, 0, STORES_BATCH_SIZE);
  }

  function getNextStoreSections(currentLength: number) {
    return createStoreSections(storeTemplates, currentLength, STORES_BATCH_SIZE);
  }

  function getHomeFeedBlocks(storeSections: HomeStoreSection[]) {
    return createHomeFeedBlocks(storeSections);
  }

  return {
    getInitialStoreSections,
    getNextStoreSections,
    getHomeFeedBlocks,
  };
}