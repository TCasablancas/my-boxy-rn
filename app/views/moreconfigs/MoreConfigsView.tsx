import { useMemo } from 'react';
import { View, StyleSheet, ScrollView, Pressable, StatusBar } from 'react-native';
import MBTitledViewHeader from '../../components/header/MBTitledViewHeader';
import MBMenuNestedList from '../../components/navigation/MBMenuNestedList';
import MainNavigation from '../../common/navigation/MainNavigation';
import { nestedListItems } from './../../common/MoreConfigsData';
import MBHeaderUserConfig from '../../components/header/MBHeaderUserConfig';
import { IconsActions } from '../../common/icons/IconsActions';
import MBRoundedIconBtn from '../../components/buttons/MBRoundedIconBtn';
import MBIconInfoContainer from '../../components/containers/MBIconInfoContainer';
import { Icons } from '../../common/icons/Icons';
import MBMainBtn from '../../components/buttons/MBMainBtn';
import { NeutralColors } from '../../common/colors/Colors';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function MoreConfigsView() {
  const menuItemPathById = useMemo(() => {
    return nestedListItems
      .flatMap((nestedList) => nestedList.items)
      .reduce<Record<string, string>>((acc, item) => {
        acc[item.id] = item.path;
        return acc;
      }, {});
  }, []);

  function handleNavigateFromMenu(itemId: string) {
    const targetPath = menuItemPathById[itemId];
    if (!targetPath) return;
    MainNavigation.push(targetPath);
  }

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={'dark-content'} backgroundColor={NeutralColors.backgroundAlt} translucent={true} />
      <View style={styles.container}>
        <ScrollView style={styles.contentWrapper}>
          <MBTitledViewHeader title="Configurações" />
          <View style={styles.listWrapper}>
            <View style={styles.headerWrapper}>
              <MBHeaderUserConfig 
                userName="Thiago Silva"
                userAlias="thyagoacsilva"
                userImageUrl="https://static.wikia.nocookie.net/herois/images/c/c4/MPSS_Mario.webp/revision/latest/thumbnail/width/360/height/360?cb=20220607201508&path-prefix=pt-br"
              />
              <View style={styles.editBtnWrapper}>
                <MBRoundedIconBtn 
                  icon={<IconsActions.edit width={16} height={16} strokeColor="#000" />} 
                  backgroundColor="white"
                  onPress={() => MainNavigation.push('UserProfileView')} 
                />
              </View>
            </View>
            <View style={styles.boxContentWrapper}>
              <MBIconInfoContainer 
                icon={<Icons.store width={26} height={26} strokeColor="#EDB20E" />} 
                title={'187'} 
                description="lojas seguidas"
                onPressItem={(itemId) => {}} 
              />
              <MBIconInfoContainer 
                icon={<Icons.shoppingBag width={26} height={26} strokeColor="#EDB20E" />} 
                title={'45'} 
                description="compras realizadas"
                onPressItem={(itemId) => {}} 
              />
            </View>
            {nestedListItems.map((nestedList) => (
              <>
                <MBMenuNestedList 
                  key={nestedList.id}
                  title={nestedList.label}
                  items={nestedList.items}
                  onPress={handleNavigateFromMenu}
                />
                {nestedList.items.length-1  && <View style={{ marginBottom: 16 }} />}
              </>
            ))}
            <MBMainBtn title="Sair" onPress={() => {}} />
          </View>
        </ScrollView>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: NeutralColors.backgroundAlt,
    backgroundColor: 'white',
  },
  contentWrapper: {
    flex: 1,
    height: '100%',
    width: '100%',
    padding: 16,
    gap: 8,
  },
  headerWrapper: {
    marginBottom: 16,
  },
  listWrapper: {
    marginVertical: 16,
    borderRadius: 12,
  },
  editBtnWrapper: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  boxContentWrapper: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    gap: 16, 
    marginBottom: 16,
  },
});