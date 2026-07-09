import { View, StyleSheet, Text, Pressable } from 'react-native';

export default function MBRoundedIconBtn({ 
    icon, onPress
}: { icon: React.ReactNode; onPress: () => void }) {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.roundedIconBtnContainer}>
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