import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export interface MBTextWithTitleProps {
  title: string;
  text: string;
  onPress?: () => void;
}

export default function MBTextWithTitle({ title, text, onPress }: MBTextWithTitleProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={onPress} disabled={!onPress}>
        <Text style={[styles.text, onPress && styles.textWithAction]}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontFamily: 'SFMonoHeavy',
    letterSpacing: -0.5,
    color: '#b7b7b7',
    marginBottom: 4,
  },
  text: {
    fontSize: 14,
    fontFamily: 'SFMonoRegular',
    letterSpacing: -0.5,
    color: '#000',
  },
  textWithAction: {
    color: '#007AFF', // Blue color
  },
});