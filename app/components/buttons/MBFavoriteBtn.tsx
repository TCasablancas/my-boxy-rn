import { View, StyleSheet, Text } from 'react-native';
import { Icons } from '../../common/constants/Icons';
import { PrimaryColors } from '../../common/colors/Colors';

export default function MBFavoriteBtn() {
  return (
    <View style={styles.favoriteBtnContainer}>
      <Icons.heart width={22} height={22} strokeColor={PrimaryColors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  favoriteBtnContainer: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: PrimaryColors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteBtnIcon: {
    width: 22,
    height: 22,
    opacity: 0.2,
  },
});