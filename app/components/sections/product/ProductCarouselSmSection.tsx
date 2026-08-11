import { View, StyleSheet, Text, ScrollView } from 'react-native';
import MBTitleWithLinkRight from '../../ui/header/MBTitleWithLinkRight';
import { Icons } from '../../../common/icons/Icons';

interface ProductCarouselSmSectionProps {
  title?: string;
  products?: { id: string; imageUri: string }[];
}

export default function ProductCarouselSmSection({
  title, products = [],
}: ProductCarouselSmSectionProps) {
  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <MBTitleWithLinkRight
          title={title || "Produtos Relacionados"}
          linkText="Ver mais" 
          icon={<Icons.arrowUpRight width={16} height={16} color="#007AFF" /> }
          onLinkPress={() => {}}
        />
      </View>
      <View style={styles.carouselWrapper}>
        <ScrollView>
          {products.map((product) => (
            <View key={product.id} style={{ marginBottom: 8 }}>
              <Text>{product.id}</Text>
              <Text>{product.imageUri}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerWrapper: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselWrapper: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
});