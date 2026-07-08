import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PlatformPressable } from '@react-navigation/elements';
import { PrimaryColors } from './app/common/colors/Colors';
import { Icons } from './app/common/constants/Icons';
import { IconsCommunication } from './app/common/constants/IconsCommunication';
import { IconsActions } from './app/common/constants/IconsActions';
import { MainTabParamList, RootStackParamList } from './app/navigation/types';

import UserHomeView from './app/views/userhome/UserHomeView';
import UserFavoritesView from './app/views/favorites/UserFavoritesView';
import MoreConfigsView from './app/views/moreconfigs/MoreConfigsView';
import UserProfileView from './app/views/userprofile/UserProfileView';
import MoreConfigsPlaceholderView from './app/views/moreconfigs/MoreConfigsPlaceholderView';

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
] as const;

function MainTabs() {
  const backgroundColor = '#F0E5E4';
  const mainColor = PrimaryColors.primary;

  const screenArrData = [
    { name: 'início' as const, component: UserHomeView, icon: Icons.home },
    { name: 'curtidos' as const, component: UserFavoritesView, icon: Icons.heart },
    { name: 'carteira' as const, component: UserHomeView, icon: Icons.wallet },
    { name: 'notificações' as const, component: UserHomeView, icon: IconsCommunication.notification },
    { name: 'mais' as const, component: MoreConfigsView, icon: IconsActions.squareFour },
  ];

  const screenOptions = {
    tabBarStyle: {
      backgroundColor: backgroundColor,
      height: 60,
      paddingBottom: 8,
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
    />
  );

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      {screenArrData.map((screen, index) => (
        <Tab.Screen
          key={index}
          name={screen.name}
          component={screen.component}
          options={{
            ...tabScreenOptions,
            tabBarIcon: ({ color }) => {
              const IconComponent = screen.icon;
              return <IconComponent width={20} height={20} stroke={color} strokeColor={color} />;
            },
            tabBarButton,
          }}
        />
      ))}
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="MainTabs" component={MainTabs} />
        <RootStack.Screen name="UserProfileView" component={UserProfileView} />
        {MORE_CONFIG_PATHS.filter((path) => path !== 'UserProfileView').map((path) => (
          <RootStack.Screen key={path} name={path} component={MoreConfigsPlaceholderView} />
        ))}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%', 
    height: '100%', 
    alignItems: 'center',
    justifyContent: 'center',
  },
});