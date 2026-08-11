import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { PrimaryColors } from '../../../common/colors/Colors';

interface MBDividerProps {
  marginVertical?: number;
}

export default function MBDivider({ marginVertical = 8 }: MBDividerProps) {
  return (
    <View style={[styles.divider, { marginVertical }]} />
  );
}

const styles = StyleSheet.create({
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: PrimaryColors.background,
  },
});