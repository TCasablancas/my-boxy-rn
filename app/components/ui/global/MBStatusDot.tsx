import { useRef, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { ProductStatus, PRODUCT_STATUS_COLORS } from '../../../models/StatusModel';

interface MBStatusDotProps {
  status?: ProductStatus;
  style?: object;
}

export default function MBStatusDot({ 
  status, style
}: MBStatusDotProps) {
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(animation, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();
  }, [animation]);

  const opacity = animation.interpolate({
    inputRange: [0, 0.25],
    outputRange: [0.25, 0],
  });

  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 2],
  });
  
  return (
    <View style={[styles.container, style]}>
      <View style={[
        styles.dot, 
        { backgroundColor: status ? PRODUCT_STATUS_COLORS[status] : 'transparent' }
      ]} />
      <Animated.View style={[
        styles.background, 
        { 
          backgroundColor: status ? PRODUCT_STATUS_COLORS[status] : 'transparent', 
          opacity, 
          transform: [{ scale }] 
        }
      ]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 16,
    height: 16,
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 16,
    height: 16,
    borderRadius: 8,
    opacity: 0.25,
  },
  dot: {
    width: 10, 
    height: 10, 
    borderRadius: 5,
    zIndex: 100,
    opacity: 1,
  },
});