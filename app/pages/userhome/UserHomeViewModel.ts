import type { 
  HomeFeedProduct,
  HomeStoreSection,
  HomeUserProfile,
  HomeSingleStoreRowBlock,
  HomeCarouselStoreBlock,
} from './UserHomeModel';

import { homeProducts, userHomeCarouselItems } from '../../common/UserHomeData';


type RawHomeEntity = Record<string, unknown>;

export type HomeFeedBlock = HomeSingleStoreRowBlock | HomeCarouselStoreBlock;
export type HomeFeedProductBlock = HomeStoreSection;
export type HomeUserProfileBlock = HomeUserProfile;

const MAX_PRODUCTS_PER_STORE = 10;
const STORES_BATCH_SIZE = 6;

export const DEFAULT_HOME_USER_PROFILE: HomeUserProfileBlock = {
  userName: 'Thiago Silva',
  userAlias: 'thyagoacsilva',
  locationName: 'Santos · SP',
};

function isRecord(value: unknown): value is RawHomeEntity {
  return typeof value === 'object' && value !== null;
}

function asString(value: unknown) {
  if (typeof value === 'string') {
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : undefined;
  }

  if (typeof value === 'number' && Number.isFinite(value)) {
    return String(value);
  }

  return undefined;
}

function asNumber(value: unknown) {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === 'string') {
    const parsed = Number(value.replace(',', '.'));
    return Number.isFinite(parsed) ? parsed : undefined;
  }

  return undefined;
}

function asBoolean(value: unknown) {
  if (typeof value === 'boolean') {
    return value;
  }

  if (typeof value === 'number') {
    return value === 1;
  }

  if (typeof value === 'string') {
    return value === 'true' || value === '1';
  }

  return undefined;
}

function asStringArray(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => asString(item))
    .filter((item): item is string => Boolean(item));
}

function getNestedRecord(source: RawHomeEntity, key: string) {
  const nestedValue = source[key];
  return isRecord(nestedValue) ? nestedValue : undefined;
}

function getFirstString(source: RawHomeEntity, keys: string[]) {
  for (const key of keys) {
    const value = asString(source[key]);
    if (value) {
      return value;
    }
  }

  return undefined;
}

function getFirstNumber(source: RawHomeEntity, keys: string[]) {
  for (const key of keys) {
    const value = asNumber(source[key]);
    if (value !== undefined) {
      return value;
    }
  }

  return undefined;
}

function getFirstBoolean(source: RawHomeEntity, keys: string[]) {
  for (const key of keys) {
    const value = asBoolean(source[key]);
    if (value !== undefined) {
      return value;
    }
  }

  return undefined;
}

function resolveStoreImageUri(source: RawHomeEntity, storeData?: RawHomeEntity) {
  const directImage = getFirstString(source, ['store_image_uri', 'store_image_url', 'storeImageUri']);
  if (directImage) {
    return directImage;
  }

  if (storeData) {
    const nestedImage = getFirstString(storeData, ['storeImageUri', 'store_image_uri', 'store_image_url', 'imageUri', 'image_url']);
    if (nestedImage) {
      return nestedImage;
    }
  }

  return 'https://via.placeholder.com/120';
}

function resolveProductImageUri(source: RawHomeEntity) {
  const directImage = getFirstString(source, ['image_uri', 'image_url', 'imageUri', 'imageUrl']);
  if (directImage) {
    return directImage;
  }

  const images = asStringArray(source.images);
  return images[0] ?? 'https://via.placeholder.com/320';
}

function normalizeMockProducts(): Array<HomeFeedProduct & { storeId: string }> {
  return homeProducts.map((product) => ({
    productId: product.productId,
    title: product.title,
    price: Number(product.price),
    imageUri: product.images.at(0) ?? 'https://via.placeholder.com/320',
    storeId: product.storeData.storeId,
    storeName: product.storeData.storeName,
    storeImageUri: product.storeData.storeImageUri,
    rating: product.rating,
    isFavourite: Boolean(product.isFavorite),
  }));
}

function normalizeRemoteProduct(source: RawHomeEntity, index: number) {
  const storeData = getNestedRecord(source, 'storeData');
  const productId = getFirstString(source, ['productId', 'product_id', 'id']) ?? `product-${index}`;
  const storeId =
    getFirstString(source, ['storeId', 'store_id', 'user_id', 'owner_id']) ??
    (storeData ? getFirstString(storeData, ['storeId', 'store_id', 'id']) : undefined) ??
    `store-${productId}`;

  return {
    productId,
    title: getFirstString(source, ['title', 'name', 'product_name']) ?? 'Produto sem nome',
    price: getFirstNumber(source, ['price', 'product_price', 'value']) ?? 0,
    imageUri: resolveProductImageUri(source),
    storeId,
    storeName:
      getFirstString(source, ['storeName', 'store_name']) ??
      (storeData ? getFirstString(storeData, ['storeName', 'store_name', 'name']) : undefined) ??
      'Loja',
    storeImageUri: resolveStoreImageUri(source, storeData),
    rating:
      getFirstNumber(source, ['rating', 'avg_rating']) ??
      (storeData ? getFirstNumber(storeData, ['rating', 'avg_rating']) : undefined),
    isFavourite:
      getFirstBoolean(source, ['isFavourite', 'isFavorite', 'favorite', 'is_favorite']) ??
      false,
  };
}

