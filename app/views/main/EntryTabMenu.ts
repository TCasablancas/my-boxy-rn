import { createElement, useMemo } from 'react';
import { Icons } from '../../common/icons/Icons';
import { IconsActions } from '../../common/icons/IconsActions';
import UserHomeView from '../userhome/UserHomeView';
import UserFavoritesView from '../favorites/UserFavoritesView';
import MoreConfigsView from '../moreconfigs/MoreConfigsView';
import MyShopView from '../myshop/MyShopView';
import type { EntryTabMenuItem } from './EntryTabModel';

type UseEntryTabMenuParams = {
  isUserLoggedIn: boolean;
};

export function useEntryTabMenu({ isUserLoggedIn }: UseEntryTabMenuParams) {
  const HomeViewComponent = useMemo(() => {
    return (props: any) => createElement(UserHomeView, {
      ...props,
      isUserLoggedIn,
    });
  }, [isUserLoggedIn]);

  const tabMenuData = useMemo<EntryTabMenuItem[]>(() => {
    return [
      { name: 'início', component: HomeViewComponent, icon: Icons.homeSimpleBar },
      { name: 'curtidos', component: UserFavoritesView, icon: Icons.heart },
      { name: 'minha loja', component: MyShopView, icon: Icons.store },
      { name: 'compras', component: MyShopView, icon: Icons.shoppingBag },
      { name: 'mais', component: MoreConfigsView, icon: IconsActions.squareFour },
    ];
  }, [HomeViewComponent]);

  return {
    tabMenuData,
  };
}
