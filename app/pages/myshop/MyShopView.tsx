import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { IconsActions } from '../../common/icons/IconsActions';
import { NeutralColors, PrimaryColors } from '../../common/colors/Colors';
import { ShopItemProps } from './MyShopModel';
import { Icons } from '../../common/icons/Icons';
import SafeAreaView from '../../components/sections/global/SafeAreaView';
import { formatDate } from '../../common/constants/DateFormatter';

import MBIconInfoContainer from '../../components/ui/containers/MBIconInfoContainer';
import MBTitledViewHeader from '../../components/ui/header/MBTitledViewHeader';
import MBRoundedIconBtn from '../../components/ui/buttons/MBRoundedIconBtn';

import MBStatusDot from '../../components/ui/global/MBStatusDot';
import { getMyShopViewModel } from './MyShopViewModel';
import { Fonts } from '../../common/constants/Fonts';

export default function MyShopView() {
  const { products } = getMyShopViewModel();
  
  return (
    <SafeAreaView children={
      <View style={styles.container}>
        <MBTitledViewHeader 
          title="Minhas Compras"
          btnsRight={<MBRoundedIconBtn 
            icon={<IconsActions.filter width={16} height={16} strokeColor={NeutralColors.textSecondary} />} 
            onPress={() => {}}
          />}
        />
        <FlatList<ShopItemProps>
          data={products}
          style={styles.flatlistWrapper}
          keyExtractor={(item) => item.shop_item_id}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={[ productItemStyles.productItem, { borderBottomWidth: 3 } ]}
              onPress={() => {}}
            >
              <View style={productItemStyles.iconWrapper}>
                <MBStatusDot status={item.status} style={productItemStyles.statusDotPosition} />
                <MBIconInfoContainer 
                  icon={<Icons.badgeCheck width={16} height={16} strokeColor={NeutralColors.textSecondary} />} 
                  size={40}
                />
              </View>
              <View style={productItemStyles.productInformationWrapper}>
                <View>
                  <Text style={productItemStyles.productName} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text style={productItemStyles.productShopDate}>
                    {formatDate(item.shop_date)} • <Text style={productItemStyles.productPrice}>{item.price}</Text>
                  </Text>
                </View>
                <View style={{ gap: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                  <MBRoundedIconBtn 
                    icon={<Icons.star width={16} height={16} strokeColor={NeutralColors.textSecondary} />} 
                    onPress={() => {}}
                  />
                  <MBRoundedIconBtn 
                    icon={<Icons.cart width={16} height={16} strokeColor={NeutralColors.textSecondary} />} 
                    onPress={() => {}}
                  />
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    } />
  );
}

const productItemStyles = StyleSheet.create({
  productItem: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomColor: NeutralColors.backgroundAlt,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconWrapper: {
    width: 40, 
    height: 40,
  },
  productInformationWrapper: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    flex: 1, 
    marginLeft: 8,
  },
  statusDotPosition: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 100,
  },
  productName: {
    ...Fonts.light13,
    textAlign: 'left',
  },
  productPrice: {
    ...Fonts.bold12,
    color: PrimaryColors.mainBlue,
  },
  productShopDate: {
    ...Fonts.light12,
    color: NeutralColors.textSecondary,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: NeutralColors.backgroundAlt,
  },
  flatlistWrapper: { 
    backgroundColor: 'white', 
    borderRadius: 16,
    paddingBottom: 46,
  }
});