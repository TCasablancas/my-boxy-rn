import { View, Text, StyleSheet } from 'react-native';
import { PrimaryColors } from '../../common/colors/Colors';

interface MBSimpleLabelProps {
  text: string;
  backgroundColor?: string;
  textColor?: string;
  fontSize?: number;
  paddingHorizontal?: number;
  paddingVertical?: number;
  borderRadius?: number;
}

export default function MBSimpleLabel({
  text,
  backgroundColor = PrimaryColors.primary,
  textColor = 'white',
  fontSize = 14,
  paddingHorizontal = 8,
  paddingVertical = 4,
  borderRadius = 4,
}: MBSimpleLabelProps) {
  return (
    <View style={[styles.labelContainer, { backgroundColor, paddingHorizontal, paddingVertical, borderRadius }]}>
      <Text style={[styles.labelText, { color: textColor, fontSize }]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  labelContainer: {
    alignSelf: 'flex-start',
  },
  labelText: {
    fontFamily: 'SNPro-Regular',
  },
});