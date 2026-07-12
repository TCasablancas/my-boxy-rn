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
  getBlockedTabBottomsheetDescription, getBlockedTabBottomsheetTitle, renderBlockedTabBottomsheetContent 
} from './common/bottomsheets/LoginBottomsheetActions';
import UserSignupView from './views/usersignup/UserSignupView';

export function useAppHooks() {
  const [isUserLoggedIn] = useState(true);
  const [isStoreLoggedIn] = useState(false);
  const [isLoginBottomsheetVisible, setIsLoginBottomsheetVisible] = useState(false);
  const [activeBlockedTab, setActiveBlockedTab] = useState<string | null>(null);

  const openLoginBottomsheet = useCallback((tabName?: string) => {
    setActiveBlockedTab(tabName ?? null);
    setIsLoginBottomsheetVisible(true);
  }, []);

  const closeLoginBottomsheet = useCallback(() => {
    setIsLoginBottomsheetVisible(false);
    setActiveBlockedTab(null);
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
    { name: 'compras' as const, component: MyShopView, icon: Icons.shoppingBag },
    { name: 'busca' as const, component: SearchView, icon: IconsActions.search },
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
  const blockedBottomsheetContent = renderBlockedTabBottomsheetContent();

  return {
    isUserLoggedIn,
    isStoreLoggedIn,
    allowProtectedTabAccess,
    isLoginBottomsheetVisible,
    openLoginBottomsheet,
    closeLoginBottomsheet,
    blockedBottomsheetTitle,
    blockedBottomsheetDescription,
    blockedBottomsheetContent,
    tabMenuData,
  };
}
