import { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text } from 'react-native';

interface MBSimpleTagProps {
  tag: {
    id: string;
    title: string;
  };
  onPress: () => void;
  isSelected?: boolean;
  activeBorderColor?: string;
}

export default function MBSimpleTag({ 
  tag,
  onPress,
  isSelected = false,
  activeBorderColor = '#2BAE66',
}: MBSimpleTagProps) {
  const borderAnimation = useRef(new Animated.Value(isSelected ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(borderAnimation, {
      toValue: isSelected ? 1 : 0,
      duration: 220,
      useNativeDriver: false,
    }).start();
  }, [borderAnimation, isSelected]);

  const animatedBorderColor = borderAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#DADADA', activeBorderColor],
  });

  return (
    <Pressable onPress={onPress}>
      <Animated.View style={[styles.tagItem, { borderColor: animatedBorderColor }]}>
        <Text style={styles.tagText}>{tag.title}</Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tagContainer: {
    backgroundColor: '#F0E5E4',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  tagItem: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
  },
  tagText: {
    fontSize: 12,
    color: '#555',
    fontFamily: 'SFMonoRegular',
    letterSpacing: -0.5,
  },
});