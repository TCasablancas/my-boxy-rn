import React, { useEffect, useRef } from 'react';
import { StyleSheet, Pressable, Animated } from 'react-native';
import { IconsActions } from '../../../common/icons/IconsActions';
import { NeutralColors, PrimaryColors } from '../../../common/colors/Colors';

interface MBMainSelectorProps {
  value?: string;
  onChange?: () => void;
}

export default function MBMainSelector({ value, onChange }: MBMainSelectorProps) {
  const size = 12;
  const isSelected = value === 'on';
  const fadeAnim = useRef(new Animated.Value(isSelected ? 1 : 0)).current;
  const colorAnim = useRef(new Animated.Value(isSelected ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: isSelected ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
    Animated.timing(colorAnim, {
      toValue: isSelected ? 1 : 0,
      duration: 200,
      useNativeDriver: false, // Color animations are not supported by native driver in core API
    }).start();
  }, [isSelected, fadeAnim, colorAnim]);

  const borderColor = colorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [NeutralColors.border, PrimaryColors.primaryDark],
  });

  const backgroundColor = colorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['transparent', PrimaryColors.primaryLight],
  });

  return (
    <Pressable onPress={onChange}>
      <Animated.View style={[
        styles.container,
        { backgroundColor, borderColor }
      ]}>
        <Animated.View style={{ opacity: fadeAnim }}>
          <IconsActions.check
            strokeColor={PrimaryColors.primaryDark} width={size} height={size}
          />
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 16,
    height: 16,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
});