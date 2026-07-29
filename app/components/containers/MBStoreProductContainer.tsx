import { View, StyleSheet, Text, Image } from 'react-native';

interface MBStoreProductContainerProps {
  storeImageUri: string;
  storeName: string;
  background?: boolean;
}

export default function MBStoreProductContainer({
  storeImageUri, storeName, background
}: MBStoreProductContainerProps) { 
  return (
    <View style={[styles.nameImageWrapper, background && { backgroundColor: 'white' }]}>
      <Image source={{ uri: storeImageUri }} style={styles.storeImage} />
      <Text style={styles.storeName}>{storeName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  nameImageWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 2,
    paddingRight: 8,
    borderRadius: 100,
  },
  storeName: {
    fontSize: 10,
    color: '#4c4c4c',
    fontFamily: 'SNPro-Regular',
  },
  storeImage: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 4,
    backgroundColor: '#ccc',
  },
});