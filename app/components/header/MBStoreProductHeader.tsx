import { View, StyleSheet, StatusBar, Text, Image, FlatList } from 'react-native';

export default function MBStoreProductHeader() {
  return (
    <View style={styles.container}>
      <View style={styles.storeInfoWrapper}>
        <View style={styles.nameImageWrapper}>
          <Image source={{ uri: 'https://ovicio.com.br/wp-content/uploads/2023/10/20231013-c5b158a3-71ab-4f52-bca0-a535354eb0c8-555x555.jpg' }} style={styles.storeImage} />
          <View style={styles.storeNameWrapper}>
            <Text style={styles.storeName}>Store Name</Text>
            <Text style={styles.storeAlias}>storeAlias</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    flex: 1,
    width: '100%',
  },
  storeInfoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameImageWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  storeImage: {
    width: 20,
    height: 20,
    borderRadius: 20,
    marginRight: 8,
  },
  storeName: {
    fontSize: 12,
    fontFamily: 'SNPro-Regular',
    lineHeight: 14,
  },
  storeNameWrapper: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  storeAlias: {
    fontSize: 10,
    fontFamily: 'SNPro-Regular',
    color: '#4c4c4c',
    lineHeight: 12,
  },
});