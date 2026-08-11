import { View, Text, StyleSheet } from 'react-native';
import { NeutralColors, PrimaryColors } from '../../../common/colors/Colors';

interface MBTitleDescriptedProps {
  title: string;
  description?: any;
  colorTitle?: string;
  colorDescription?: string;
  alignment?: 'left' | 'center' | 'right';
  style?: object;
}

export default function MBTitleDescripted({ 
  title, description, colorTitle, colorDescription, alignment, style
}: MBTitleDescriptedProps) {
  return (
    <View style={[styles.container, style]}>
      <Text style={[
        styles.title, 
        { color: colorTitle ? colorTitle : PrimaryColors.primary, textAlign: alignment }
      ]}>{title}</Text>
      <Text style={[
        styles.description, 
        { color: colorDescription ? colorDescription : NeutralColors.textSecondary, textAlign: alignment }
      ]}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  title: {
    fontFamily: 'SFMonoBold',
    letterSpacing: -0.5,
    fontSize: 26,
    marginBottom: 8,
  },
  description: {
    fontFamily: 'SFMonoRegular',
    letterSpacing: -0.5,
    fontSize: 16,
  },
});