import { View, StyleSheet, Text, Pressable } from 'react-native';

interface MBRoundedIconBtnProps {
  icon: React.ReactNode;
  backgroundColor?: string;
  onPress: () => void;
}

export default function MBRoundedIconBtn({ 
    icon, backgroundColor, onPress
}: MBRoundedIconBtnProps) {
  return (
    <Pressable onPress={onPress}>
      <View style={[styles.roundedIconBtnContainer, backgroundColor && { backgroundColor }]}>
        <View style={styles.roundedIconBtnWrapper}>
          {icon}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  roundedIconBtnContainer: {
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: '#EBEBEB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  roundedIconBtnWrapper: {
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
});