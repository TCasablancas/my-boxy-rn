import { useMemo } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import MBTitledViewHeader from '../../components/header/MBTitledViewHeader';
import MBRoundedIconBtn from '../../components/buttons/MBRoundedIconBtn';
import { Icons } from '../../common/constants/Icons';
import MBMenuNestedList from '../../components/navigation/MBMenuNestedList';
import MainNavigation from '../../common/navigation/MainNavigation';

import { nestedListItems } from './../../common/MoreConfigsData';

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
        <MBTitledViewHeader 
          title="Configurações"
          // btnsRight={<MBRoundedIconBtn 
          //   icon={<Icons.barcode width={16} height={16} />} 
          //   onPress={() => {}}
          // />}
        />
        <View style={styles.listWrapper}>
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
    backgroundColor: '#F0E5E4',
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
    padding: 16,
    gap: 16,
    borderRadius: 12,
  },
});