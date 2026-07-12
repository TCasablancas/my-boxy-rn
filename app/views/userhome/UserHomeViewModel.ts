
import { homeProducts } from '../../common/UserHomeData';

interface HomeFeedProduct {
  productId: string;
  title: string;
  price: number;
  imageUri: string;
  storeName: string;
  storeImageUri: string;
  rating?: number;
}

export interface HomeStoreSection {
  id: string;
  storeName: string;
  storeImageUri: string;
  products: HomeFeedProduct[];
}

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
      products: template.products,
    };
  });
}

export function getUserHomeViewModel() {
  const storeTemplates = getBaseStoreTemplates();

  function getInitialStoreSections() {
    return createStoreSections(storeTemplates, 0, STORES_BATCH_SIZE);
  }

  function getNextStoreSections(currentLength: number) {
    return createStoreSections(storeTemplates, currentLength, STORES_BATCH_SIZE);
  }

  return {
    getInitialStoreSections,
    getNextStoreSections,
  };
}