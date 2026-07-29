import { StyleSheet, View } from 'react-native';
import MBFavoriteIconBtn from './MBFavoriteIconBtn';
import { NeutralColors } from '../../common/colors/Colors';

interface MBFavoriteBtnProps {
  isActive?: boolean;
  background?: boolean;
  defaultActive?: boolean;
  onPress?: (nextActive: boolean) => void;
}

export default function MBFavoriteBtn({
  isActive, background, defaultActive, onPress,
}: MBFavoriteBtnProps) {
  return (
    <View style={[
      styles.favoriteBtnContainer, 
      { backgroundColor: background ? NeutralColors.backgroundAlt : 'transparent' }
    ]}>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteBtnIcon: {
    width: 22,
    height: 22,
    opacity: 0.2,
  },
});