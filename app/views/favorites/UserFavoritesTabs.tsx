import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { NeutralColors, PrimaryColors } from '../../common/colors/Colors';
import { FavoritesTabKey } from './UserFavoritesModel';

interface UserFavoritesTabsProps {
  activeTab: FavoritesTabKey;
  onChangeTab: (tab: FavoritesTabKey) => void;
}

export default function UserFavoritesTabs({ activeTab, onChangeTab }: UserFavoritesTabsProps) {
  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.tabBtn, activeTab === 'products' && styles.activeTabBtn]}
        onPress={() => onChangeTab('products')}
      >
        <Text style={[styles.tabLabel, activeTab === 'products' && styles.activeTabLabel]}>Produtos</Text>
      </Pressable>
      <Pressable
        style={[styles.tabBtn, activeTab === 'stores' && styles.activeTabBtn]}
        onPress={() => onChangeTab('stores')}
      >
        <Text style={[styles.tabLabel, activeTab === 'stores' && styles.activeTabLabel]}>Lojas</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  tabBtn: {
    flex: 1,
    borderRadius: 10,
  },
  activeTabBtn: {
  },
  tabLabel: {
    width: '100%',
    fontSize: 24,
    fontFamily: 'SNPro-ExtraLight',
    color: NeutralColors.textPlaceholder,
    textAlign: 'left',
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  activeTabLabel: {
    color: PrimaryColors.primary,
    fontFamily: 'SNPro-Bold',
  },
});
