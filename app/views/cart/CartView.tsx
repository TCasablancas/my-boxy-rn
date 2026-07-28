import { StyleSheet, View, Text, Platform, Pressable, FlatList } from 'react-native';
import EmptyViewSection from '../../sections/empty/EmptyViewSection';
import { NeutralColors, PrimaryColors } from '../../common/colors/Colors';
import SafeAreaView from '../../sections/global/SafeAreaView';
import { Icons } from '../../common/icons/Icons';
import { spacing } from '../../common/constants/Sizes';

import MBTitledViewHeader from '../../components/header/MBTitledViewHeader';
import MBRoundedIconBtn from '../../components/buttons/MBRoundedIconBtn';
import MainNavigation from '../../common/navigation/MainNavigation';
import MBMainBtn from '../../components/buttons/MBMainBtn';
import ProductOnCartSection from '../../sections/product/ProductOnCartSection';
import MBCartAmmountDescLbl from '../../components/labels/MBCartAmmountDescLbl';
import MBMainSelector from '../../components/selectors/MBMainSelector';

import useCartViewModel from './CartViewModel';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IconsActions } from '../../common/icons/IconsActions';

export default function CartView() {
  const safeAreaInsets = useSafeAreaInsets();
  const {
    cartItems,
    selectedIds,
    toggleSelect,
    isAllItemsSelected,
    toggleSelectAllItems,
    removeItemFromCart,
    removeSelectedItemsFromCart,
    toggleDisplayBottomInfo,
    setToggleDisplayBottomInfo,
    bottomContainerHeight,
    handleBottomContainerHeight,
  } = useCartViewModel();

  // REMOVER
    const emptyCartImage = 'https://cdn3d.iconscout.com/3d/premium/thumb/empty-shopping-basket-3d-icon-png-download-10058965.png';

  const emptyCartView = () => {
    return (
      <View style={[
        styles.emptyCartWrapper, 
        { marginBottom: Platform.OS === 'ios' ? safeAreaInsets.bottom + 40 : safeAreaInsets.bottom + 16 }
      ]}>
        <EmptyViewSection
          title="Seu carrinho está vazio"
          description="Explore as lojas que oferecem produtos incríveis para adicionar ao seu carrinho."
          imageSource={emptyCartImage}
        />
        <MBMainBtn
          title="Explorar Lojas"
          onPress={() => { MainNavigation.pop(); }}
        />
      </View>
    );
  };

  return (
    <SafeAreaView children={
      <>
        <MBTitledViewHeader 
          title="Carrinho de Compras"
          btnsLeft={<MBRoundedIconBtn 
            icon={<Icons.arrowBack width={16} height={16} strokeColor={NeutralColors.textSecondary} />} 
            onPress={() => { MainNavigation.pop(); }}
          />}
          btnsRight={<MBRoundedIconBtn 
            icon={<Icons.ticketPercent width={16} height={16} strokeColor={NeutralColors.textSecondary} />} 
            onPress={() => {}}
          />}
        />
        {cartItems.length > 0 && (
          <Pressable style={styles.selectAllWrapper} onPress={toggleSelectAllItems}>
            <MBMainSelector
              value={isAllItemsSelected ? 'on' : 'off'}
              onChange={toggleSelectAllItems}
            />
            <Text style={styles.selectAllLabel}>Selecionar todos</Text>
          </Pressable>
        )}
        <View style={{ marginBottom: bottomContainerHeight + 100 }}>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.product_id}
            ItemSeparatorComponent={
              <View style={{height: 2, width: '100%', backgroundColor: 'white'}} />
            }
            renderItem={({ item }) => (
              <ProductOnCartSection
                product={item}
                isItemSelected={selectedIds.includes(item.product_id)}
                onItemSelectedChange={() => { toggleSelect(item.product_id); }}
                onQuantityChange={(quantity) => { console.log(`Item ${item.product_id} quantity changed to ${quantity}`) }}
                onRemoveItem={() => { removeItemFromCart(item.product_id); }}
              />
            )}
            extraData={selectedIds}
            ListEmptyComponent={emptyCartView}
            contentContainerStyle={styles.container}
          />
        </View>
        {cartItems.length > 0 && (
          <View style={styles.bottomItemsContainer} onLayout={handleBottomContainerHeight}>
            <Pressable 
              style= {styles.toggleItemsBtn}
              onPress={() => { setToggleDisplayBottomInfo(!toggleDisplayBottomInfo) }}
            >
              {
                toggleDisplayBottomInfo ?
                <Icons.chevronDown width={16} height={16} strokeColor={NeutralColors.textSecondary} /> :
                <Icons.chevronUp width={16} height={16} strokeColor={NeutralColors.textSecondary} />
              }
            </Pressable>
            <View style={{ marginBottom: 16 }}>
              <View style={{ display: toggleDisplayBottomInfo ? 'flex' : 'none'}}>
                <MBCartAmmountDescLbl label="Subtotal" amount="350,00" size="medium" />
                <MBCartAmmountDescLbl label="Desconto" amount="0,00" size="medium" />
                <MBCartAmmountDescLbl label="Taxas" amount="0,00" size="medium" />
              </View>
              <MBCartAmmountDescLbl 
                label="Total" amount="350,00" size="large" isLast />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: spacing.md }}>
              <MBMainBtn
                title="Finalizar Compra"
                flex={1}
                onPress={() => { removeSelectedItemsFromCart(); }}
              />
              <MBRoundedIconBtn 
                backgroundColor={PrimaryColors.mainRed}
                icon={<IconsActions.trash width={16} height={16} strokeColor={'white'} />} 
                onPress={() => { removeSelectedItemsFromCart(); }} 
              />
            </View>
          </View>
        )}
      </>
    } />
  );
}

const styles = StyleSheet.create({
  emptyCartWrapper: { 
    flex: 1, 
    paddingHorizontal: spacing.md, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  container: {
    rowGap: 12,
    justifyContent: 'flex-start',
    height: '100%',
    paddingTop: spacing.md,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  bottomItemsContainer: {
    position: 'absolute',
    bottom: 0,
    paddingBottom: Platform.OS === 'ios' ? 40 : 16,
    left: 0,
    right: 0,
    padding: spacing.md,
    backgroundColor: '#fff',
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    shadowColor: '#000',
  },
  toggleItemsBtn: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectAllWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xs,
    height: 50,
    backgroundColor: 'white',
  },
  selectAllLabel: {
    fontSize: 14,
    fontFamily: 'SNPro-Regular',
    color: NeutralColors.text,
  },
});