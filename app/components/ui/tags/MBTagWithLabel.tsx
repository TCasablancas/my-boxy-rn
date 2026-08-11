import { PrimaryColors } from '../../../common/colors/Colors';
import { Icons } from '../../../common/icons/Icons';
import { View, Text, StyleSheet } from 'react-native';

interface MBTagWithLabelProps {
  id?: string;
  label?: string;
  icon?: React.ReactNode;
  backgroundColor?: string;
}

export default function MBTagWithLabel({ 
  id, label, icon, backgroundColor
}: MBTagWithLabelProps) {
  return (
    <View style={[styles.tagContainer, backgroundColor && { backgroundColor: backgroundColor }]} key={id}>
      <View style={styles.iconContainer}>{icon}</View>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  tagContainer: {
    borderRadius: 20,
    padding: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 24,
    opacity: 0.8,
  },
  iconContainer: {
    width: 18,
    height: 18,
    borderRadius: 12,
    justifyContent: 'center',
    backgroundColor: '#333333',
    alignItems: 'center',
    marginRight: 4,
  },
  label: {
    fontFamily: 'SFMonoRegular',
    letterSpacing: -0.5,
    fontSize: 12,
    color: '#333333',
    marginRight: 8,
  },
  tag: {
    fontSize: 12,
    fontFamily: 'SFMonoRegular',
    letterSpacing: -0.5,
    color: PrimaryColors.primary,
  },
});