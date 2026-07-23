import 'react-native-get-random-values';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PlatformPressable } from '@react-navigation/elements';
import { MainTabParamList, RootStackParamList } from './app/navigation/types';
import { navigationRef, setMainNavigationReady } from './app/common/navigation/MainNavigation';
import MBMainBottomsheet from './app/components/bottomsheet/MBMainBottomsheet';
import { useAppHooks } from './app/AppHooks';
import { NeutralColors, PrimaryColors } from './app/common/colors/Colors';

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
import { UserHomeStoreSignupView } from './app/views/userhome/UserHomeNavigation';
import { StyleSheet, View } from 'react-native';
import MBFloatingCartBtn from './app/components/buttons/MBFloatingCartBtn';
import { useState } from 'react';

const Tab = createBottomTabNavigator<MainTabParamList>();
const RootStack = createNativeStackNavigator<RootStackParamList>();

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
  'NotificationsView',
  'UserSignupView',
] as const;

function MainTabs() {
  const mainColor = PrimaryColors.primary;
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
      height: 60,
      elevation: 0,
      borderTopWidth: 0,
      shadowOpacity: 0,
    },
    headerShown: false,
  };

  const tabScreenOptions = {
    tabBarInactiveTintColor: 'gray',
    tabBarActiveTintColor: mainColor,
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
                const iconColor = isMinhaLojaDisabled ? '#9CA3AF' : color;

                return <IconComponent width={20} height={20} stroke={iconColor} strokeColor={iconColor} />;
              },
              tabBarButton: (props: any) => {
                const isMinhaLojaDisabled = screen.name === 'minha loja' && !hasRegisteredStore;

                return tabBarButton({
                  ...props,
                  style: [props.style, isMinhaLojaDisabled ? styles.disabledTabButton : null],
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
        <RootStack.Screen name="ProductDetailView" component={ProductDetailView} />
        <RootStack.Screen name="UserHomeStoreSignupView" component={UserHomeStoreSignupView} />
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
    bottom: 68, 
    zIndex: 100, 
    alignItems: 'center', 
    justifyContent: 'center',
  },
  disabledTabButton: {
    opacity: 0.35,
    backgroundColor: PrimaryColors.primaryLight,
    borderRadius: 8,
    margin: 4,
    padding: 4,
    top: -4
  },
});