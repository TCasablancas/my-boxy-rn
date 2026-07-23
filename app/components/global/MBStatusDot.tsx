import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ProductStatus, PRODUCT_STATUS_COLORS } from '../../models/StatusModel';

interface MBStatusDotProps {
  status?: ProductStatus;
  style?: object;
}

export default function MBStatusDot({ 
  status, style
}: MBStatusDotProps) {
  return (
    <View style={[styles.container, style]}>
      <View style={[
        styles.dot, 
        { backgroundColor: status ? PRODUCT_STATUS_COLORS[status] : 'transparent' }
      ]} />
      <View style={[
        styles.background, 
        { backgroundColor: status ? PRODUCT_STATUS_COLORS[status] : 'transparent' }
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
  statusText: {
    fontSize: 14,
    color: '#000',
  },
});