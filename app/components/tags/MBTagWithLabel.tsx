import { PrimaryColors } from '../../common/colors/Colors';
import { Icons } from '../../common/constants/Icons';
import { View, Text, StyleSheet } from 'react-native';

interface MBTagWithLabelProps {
  label?: string;
  icon?: React.ReactNode;
}

export default function MBTagWithLabel({ label, icon }: MBTagWithLabelProps) {
  return (
    <View style={styles.tagContainer}>
      <View style={styles.iconContainer}>{icon}</View>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  tagContainer: {
    backgroundColor: PrimaryColors.primaryLight,
    borderRadius: 20,
    padding: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 24,
  },
  iconContainer: {
    width: 18,
    height: 18,
    borderRadius: 12,
    justifyContent: 'center',
    backgroundColor: PrimaryColors.primary,
    alignItems: 'center',
    marginRight: 4,
  },
  label: {
    fontFamily: 'SNPro-Regular',
    fontSize: 12,
    color: PrimaryColors.primary,
    marginRight: 8,
  },
  tag: {
    fontSize: 12,
    fontFamily: 'SNPro-Regular',
    color: PrimaryColors.primary,
  },
});