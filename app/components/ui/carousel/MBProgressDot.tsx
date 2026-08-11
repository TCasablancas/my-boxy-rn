import { useEffect, useRef } from "react";
import { Animated, StyleSheet, TouchableOpacity } from "react-native";

interface MBProgressDotProps {
  active: boolean;
  progress: Animated.Value;   // 0 → 1, only used when active
  onPress: () => void;
}

const DOT_HEIGHT       = 4;
const DOT_INACTIVE_W   = 8;
const DOT_ACTIVE_W     = 44;
const DOT_RADIUS       = DOT_HEIGHT / 2;

 
export const MBProgressDot: React.FC<MBProgressDotProps> = ({ active, progress, onPress }) => {
  const width = useRef(new Animated.Value(active ? DOT_ACTIVE_W : DOT_INACTIVE_W)).current;
 
  useEffect(() => {
    Animated.timing(width, {
      toValue: active ? DOT_ACTIVE_W : DOT_INACTIVE_W,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [active]);
 
  const fillWidth = active
    ? progress.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] })
    : '0%';
 
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} hitSlop={{ top: 10, bottom: 10, left: 6, right: 6 }}>
      <Animated.View style={[styles.dotTrack, { width }]}>
        <Animated.View style={[styles.dotFill, { width: fillWidth }]} />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  dotTrack: {
    height: DOT_HEIGHT,
    borderRadius: DOT_RADIUS,
    backgroundColor: '#E0E0E0',
    overflow: 'hidden',
  },
  dotFill: {
    height: '100%',
    backgroundColor: '#007AFF',
  },
});