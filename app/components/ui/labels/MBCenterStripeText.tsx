
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface MBCenterStripeTextProps {
  text?: string;
  marginVertical?: number;
}

export default function MBCenterStripeText({ 
  text, marginVertical 
}: MBCenterStripeTextProps) {
  return (
    <View style={[styles.container, { marginVertical: marginVertical ? marginVertical : 8 }]}>
      <View style={styles.stripe} />
      <Text style={styles.text}>{text}</Text>
      <View style={styles.stripe} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stripe: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  text: {
    fontFamily: 'Sora-Light',
    marginHorizontal: 10,
    fontSize: 12,
    color: '#666',
  },
});