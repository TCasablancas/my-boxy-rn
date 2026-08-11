import { View, StyleSheet, Text, Image } from 'react-native';
import MBStoreProductHeader from '../header/MBStoreProductHeader';
import { IconsNavigation } from '../../../common/icons/IconsNavigation';
import { IconsActions } from '../../../common/icons/IconsActions';
import { Icons } from '../../../common/icons/Icons';
import { NeutralColors, PrimaryColors } from '../../../common/colors/Colors';
import MBFavoriteBtn from '../buttons/MBFavoriteBtn';

interface MBUserFavoriteCardProps {
  item: {
    id: string;
    itemPic: string;
    name: string;
    price: number;
  };
}

export default function MBUserFavoriteCard({
  item
}: MBUserFavoriteCardProps) {
  return (
    <View style={styles.cardWrapper}>
      <View style={styles.cardImage}>
        <Image source={{ uri: item.itemPic }} style={{ width: '100%', height: '100%' }} />
      </View>
      <View style={styles.cardContainer}>
        <View style={styles.textsWrapper}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
            <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
            <MBFavoriteBtn />
          </View>
          <Text style={styles.itemPrice}>
            <Text style={styles.currency}>R$</Text>
            {item.price.toFixed(2)}
          </Text>
        </View>
        <View style={styles.bottomRow}>
          {/* <MBStoreProductHeader /> */}
          <View style={styles.storeNameWrapper}>
            <Text style={{ fontSize: 12, color: NeutralColors.textSecondary }}>Por</Text>
            <Text style={styles.storeName}>Loja de Plantas</Text>
          </View>
          <View style={styles.status} />
        </View>
      </View>
      <View style={styles.actionsWrapper}>
        {/* <View style={styles.squareButtonContainer}>
          <IconsNavigation.moreVertical width={16} height={16} />
        </View>
        <View style={styles.squareButtonContainer}>
          <Icons.star width={16} height={16} stroke='black' />
        </View>
        <View style={styles.squareButtonContainer}>
          <IconsActions.trash width={16} height={16} />
        </View> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    flexDirection: 'row',
    marginBottom: 8,
    gap: 8,
  },
  cardContainer: {
    flex: 1,
    height: 100,
    marginLeft: 4,
    // backgroundColor: NeutralColors.background,
    borderRadius: 16,
    // paddingVertical: 8,
    // paddingHorizontal: 12,
    justifyContent: 'space-around',
  },
  cardImage: {
    width: 100,
    height: 100,
    backgroundColor: NeutralColors.background,
    borderRadius: 16,
    overflow: 'hidden',
  },
  textsWrapper: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 4,
  },
  itemName: {
    fontSize: 14,
    fontFamily: 'SFMonoRegular',
    letterSpacing: -0.5,
    color: NeutralColors.textSecondary,
    lineHeight: 16,
  },
  itemPrice: {
    fontSize: 20,
    color: PrimaryColors.primary,
    fontFamily: 'SFMonoBold',
    letterSpacing: -0.5,
    lineHeight: 24,
  },
  currency: {
    fontSize: 11,
    color: NeutralColors.textSecondary,
    fontFamily: 'SFMonoRegular',
    letterSpacing: -0.5,
  },
  actionsWrapper: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  squareButtonContainer: {
    width: 30,
    height: 30,
    backgroundColor: '#F0E5E4',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  squareButtonText: {
    fontSize: 18,
    fontFamily: 'SFMonoBold',
    letterSpacing: -0.5,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 26,
  },
  status: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'green',
    position: 'absolute',
    top: 8,
    right: 8,
  },
  storeNameWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  storeName: {
    fontSize: 12,
    fontFamily: 'SFMonoBold',
    letterSpacing: -0.5,
    color: NeutralColors.textSecondary,
  },
});