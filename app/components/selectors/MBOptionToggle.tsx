import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { NeutralColors } from '../../common/colors/Colors';

interface MBOptionToggleProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
}

export default function MBOptionToggle({ 
    label, value, onChange, disabled 
}: MBOptionToggleProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Switch value={value} onValueChange={onChange} disabled={disabled} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  label: { 
    fontSize: 15, 
    flex: 1, 
    marginRight: 12,
    fontFamily: 'SNPro-Regular',
    color: NeutralColors.textSecondary,
  },
});