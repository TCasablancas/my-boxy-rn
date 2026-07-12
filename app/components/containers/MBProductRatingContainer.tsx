import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icons } from '../../common/icons/Icons';

export default function MBProductRatingContainer({
  rating,
  reviewCount,
  onPressViewReviews,
}: {
  rating: number;
  reviewCount: number;
  onPressViewReviews?: () => void;
}) {
  return (
    <View style={styles.container}>
      <Icons.star width={16} height={16} fillColor="#FFD700" />
      <Text style={styles.reviewCountText}>{reviewCount}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  reviewCountText: {
    fontSize: 14,
    fontFamily: 'SNPro-Regular',
    color: '#007BFF',
    marginLeft: 2,
  },
});