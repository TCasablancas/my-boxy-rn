import { View, StyleSheet, Text , Image, ScrollView } from 'react-native';
import { NeutralColors, PrimaryColors } from '../../common/colors/Colors';

export default function MBHeaderUserConfig() {
  return (
    <View style={styles.container}>
      <View style={styles.userInfoWrapper}>
        <Image
          source={{ uri: 'https://static.wikia.nocookie.net/herois/images/c/c4/MPSS_Mario.webp/revision/latest/thumbnail/width/360/height/360?cb=20220607201508&path-prefix=pt-br' }}
          style={styles.userImage}
        />
        <View style={styles.userTextWrapper}>
          <Text style={styles.userName}>Mario</Text>
          <Text style={styles.userAlias}>@mario</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: NeutralColors.background,
    borderRadius: 16,
  },
  userInfoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userTextWrapper: {
    marginLeft: 12,
  },
  userName: {
    fontSize: 16,
    fontFamily: 'SNPro-Bold',
    color: '#000',
  },
  userAlias: {
    fontSize: 14,
    fontFamily: 'SNPro-Regular',
    color: '#888',
  },
});