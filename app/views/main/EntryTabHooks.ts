import { useCallback, useEffect, useState } from 'react';
import { 
  getBlockedTabBottomsheetDescription,
  getBlockedTabBottomsheetTitle,
  getStoreRequiredBottomsheetDescription,
  getStoreRequiredBottomsheetTitle,
  renderBlockedTabBottomsheetContent,
  renderStoreRequiredBottomsheetContent,
} from '../../common/bottomsheets/LoginBottomsheetActions';
import { supabase } from '../../service/supabase/supabase';
import type { AppBottomsheetType } from './EntryTabModel';

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

  const allowProtectedTabAccess = isUserLoggedIn;

  const blockedBottomsheetTitle = getBlockedTabBottomsheetTitle();
  const blockedBottomsheetDescription = getBlockedTabBottomsheetDescription();

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
