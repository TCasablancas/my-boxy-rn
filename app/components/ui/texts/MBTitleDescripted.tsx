import { View, Text, StyleSheet } from 'react-native';
import { NeutralColors, PrimaryColors } from '../../../common/colors/Colors';
import { Fonts } from '../../../common/constants/Fonts';

interface MBTitleDescriptedProps {
  title?: string;
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
      <Text style={[{ 
        color: colorTitle ? colorTitle : PrimaryColors.primary, 
        textAlign: alignment, ...Fonts.SFBold20, 
      }]}>{title && title}</Text>
      <Text style={[{ 
        color: colorDescription ? colorDescription : NeutralColors.textSecondary, 
        textAlign: alignment, ...Fonts.LexendRegular16, 
      }]}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
});