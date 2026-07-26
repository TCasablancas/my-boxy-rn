import 'react-native-get-random-values';
import { useEffect, useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PlatformPressable } from '@react-navigation/elements';
import { MainTabParamList, RootStackParamList } from './app/navigation/types';
import {
  DYNAMIC_COMPONENT_ROUTE_NAME,
  navigationRef,
  setMainNavigationReady,
} from './app/common/navigation/MainNavigation';
import { useAppHooks } from './app/AppHooks';
import { NeutralColors, PrimaryColors } from './app/common/colors/Colors';
import SplashScreen from 'react-native-splash-screen';

import MBMainBottomsheet from './app/components/bottomsheet/MBMainBottomsheet';
import UserHomeView from './app/views/userhome/UserHomeView';
import UserFavoritesView from './app/views/favorites/UserFavoritesView';
import MoreConfigsView from './app/views/moreconfigs/MoreConfigsView';
import UserProfileView from './app/views/userprofile/UserProfileView';
import WalletView from './app/views/wallet/WalletView';
import MyShopView from './app/views/myshop/MyShopView';
import SearchView from './app/views/search/SearchView';
import NotificationsView from './app/views/notifications/NotificationsView';
import MoreConfigsPlaceholderView from './app/views/moreconfigs/MoreConfigsPlaceholderView';
import ProductDetailView from './app/views/productdetail/ProductDetailView';
import UserSignupView from './app/views/usersignup/UserSignupView';
import LoginView from './app/views/login/LoginView';
import { UserHomeStoreSignupView } from './app/views/userhome/UserHomeNavigation';
import MBFloatingCartBtn from './app/components/buttons/MBFloatingCartBtn';
import MainDynamicRouteScreen from './app/common/navigation/MainDynamicRouteScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();
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
] as const;

function MainTabs() {

  useEffect(() => {
    SplashScreen.hide();
  }, []);
  
  const {
    allowProtectedTabAccess,
    hasRegisteredStore,
    isLoginBottomsheetVisible,
    openLoginBottomsheet,
    openStoreRequiredBottomsheet,
    closeLoginBottomsheet,
    blockedBottomsheetTitle,
    blockedBottomsheetDescription,
    blockedBottomsheetContent,
    tabMenuData,
  } = useAppHooks();
  const [activeTabName, setActiveTabName] = useState<string>('início');

  const screenOptions = {
    tabBarStyle: {
      backgroundColor: NeutralColors.backgroundAlt,
      height: Platform.OS === 'ios' ? 90 : 60,
      elevation: 0,
      borderTopWidth: 0,
      shadowOpacity: 0,
    },
    headerShown: false,
  };

  const tabScreenOptions = {
    tabBarInactiveTintColor: 'gray',
    tabBarActiveTintColor: PrimaryColors.primary,
    tabBarLabelStyle: {
      fontSize: 11,
      fontFamily: 'SNPro-Bold',
    },
  };

  const tabBarButton = (props: any) => (
    <PlatformPressable
      {...props}
      android_ripple={{ color: 'transparent' }}
      pressOpacity={1}
      style={props.style}
    />
  );

  return (
    <>
      {activeTabName !== 'mais' && (
        <View style={styles.cartButtonWrapper}> 
          <MBFloatingCartBtn />
        </View>
      )}
      <Tab.Navigator screenOptions={screenOptions}>
        {tabMenuData.map((screen, index) => (
          <Tab.Screen
            key={index}
            name={screen.name as keyof MainTabParamList}
            component={screen.component}
            options={{
              ...tabScreenOptions,
              tabBarIcon: ({ color }) => {
                const IconComponent = screen.icon;
                const isMinhaLojaDisabled = screen.name === 'minha loja' && !hasRegisteredStore;
                // const iconColor = isMinhaLojaDisabled ? PrimaryColors.primaryLight : color;

                return <IconComponent width={20} height={20} stroke={color} strokeColor={color} />;
              },
              tabBarButton: (props: any) => {
                const isMinhaLojaDisabled = screen.name === 'minha loja' && !hasRegisteredStore;
                const isMinhaLojaTab = screen.name === 'minha loja';

                return tabBarButton({
                  ...props,
                  style: [
                    props.style, 
                    isMinhaLojaDisabled && isMinhaLojaTab ? styles.disabledTabButton : null
                  ],
                });
              },
            }}
            listeners={({ route }) => ({
              tabPress: (event) => {
                const routeName = String(route.name);
                const isMinhaLojaTab = routeName === 'minha loja';

                if (isMinhaLojaTab && !hasRegisteredStore) {
                  event.preventDefault();
                  openStoreRequiredBottomsheet();
                  return;
                }

                if (allowProtectedTabAccess || route.name === 'início') {
                  setActiveTabName(routeName);
                  return;
                }

                event.preventDefault();
                openLoginBottomsheet(routeName);
              },
            })}
          />
        ))}
      </Tab.Navigator>
      <MBMainBottomsheet
        visible={isLoginBottomsheetVisible}
        title={blockedBottomsheetTitle}
        description={blockedBottomsheetDescription}
        content={blockedBottomsheetContent}
        onClose={closeLoginBottomsheet}
        headerAlign="left"
        closeButton={true}
      />
    </>
  );
}

export default function App() {
  return (
    <NavigationContainer ref={navigationRef} onReady={setMainNavigationReady}>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="MainTabs" component={MainTabs} />
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

const styles = StyleSheet.create({
  cartButtonWrapper: { 
    flex: 1, 
    width: '100%', 
    position: 'absolute', 
    bottom: Platform.OS === 'ios' ? 98 : 68,
    zIndex: 100, 
    alignItems: 'center', 
    justifyContent: 'center',
  },
  disabledTabButton: {
    opacity: 0.35, 
    borderRadius: 8,
    margin: 4,
    padding: 4,
    top: -4,
    marginBottom: Platform.OS === 'ios' ? -4 : 0,
  },
});