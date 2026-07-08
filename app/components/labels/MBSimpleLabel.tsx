import { View, Text, StyleSheet } from 'react-native';
import { PrimaryColors } from '../../common/colors/Colors';

interface MBSimpleLabelProps {
  text: string;
  icon?: React.ReactNode;
  backgroundColor?: string;
  textColor?: string;
}

export default function MBSimpleLabel({
  text, icon, backgroundColor, textColor,
}: MBSimpleLabelProps) {
  return (
    <View style={[styles.labelContainer, { backgroundColor }]}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <Text style={[styles.labelText, { color: textColor }]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  labelContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  labelText: {
    fontFamily: 'SNPro-Regular',
  },
  iconContainer: {
    marginRight: 4,
  },
});