import 'react-native-get-random-values';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainNavigation, {
  DYNAMIC_COMPONENT_ROUTE_NAME, navigationRef, setMainNavigationReady,
} from './app/common/navigation/MainNavigation';
import MainDynamicRouteScreen from './app/common/navigation/MainDynamicRouteScreen';

import UserProfileView from './app/views/userprofile/UserProfileView';
import SearchView from './app/views/search/SearchView';
import NotificationsView from './app/views/notifications/NotificationsView';
import MoreConfigsPlaceholderView from './app/views/moreconfigs/MoreConfigsPlaceholderView';
import ProductDetailView from './app/views/productdetail/ProductDetailView';
import UserSignupView from './app/views/usersignup/UserSignupView';
import LoginView from './app/views/login/LoginView';
import { UserHomeStoreSignupView } from './app/views/userhome/UserHomeNavigation';
import EntryTabView from './app/views/main/EntryTabView';
import { RootStackParamList } from './app/navigation/types';

const RootStack = createNativeStackNavigator<RootStackParamList>();

function UserSignupRootScreen() {
  return <UserSignupView onFinish={() => {}} />;
}

const MORE_CONFIG_PATHS = [
  'UserProfileView',
  'UserAddressesView',
  'UserNotificationsView',
  'UserFollowingView',
  'UserFollowersView',
  'UserHistoryView',
  'UserCouponsView',
  'UserPurchasesView',
  'UserBadgesView',
  'CreateStoreView',
  'PartnersView',
  'BillingView',
  'OfficialSealView',
  'SavedSearchesView',
  'PrivacyView',
  'TermsAndConditionsView',
  'AboutMyBoxyView',
  'CartView',
] as const;

export default function App() {
  return (
    <NavigationContainer ref={navigationRef} onReady={setMainNavigationReady}>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="MainTabs" component={EntryTabView} />
        <RootStack.Screen name="UserProfileView" component={UserProfileView} />
        <RootStack.Screen name="LoginView" component={LoginView} />
        <RootStack.Screen name="UserSignupView" component={UserSignupRootScreen} />
        <RootStack.Screen name="NotificationsView" component={NotificationsView} />
        <RootStack.Screen name="SearchView" component={SearchView} />
        <RootStack.Screen name="ProductDetailView" component={ProductDetailView} />
        <RootStack.Screen name="UserHomeStoreSignupView" component={UserHomeStoreSignupView} />
        <RootStack.Screen name={DYNAMIC_COMPONENT_ROUTE_NAME} component={MainDynamicRouteScreen} />
        {MORE_CONFIG_PATHS.filter((path) => path !== 'UserProfileView').map((path) => (
          <RootStack.Screen key={path} name={path} component={MoreConfigsPlaceholderView} />
        ))}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}