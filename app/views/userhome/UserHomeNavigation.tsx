import React from 'react';
import MainNavigation, { registerNavigationTarget } from '../../common/navigation/MainNavigation';
import ProductDetailView from '../productdetail/ProductDetailView';
import UserProfileView from '../userprofile/UserProfileView';
import NotificationsView from '../notifications/NotificationsView';
import StoreSignupNavigator from '../storesignup/StoreSignupNavigator';
import type { HomeCarouselItem } from '../../sections/home/HomeCarouselListHeader';

export function UserHomeStoreSignupView() {
  return <StoreSignupNavigator onSubmit={async () => {}} />;
}

registerNavigationTarget('UserProfileView', UserProfileView);
registerNavigationTarget('NotificationsView', NotificationsView);
registerNavigationTarget('UserHomeStoreSignupView', UserHomeStoreSignupView);
registerNavigationTarget('StoreSignupNavigator', StoreSignupNavigator);
registerNavigationTarget('ProductDetailView', ProductDetailView);

export const userHomeCarouselItems: HomeCarouselItem[] = [
  {
    id: 'home-hero-1',
    title: 'Sua próxima escolha favorita',
    imageUri:
      'https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=1600&auto=format&fit=crop',
    targetView: ProductDetailView,
    targetParams: { productId: '1' },
  },
  {
    id: 'home-hero-2',
    title: 'Descubra novidades na loja',
    imageUri:
      'https://images.unsplash.com/photo-1470246973918-29a93221c455?q=80&w=1600&auto=format&fit=crop',
    targetView: UserHomeStoreSignupView,
  },
  {
    id: 'home-hero-3',
    title: 'Promoções e avisos da semana',
    imageUri:
      'https://images.unsplash.com/photo-1459156212016-c812468e2115?q=80&w=1600&auto=format&fit=crop',
    targetView: NotificationsView,
  },
];

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

export function openCart() {
  MainNavigation.push('CartView');
}

export function openCarouselTarget(item: HomeCarouselItem) {
  if (item.targetView) {
    MainNavigation.push(item.targetView, item.targetParams);
  }
}
