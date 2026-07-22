import MainNavigation from '../../common/navigation/MainNavigation';
import ProductDetailView from '../productdetail/ProductDetailView';

export function openFavoriteProductDetail(productId: string) {
  MainNavigation.push(ProductDetailView, { productId });
}

export function openFavoriteStore(storeId: string) {
  MainNavigation.push('UserHomeStoreSignupView', { storeId });
}
