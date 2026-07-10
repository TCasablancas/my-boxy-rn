import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function MBStatusDot({ status }: { status: 'online' | 'offline' }) {
  const dotColor = status === 'online' ? '#00FF00' : '#FF0000'; // Green for online, Red for offline

  return (
    <View style={styles.container}>
      <View style={[styles.dot, { backgroundColor: dotColor }]} />
      <Text style={styles.statusText}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    color: '#000',
  },
});