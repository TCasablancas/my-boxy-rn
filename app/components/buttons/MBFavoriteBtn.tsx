import { StyleSheet, View } from 'react-native';
import MBFavoriteIconBtn from './MBFavoriteIconBtn';

export default function MBFavoriteBtn({
  isActive,
  defaultActive,
  onPress,
}: {
  isActive?: boolean;
  defaultActive?: boolean;
  onPress?: (nextActive: boolean) => void;
}) {
  return (
    <View style={styles.favoriteBtnContainer}>
      <MBFavoriteIconBtn
        isActive={isActive}
        defaultActive={defaultActive}
        onPress={onPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  favoriteBtnContainer: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#EBEBEB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteBtnIcon: {
    width: 22,
    height: 22,
    opacity: 0.2,
  },
});