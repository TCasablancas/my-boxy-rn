import { View, StyleSheet, StatusBar, FlatList, Image, Pressable, Text, Animated } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import MBTitledViewHeader from '../../components/header/MBTitledViewHeader';
import MBRoundedIconBtn from '../../components/buttons/MBRoundedIconBtn';
import { NeutralColors, PrimaryColors } from '../../common/colors/Colors';
import MBHomeProductCard from '../../components/cards/MBMainProductCard';
import { IconsActions } from '../../common/icons/IconsActions';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import UserFavoritesTabs from './UserFavoritesTabs';
import UserFavoritesBottomsheet from './UserFavoritesBottomsheet';
import { useUserFavoritesViewModel } from './UserFavoritesViewModel';
import { FavoritesTabKey } from './UserFavoritesModel';
import MBFavoriteIconBtn from '../../components/buttons/MBFavoriteIconBtn';

export default function UserFavoritesView() {
  const {
    activeTab,
    selectedFilterId,
    isFilterBottomsheetVisible,
    productCards,
    storeCards,
    filterOptions,
    changeTab,
    openFilterBottomsheet,
    closeFilterBottomsheet,
    setSelectedFilterId,
  } = useUserFavoritesViewModel();

  const [renderedTab, setRenderedTab] = useState<FavoritesTabKey>(activeTab);
  const tabOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (activeTab === renderedTab) {
      return;
    }

    Animated.timing(tabOpacity, {
      toValue: 0,
      duration: 130,
      useNativeDriver: true,
    }).start(() => {
      setRenderedTab(activeTab);
      Animated.timing(tabOpacity, {
        toValue: 1,
        duration: 180,
        useNativeDriver: true,
      }).start();
    });
  }, [activeTab, renderedTab, tabOpacity]);

  const [columns, setColumns] = useState(2);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor={NeutralColors.backgroundAlt} translucent={true} />
      <View style={styles.container}>
        <View style={styles.contentWrapper}>
          <MBTitledViewHeader 
            title="Curtidos"
            btnsRight={<MBRoundedIconBtn 
              icon={<IconsActions.filter width={16} height={16} strokeColor={NeutralColors.textSecondary} />} 
              onPress={openFilterBottomsheet}
            />}
          />
          <UserFavoritesTabs activeTab={activeTab} onChangeTab={changeTab} />
          <View style={styles.listWrapper}>
            <Animated.View style={[styles.tabAnimatedContent, { opacity: tabOpacity }]}> 
              {renderedTab === 'products' ? (
                <View>
                  <FlatList
                    key={columns}
                    data={productCards}
                    numColumns={columns}
                    renderItem={({ item }) => (
                      <MBHomeProductCard product={item} />
                    )}
                    keyExtractor={(item) => item.productId}
                    style={styles.flatList}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listContainer}
                    ListEmptyComponent={<Text style={styles.emptyText}>Nenhum produto curtido.</Text>}
                  />
                </View>
              ) : (
                <View>
                  <FlatList
                    data={storeCards}
                    keyExtractor={(item) => item.storeId}
                    numColumns={2}
                    style={styles.flatList}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.storeListContainer}
                    renderItem={({ item }) => (
                      <Pressable style={styles.storeCard} onPress={item.onPress}>
                        <View style={styles.storeInfo}>
                          <View style={styles.storeImageWrapper}>
                            <Image source={{ uri: item.storeImageUri }} style={styles.storeImage} />
                          </View>
                          <Text style={styles.storeName}>{item.storeName}</Text>
                          <Text style={styles.storeMeta}>{item.productsCount} produtos curtidos</Text>
                        </View>
                        {/* <MBFavoriteIconBtn /> */}
                      </Pressable>
                    )}
                    ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma loja curtida.</Text>}
                  />
                </View>
              )}
            </Animated.View>
          </View>
        </View>
      </View>
      <UserFavoritesBottomsheet
        visible={isFilterBottomsheetVisible}
        activeTab={activeTab}
        selectedFilterId={selectedFilterId}
        options={filterOptions}
        onSelectFilter={setSelectedFilterId}
        onClose={closeFilterBottomsheet}
      />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: NeutralColors.backgroundAlt,
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 16,
    flexDirection: 'column',
  },
  listWrapper: {
    flex: 1,
    // marginBottom: 42,
    // paddingBottom: 16,
    borderRadius: 16,
    // padding: 8,
  },
  tabAnimatedContent: {
    flex: 1,
  },
  flatList: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  listContainer: {
    gap: 8,
  },
  storeListContainer: {
    width: '100%',
    gap: 16,
    paddingTop: 8,
    paddingBottom: 20,
    paddingHorizontal: 8,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 32,
    fontFamily: 'SFMonoRegular',
    letterSpacing: -0.5,
    color: NeutralColors.textSecondary,
  },
  storeCard: {
    flex: 1,  
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    boxShadow: '0px 1px 12px rgba(0, 0, 0, 0.1)',
  },
  storeImageWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#E5E7EB',
  },
  storeImage: {
    width: '100%',
    height: '100%',
  },
  storeInfo: {
    flex: 1,
    marginLeft: 10,
  },
  storeName: {
    fontSize: 16,
    fontFamily: 'SFMonoBold',
    letterSpacing: -0.5,
    color: '#1F2937',
  },
  storeMeta: {
    marginTop: 2,
    fontSize: 12,
    fontFamily: 'SFMonoRegular',
    letterSpacing: -0.5,
    color: NeutralColors.textSecondary,
  },
  storeStatus: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: PrimaryColors.primary,
  },
  storeStatusOff: {
    backgroundColor: '#9CA3AF',
  },
});