function normalizeHomeProducts(sourceProducts: RawHomeEntity[], useMockFallback: boolean) {
  if (sourceProducts.length > 0) {
    return sourceProducts.map((product, index) => normalizeRemoteProduct(product, index));
  }

  return useMockFallback ? normalizeMockProducts() : [];
}

function formatLocation(city?: string, state?: string) {
  if (city && state) {
    return `${city} · ${state}`;
  }

  return city ?? state ?? DEFAULT_HOME_USER_PROFILE.locationName;
}

export function normalizeUserHomeProfile(profile: RawHomeEntity | null, fallbackAlias?: string): HomeUserProfileBlock {
  if (!profile) {
    return {
      ...DEFAULT_HOME_USER_PROFILE,
      userAlias: fallbackAlias ?? DEFAULT_HOME_USER_PROFILE.userAlias,
    };
  }

  const location = getNestedRecord(profile, 'location');
  const address = getNestedRecord(profile, 'address');

  const city =
    getFirstString(profile, ['city']) ??
    (location ? getFirstString(location, ['city']) : undefined) ??
    (address ? getFirstString(address, ['city']) : undefined);

  const state =
    getFirstString(profile, ['state']) ??
    (location ? getFirstString(location, ['state']) : undefined) ??
    (address ? getFirstString(address, ['state']) : undefined);

  return {
    userName:
      getFirstString(profile, ['name', 'full_name', 'fullName', 'username']) ??
      DEFAULT_HOME_USER_PROFILE.userName,
    userAlias:
      getFirstString(profile, ['username', 'user_name', 'alias', 'email']) ??
      fallbackAlias ??
      DEFAULT_HOME_USER_PROFILE.userAlias,
    locationName: formatLocation(city, state),
  };
}

function getBaseStoreTemplates(
  sourceProducts: RawHomeEntity[],
  useMockFallback: boolean,
): HomeFeedProductBlock[] {
  const storeMap = new Map<string, HomeFeedProductBlock>();
  const normalizedProducts = normalizeHomeProducts(sourceProducts, useMockFallback);

  normalizedProducts.forEach((product) => {
    const storeKey = product.storeId;
    const existingStore = storeMap.get(storeKey);

    if (!existingStore) {
      storeMap.set(storeKey, {
        storeId: product.storeId,
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
  templates: HomeFeedProductBlock[],
  startIndex: number,
  count: number,
): HomeFeedProductBlock[] {
  if (!templates.length || count <= 0) {
    return [];
  }

  return templates.slice(startIndex, startIndex + count).map((template) => ({
    ...template,
    products: template.products.map((product) => ({ ...product })),
  }));
}

function createHomeFeedBlocks(storeSections: HomeFeedProductBlock[]): HomeFeedBlock[] {
  const feedBlocks: HomeFeedBlock[] = [];
  let pendingSingleStores: HomeFeedProductBlock[] = [];

  const flushPendingSingles = () => {
    if (!pendingSingleStores.length) {
      return;
    }

    feedBlocks.push({
      id: `single-row-${pendingSingleStores.map((store) => store.storeId).join('-')}`,
      type: 'single-row',
      stores: pendingSingleStores,
    });

    pendingSingleStores = [];
  };

  storeSections.forEach((storeSection: HomeFeedProductBlock) => {
    const shouldRenderAsSingleCard = storeSection.products.length <= 3;

    if (!shouldRenderAsSingleCard) {
      flushPendingSingles();
      feedBlocks.push({
        id: `carousel-${storeSection.storeId}`,
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

export function getUserHomeViewModel(
  sourceProducts: RawHomeEntity[] = [],
  options: { useMockFallback?: boolean } = {},
) {
  const storeTemplates = getBaseStoreTemplates(sourceProducts, Boolean(options.useMockFallback));

  function getInitialStoreSections() {
    return createStoreSections(storeTemplates, 0, STORES_BATCH_SIZE);
  }

  function getNextStoreSections(currentLength: number) {
    return createStoreSections(storeTemplates, currentLength, STORES_BATCH_SIZE);
  }

  function getHomeFeedBlocks(storeSections: HomeFeedProductBlock[]) {
    return createHomeFeedBlocks(storeSections);
  }

  return {
    getInitialStoreSections,
    getNextStoreSections,
    getHomeFeedBlocks,
  };
}