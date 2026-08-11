import { View, Text, StyleSheet } from 'react-native';
import MBTitleWithLinkRight from '../../components/ui/header/MBTitleWithLinkRight';
import { Icons } from '../../common/icons/Icons';

interface ProductRatingSectionProps {
  rating: number;
}

export default function ProductRatingSection({ 
  rating 
}: ProductRatingSectionProps) {
  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <MBTitleWithLinkRight
          title="Avaliações" 
          linkText="Ver todas" 
          icon={<Icons.arrowUpRight width={16} height={16} color="#007AFF" /> }
          onLinkPress={() => {}}
        />
      </View>
      <View style={styles.bodyWrapper}>
        <View style={styles.ratingWrapper}> 
          <Icons.star width={26} height={26} fillColor="#FFD700" />
          <Text style={styles.ratingText}>{rating}</Text>
        </View>
        <View style={styles.ratingQtyWrapper}>
          <Text style={styles.ratingQtyText}>1.234 avaliações</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bodyWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
  },
  ratingText: {
    fontSize: 24,
    fontFamily: 'SFMonoBold',
    letterSpacing: -0.5,
    color: '#000',
    marginLeft: 4,
  },
  ratingWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingQtyWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  ratingQtyText: {
    fontSize: 14,
    fontFamily: 'SFMonoRegular',
    letterSpacing: -0.5,
    color: '#000',
  },
});