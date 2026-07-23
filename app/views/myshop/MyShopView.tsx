import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { IconsActions } from '../../common/icons/IconsActions';
import { NeutralColors, PrimaryColors } from '../../common/colors/Colors';
import { ShopItemProps } from './MyShopModel';
import { Icons } from '../../common/icons/Icons';
import SafeAreaView from '../../sections/global/SafeAreaView';
import { formatDate } from '../../common/constants/DateFormatter';

import MBIconInfoContainer from '../../components/containers/MBIconInfoContainer';
import MBTitledViewHeader from '../../components/header/MBTitledViewHeader';
import MBRoundedIconBtn from '../../components/buttons/MBRoundedIconBtn';

// -->> REMOVER
import { myShopsData } from '../../common/MyShopsData';
import MBStatusDot from '../../components/global/MBStatusDot';
// <<--

export default function MyShopView() {
  // -->> REMOVER
  const products = myShopsData.map((shop) => ({
    shop_item_id: shop.shop_item_id,
    name: shop.name,
    price: shop.price,
    shop_date: shop.shop_date,
    status: shop.status,
  }));
  // <<--

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
            <TouchableOpacity style={[
              productItemStyles.productItem, { borderBottomWidth: 3 }
            ]}>
              <View style={productItemStyles.iconWrapper}>
                <MBStatusDot status={item.status} style={productItemStyles.statusDotPosition} />
                <MBIconInfoContainer 
                  icon={<Icons.badgeCheck width={16} height={16} strokeColor={NeutralColors.textSecondary} />} 
                />
              </View>
              <View style={productItemStyles.productInformationWrapper}>
                <View>
                  <Text style={productItemStyles.productName} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text style={productItemStyles.productShopDate}>
                    {formatDate(item.shop_date)}
                  </Text>
                </View>
                <Text style={productItemStyles.productPrice}>{item.price}</Text>
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
    fontSize: 13,
    fontFamily: 'SNPro-Light',
    textAlign: 'left',
  },
  productPrice: {
    fontSize: 13,
    fontFamily: 'SNPro-Bold',
    color: '#888',
  },
  productShopDate: {
    fontSize: 12,
    fontFamily: 'SNPro-Light',
    color: '#888',
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