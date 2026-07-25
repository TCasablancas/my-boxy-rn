import { View, Text, StyleSheet, Pressable } from 'react-native';
import { NeutralColors } from '../../common/colors/Colors';

interface MBTextBtnProps {
  title?: string;
  textColor?: string;
  onPress?: () => void;
}

export default function MBTextBtn({ 
  title, textColor, onPress 
}: MBTextBtnProps) {
  return(
    <View style={styles.container}>
      <Pressable onPress={onPress}>
        <Text style={[styles.text, textColor ? { color: textColor } : {}]}>{title}</Text>
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
    fontFamily: 'SNPro-Regular',
  },
});