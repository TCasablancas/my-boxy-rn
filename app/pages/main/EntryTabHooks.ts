import { useCallback, useEffect, useState } from 'react';
import { 
  renderBlockedTabBottomsheetContent, renderStoreRequiredBottomsheetContent,
} from '../../common/bottomsheets/LoginBottomsheetActions';
import { 
  USER_LOGIN_BOTTOMSHEET_DESCRIPTION, USER_LOGIN_BOTTOMSHEET_TITLE,
} from '../../common/strings/MainUserStrings';
import {
  STORE_SIGNUP_BOTTOMSHEET_TITLE, STORE_SIGNUP_BOTTOMSHEET_DESCRIPTION
} from '../../common/strings/StoreStrings';

import { supabase } from '../../service/supabase/supabase';
import MainNavigation from '../../common/navigation/MainNavigation';
import type { AppBottomsheetType } from './EntryTabModel';
import LoginPage from '../Login/index';

export function useEntryTabHooks() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [hasRegisteredStore] = useState(false);
  const [isLoginBottomsheetVisible, setIsLoginBottomsheetVisible] = useState(false);
  const [activeBlockedTab, setActiveBlockedTab] = useState<string | null>(null);
  const [activeBottomsheetType, setActiveBottomsheetType] = useState<AppBottomsheetType>(null);

  useEffect(() => {
    let isMounted = true;

    const bootstrapSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (!isMounted || error) {
        return;
      }

      const hasSession = Boolean(data.session?.user);
      setIsUserLoggedIn(hasSession);

      if (hasSession) {
        setIsLoginBottomsheetVisible(false);
        setActiveBottomsheetType(null);
        setActiveBlockedTab(null);
      }
    };

    void bootstrapSession();

    const { data: authSubscription } = supabase.auth.onAuthStateChange((_event, session) => {
      const hasSession = Boolean(session?.user);
      setIsUserLoggedIn(hasSession);

      if (hasSession) {
        setIsLoginBottomsheetVisible(false);
        setActiveBottomsheetType(null);
        setActiveBlockedTab(null);
      }
    });

    return () => {
      isMounted = false;
      authSubscription.subscription.unsubscribe();
    };
  }, []);

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

  const openLoginPage = useCallback(() => {
    closeLoginBottomsheet();
    requestAnimationFrame(() => {
      MainNavigation.replace(LoginPage);
    });
  }, [closeLoginBottomsheet]);

  const allowProtectedTabAccess = isUserLoggedIn;

  const resolvedBottomsheetTitle = activeBottomsheetType === 'store-required'
    ? STORE_SIGNUP_BOTTOMSHEET_TITLE : USER_LOGIN_BOTTOMSHEET_TITLE;

  const resolvedBottomsheetDescription = activeBottomsheetType === 'store-required'
    ? STORE_SIGNUP_BOTTOMSHEET_DESCRIPTION : USER_LOGIN_BOTTOMSHEET_DESCRIPTION;

  const resolvedBottomsheetContent = activeBottomsheetType === 'store-required'
    ? renderStoreRequiredBottomsheetContent()
    : renderBlockedTabBottomsheetContent(openLoginPage);

  return {
    isUserLoggedIn,
    hasRegisteredStore,
    allowProtectedTabAccess,
    isLoginBottomsheetVisible,
    openLoginBottomsheet,
    openStoreRequiredBottomsheet,
    closeLoginBottomsheet,
    blockedBottomsheetTitle: resolvedBottomsheetTitle,
    blockedBottomsheetDescription: resolvedBottomsheetDescription,
    blockedBottomsheetContent: resolvedBottomsheetContent,
  };
}
