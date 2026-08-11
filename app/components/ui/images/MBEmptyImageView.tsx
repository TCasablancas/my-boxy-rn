import { View, Image, StyleSheet } from 'react-native';
import { Icons } from '../../../common/icons/Icons';
import { PrimaryColors, NeutralColors } from '../../../common/colors/Colors';

export default function MBEmptyImageView() {
  return (
    <View style={styles.dashedContainer}>
      <View style={styles.container}>
        {/* <Image style={styles.image} /> */}
        <Icons.photo strokeColor={PrimaryColors.primaryDark} width={52} height={52} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dashedContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    width: 160,
    height: 160,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: PrimaryColors.primary,
    borderStyle: 'dashed',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    width: 140,
    height: 140,
    backgroundColor: PrimaryColors.primaryLight,
    borderRadius: 14
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
});