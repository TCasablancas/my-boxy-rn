import { View, Text, StyleSheet, Pressable } from 'react-native';
import { NeutralColors } from '../../../common/colors/Colors';

export enum MBTextBtnSize {
  SMALL = 'sm',
  MEDIUM = 'md',
  LARGE = 'lg',
  EXTRA_LARGE = 'xl',
}

interface MBTextBtnProps {
  title?: string;
  textColor?: string;
  size?: MBTextBtnSize;
  onPress?: () => void;
}

export default function MBTextBtn({ 
  title, textColor, size, onPress 
}: MBTextBtnProps) {

  function getFontSize(size: MBTextBtnSize | undefined): number {
    switch (size) {
      case MBTextBtnSize.SMALL:
        return 12;
      case MBTextBtnSize.LARGE:
        return 16;
      case MBTextBtnSize.EXTRA_LARGE:
        return 24;
      default:
        return 14;
    }
  };

  return(
    <View style={styles.container}>
      <Pressable onPress={onPress}>
        <Text style={[
          styles.text, 
          { 
            color: textColor ? textColor : NeutralColors.textSecondary,
            fontSize: getFontSize(size ? size : MBTextBtnSize.MEDIUM)
          }
        ]}>{title}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
  },
  text: {
    color: NeutralColors.textSecondary,
    fontSize: 14,
    fontFamily: 'SFMonoRegular',
    letterSpacing: -0.5,

  },
});