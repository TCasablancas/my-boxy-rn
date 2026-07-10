import { useMemo } from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import MBTitledViewHeader from '../../components/header/MBTitledViewHeader';
import MBMenuNestedList from '../../components/navigation/MBMenuNestedList';
import MainNavigation from '../../common/navigation/MainNavigation';
import { nestedListItems } from './../../common/MoreConfigsData';
import MBHeaderUserConfig from '../../components/header/MBHeaderUserConfig';
import { IconsActions } from '../../common/icons/IconsActions';
import MBRoundedIconBtn from '../../components/buttons/MBRoundedIconBtn';

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
    <View style={styles.container}>
      <ScrollView style={styles.contentWrapper}>
        <MBTitledViewHeader title="Configurações" />
        <View style={styles.listWrapper}>
            <MBHeaderUserConfig />
            <View style={styles.editBtnWrapper}>
              <MBRoundedIconBtn 
                icon={<IconsActions.edit width={16} height={16} strokeColor="#000" />} 
                backgroundColor="white"
                onPress={() => MainNavigation.push('UserProfileView')} 
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
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentWrapper: {
    flex: 1,
    height: '100%',
    width: '100%',
    gap: 8,
    padding: 16,
    marginBottom: 8,
  },
  listWrapper: {
    marginTop: 16,
    gap: 16,
    borderRadius: 12,
  },
  editBtnWrapper: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
});