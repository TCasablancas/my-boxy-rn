import { useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { NeutralColors, PrimaryColors } from '../../common/colors/Colors';
import { Icons } from '../../common/icons/Icons';

interface MBFavoriteIconBtnProps {
  isActive?: boolean;
  defaultActive?: boolean;
  onPress?: (nextActive: boolean) => void;
}

export default function MBFavoriteIconBtn({ 
  isActive,
  defaultActive = false,
  onPress,
}: MBFavoriteIconBtnProps) {
  const scaleValue = useRef(new Animated.Value(1)).current;
  const [internalActive, setInternalActive] = useState(defaultActive);

  const resolvedIsActive = isActive ?? internalActive;

  const handlePress = () => {
    const nextActive = !resolvedIsActive;

    if (isActive === undefined) {
      setInternalActive(nextActive);
    }

    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    onPress?.(nextActive);
  };

  return (
    <TouchableOpacity style={styles.btnWrapper} onPress={handlePress}>
      <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
        <Icons.heart 
          width={24} height={24} 
          color={PrimaryColors.primary} 
          strokeColor={resolvedIsActive ? PrimaryColors.mainRed : NeutralColors.textSecondary} 
          fillColor={resolvedIsActive ? PrimaryColors.mainRed : 'transparent'}
        />
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btnWrapper: {
    padding: 8,
    borderRadius: 8,
  },
  btnText: {
    fontSize: 18,
  },
});