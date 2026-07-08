import { View, StyleSheet, Text, Image } from 'react-native';
import MBStoreProductHeader from '../header/MBStoreProductHeader';
import { IconsNavigation } from '../../common/constants/IconsNavigation';
import { IconsActions } from '../../common/constants/IconsActions';
import { Icons } from '../../common/constants/Icons';

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
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>
            <Text style={styles.currency}>R$</Text>
            {item.price.toFixed(2)}
          </Text>
        </View>
        <View style={styles.bottomRow}>
          <MBStoreProductHeader />
          <View style={styles.status} />
        </View>
      </View>
      <View style={styles.actionsWrapper}>
        <View style={styles.squareButtonContainer}>
          <IconsNavigation.moreVertical width={16} height={16} />
        </View>
        <View style={styles.squareButtonContainer}>
          <Icons.star width={16} height={16} stroke='black' />
        </View>
        <View style={styles.squareButtonContainer}>
          <IconsActions.trash width={16} height={16} />
        </View>
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
    backgroundColor: '#F0E5E4',
    borderRadius: 8,
    padding: 8,
    justifyContent: 'space-around',
  },
  cardImage: {
    width: 100,
    height: 100,
    backgroundColor: '#d3d3d3',
    borderRadius: 8,
    overflow: 'hidden',
  },
  textsWrapper: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 4,
  },
  itemName: {
    fontSize: 12,
    fontFamily: 'SNPro-Regular',
  },
  itemPrice: {
    fontSize: 18,
    color: '#888',
    fontFamily: 'SNPro-Bold',
    lineHeight: 16,
  },
  currency: {
    fontSize: 12,
    color: '#888',
    fontFamily: 'SNPro-Bold',
    marginRight: 4,
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
    fontFamily: 'SNPro-Bold',
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
});