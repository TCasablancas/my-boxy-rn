import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface MBSummaryRowProps {
  label: string;
  value?: string | null;
}

export default function MBSummaryRow({ label, value }: MBSummaryRowProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value} numberOfLines={1}>
        {value || '—'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EEF0F5',
  },
  label: { 
    fontSize: 13, 
    color: '#8A93A6' 
  },
  value: { 
    fontSize: 14, 
    color: '#1F2A44', 
    fontWeight: '500', 
    flexShrink: 1, 
    marginLeft: 12, 
    textAlign: 'right' 
  },
});