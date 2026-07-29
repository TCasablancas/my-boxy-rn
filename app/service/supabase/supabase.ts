import { AppState } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { REACT_APP_SUPABASE_URL, REACT_APP_SUPABASE_PUBLISHABLE_KEY } from '@env';
import { createClient } from "@supabase/supabase-js";
import 'react-native-url-polyfill/auto'

const supabaseUrl = REACT_APP_SUPABASE_URL;
const supabasePublishableKey = REACT_APP_SUPABASE_PUBLISHABLE_KEY;

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})

AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})