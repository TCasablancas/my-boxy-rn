import { useEffect, useState } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SplashScreen from 'react-native-splash-screen';
import { PlatformPressable } from '@react-navigation/elements';
import { NeutralColors, PrimaryColors } from '../../common/colors/Colors';
import MBFloatingCartBtn from '../../components/buttons/MBFloatingCartBtn';
import MainNavigation from '../../common/navigation/MainNavigation';
import { MainTabParamList } from '../../navigation/types';
import { useCartStore } from '../../common/store/cartStore';

import MBMainBottomsheet from '../../components/bottomsheet/MBMainBottomsheet';

import CartView from '../cart/CartView';
import useEntryTabViewModel from './EntryTabViewModel';

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function EntryTabView() {

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
  } = useEntryTabViewModel();
  const [activeTabName, setActiveTabName] = useState<string>('início');
  const selectedItemsCount = useCartStore((snapshot) => snapshot.selectedIds.length);

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
    tabBarInactiveTintColor: NeutralColors.textPlaceholder,
    tabBarActiveTintColor: PrimaryColors.primary,
    tabBarLabelStyle: {
      fontSize: 11,
      fontFamily: 'SNPro-Regular',
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
          <MBFloatingCartBtn
            items={selectedItemsCount}
            onPress={() => { MainNavigation.push(CartView); }}
          />
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
                return <IconComponent width={20} height={20} stroke={color} strokeColor={color} />;
              },
              tabBarButton: (props: any) => {
                const isMinhaLojaDisabled = screen.name === 'minha loja' && !hasRegisteredStore;
                return tabBarButton({
                  ...props,
                  style: [
                    props.style, 
                    { opacity: isMinhaLojaDisabled ? 0.35 : 1 },
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
        contentBgNull
      />
    </>
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
});