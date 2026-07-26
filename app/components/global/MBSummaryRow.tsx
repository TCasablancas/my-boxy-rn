import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NeutralColors } from '../../common/colors/Colors';
import { spacing } from '../../common/constants/Sizes';

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
    paddingTop: spacing.sm,
    paddingBottom: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: NeutralColors.border,
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