import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface MBInlineInfoCardProps {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function MBInlineInfoCard({ 
  title, description, actionLabel, onAction 
}: MBInlineInfoCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      {description && <Text style={styles.description}>{description}</Text>}
      {actionLabel && onAction && (
        <TouchableOpacity onPress={onAction} style={styles.action}>
          <Text style={styles.actionLabel}>{actionLabel}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F1F5FF',
    borderRadius: 12,
    padding: 16,
    gap: 6,
  },
  title: { 
    fontSize: 14, 
    fontWeight: '600', 
    color: '#1F2A44' 
  },
  description: { 
    fontSize: 13, 
    color: '#4B5875', 
    lineHeight: 18 
  },
  action: { 
    marginTop: 8, 
    alignSelf: 'flex-start' 
  },
  actionLabel: { 
    fontSize: 13, 
    fontWeight: '600', 
    color: '#3457D5' 
  },
});