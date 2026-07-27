import React from 'react';
import MainNavigation, { registerNavigationTarget } from '../../common/navigation/MainNavigation';
import ProductDetailView from '../productdetail/ProductDetailView';
import UserProfileView from '../userprofile/UserProfileView';
import NotificationsView from '../notifications/NotificationsView';
import StoreSignupView from '../storesignup/StoreSignupView';
import type { HomeCarouselItem } from '../../sections/home/HomeCarouselListHeader';
import SearchView from '../search/SearchView';

export function UserHomeStoreSignupView() {
  return <StoreSignupView />;
}

registerNavigationTarget('UserProfileView', UserProfileView);
registerNavigationTarget('NotificationsView', NotificationsView);
registerNavigationTarget('UserHomeStoreSignupView', UserHomeStoreSignupView);
registerNavigationTarget('StoreSignupNavigator', StoreSignupView);
registerNavigationTarget('ProductDetailView', ProductDetailView);
registerNavigationTarget('SearchView', SearchView);

export function openNotifications() {
  MainNavigation.push(NotificationsView);
}

export function openUserProfile() {
  MainNavigation.push(UserProfileView);
}

export function openStoreSignup() {
  MainNavigation.push(UserHomeStoreSignupView);
}

export function openProductDetail(productId: string) {
  MainNavigation.push(ProductDetailView, { productId });
}

export function openSearchView() {
  MainNavigation.push(SearchView);
}

export function openCart() {
  MainNavigation.push('CartView');
}

export function openCarouselTarget(item: HomeCarouselItem) {
  if (item.targetView) {
    MainNavigation.push(item.targetView, item.targetParams);
  }
}
