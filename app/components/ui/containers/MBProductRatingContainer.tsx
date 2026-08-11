import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icons } from '../../../common/icons/Icons';
import { PrimaryColors } from '../../../common/colors/Colors';

interface MBProductRatingContainerProps {
  reviewCount: number;
  background?: boolean;
  onPressViewReviews?: () => void;
}

export default function MBProductRatingContainer({
  reviewCount, background, onPressViewReviews,
}: MBProductRatingContainerProps) {
  return (
    <View style={[styles.container, background && { backgroundColor: 'white' }]}>
      <Icons.star width={16} height={16} fillColor={PrimaryColors.gold} />
      <Text style={styles.reviewCountText}>{reviewCount}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingHorizontal: 16,
    backgroundColor: 'white',
    paddingRight: 8,
    paddingLeft: 4,
    borderRadius: 100,
  },
  reviewCountText: {
    fontSize: 12,
    // fontFamily: 'SFMonoRegular',
    fontWeight: 'bold',
    color: '#007BFF',
    marginLeft: 2,
  },
});