import { createElement, useCallback, useMemo, useState } from 'react';
import { Icons } from './common/icons/Icons';
import { IconsActions } from './common/icons/IconsActions';
import UserHomeView from './views/userhome/UserHomeView';
import UserFavoritesView from './views/favorites/UserFavoritesView';
import MoreConfigsView from './views/moreconfigs/MoreConfigsView';
import WalletView from './views/wallet/WalletView';
import MyShopView from './views/myshop/MyShopView';
import SearchView from './views/search/SearchView';
import { 
  getBlockedTabBottomsheetDescription,
  getBlockedTabBottomsheetTitle,
  getStoreRequiredBottomsheetDescription,
  getStoreRequiredBottomsheetTitle,
  renderBlockedTabBottomsheetContent,
  renderStoreRequiredBottomsheetContent,
} from './common/bottomsheets/LoginBottomsheetActions';
import UserSignupView from './views/usersignup/UserSignupView';

type AppBottomsheetType = 'login' | 'store-required' | null;

export function useAppHooks() {
  const [isUserLoggedIn] = useState(true);
  const [isStoreLoggedIn] = useState(false);
  const [hasRegisteredStore] = useState(false);
  const [isLoginBottomsheetVisible, setIsLoginBottomsheetVisible] = useState(false);
  const [activeBlockedTab, setActiveBlockedTab] = useState<string | null>(null);
  const [activeBottomsheetType, setActiveBottomsheetType] = useState<AppBottomsheetType>(null);

  const openLoginBottomsheet = useCallback((tabName?: string) => {
    setActiveBlockedTab(tabName ?? null);
    setActiveBottomsheetType('login');
    setIsLoginBottomsheetVisible(true);
  }, []);

  const openStoreRequiredBottomsheet = useCallback(() => {
    setActiveBlockedTab('minha loja');
    setActiveBottomsheetType('store-required');
    setIsLoginBottomsheetVisible(true);
  }, []);

  const closeLoginBottomsheet = useCallback(() => {
    setIsLoginBottomsheetVisible(false);
    setActiveBlockedTab(null);
    setActiveBottomsheetType(null);
  }, []);

  const allowProtectedTabAccess = isUserLoggedIn || isStoreLoggedIn;

  const HomeViewComponent = useMemo(() => {
    return (props: any) => createElement(UserHomeView, {
      ...props,
      isUserLoggedIn,
    });
  }, [isUserLoggedIn]);

  const userMenuData = useMemo(() => ([
    { name: 'início' as const, component: HomeViewComponent, icon: Icons.homeSimpleBar },
    { name: 'curtidos' as const, component: UserFavoritesView, icon: Icons.heart },
    { name: 'minha loja' as const, component: MyShopView, icon: Icons.store },
    { name: 'compras' as const, component: MyShopView, icon: Icons.shoppingBag },
    { name: 'mais' as const, component: MoreConfigsView, icon: IconsActions.squareFour },
  ]), []);

  const storeMenuData = useMemo(() => ([
    { name: 'início' as const, component: HomeViewComponent, icon: Icons.homeSimpleBar },
    { name: 'curtidos' as const, component: UserFavoritesView, icon: Icons.heart },
    { name: 'compras' as const, component: MyShopView, icon: Icons.shoppingBag },
    { name: 'busca' as const, component: SearchView, icon: IconsActions.search },
    { name: 'mais' as const, component: MoreConfigsView, icon: IconsActions.squareFour },
  ]), []);

  const tabMenuData = isStoreLoggedIn ? storeMenuData : userMenuData;

  const blockedBottomsheetTitle = getBlockedTabBottomsheetTitle();
  const blockedBottomsheetDescription = activeBlockedTab
    ? getBlockedTabBottomsheetDescription({ tabName: activeBlockedTab })
    : getBlockedTabBottomsheetDescription();

  const storeRequiredBottomsheetTitle = getStoreRequiredBottomsheetTitle();
  const storeRequiredBottomsheetDescription = getStoreRequiredBottomsheetDescription();

  const resolvedBottomsheetTitle = activeBottomsheetType === 'store-required'
    ? storeRequiredBottomsheetTitle
    : blockedBottomsheetTitle;

  const resolvedBottomsheetDescription = activeBottomsheetType === 'store-required'
    ? storeRequiredBottomsheetDescription
    : blockedBottomsheetDescription;

  const resolvedBottomsheetContent = activeBottomsheetType === 'store-required'
    ? renderStoreRequiredBottomsheetContent()
    : renderBlockedTabBottomsheetContent();

  return {
    isUserLoggedIn,
    isStoreLoggedIn,
    hasRegisteredStore,
    allowProtectedTabAccess,
    isLoginBottomsheetVisible,
    openLoginBottomsheet,
    openStoreRequiredBottomsheet,
    closeLoginBottomsheet,
    blockedBottomsheetTitle: resolvedBottomsheetTitle,
    blockedBottomsheetDescription: resolvedBottomsheetDescription,
    blockedBottomsheetContent: resolvedBottomsheetContent,
    tabMenuData,
  };
}
