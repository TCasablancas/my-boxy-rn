import { View, StyleSheet, Text, Pressable } from 'react-native';
import { Icons } from '../../common/constants/Icons';
import { PrimaryColors } from '../../common/colors/Colors';

export default function MBFavoriteBtn({ onPress }: { onPress?: () => void }) {
  return (
    <Pressable style={styles.favoriteBtnContainer} onPress={onPress}>
      <Icons.heart width={22} height={22} strokeColor={PrimaryColors.primary} />
    </Pressable>
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