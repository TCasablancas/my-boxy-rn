import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface MBTitleWithLinkRightProps {
  title: string;
  linkText: string;
  icon?: React.ReactNode;
  onLinkPress: () => void;
}

export default function MBTitleWithLinkRight({ 
    title, linkText, icon, onLinkPress 
}: MBTitleWithLinkRightProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={onLinkPress} style={styles.linkContainer}>
        <Text style={styles.linkText}>{linkText}</Text>
        {icon && <View style={{ marginLeft: 4 }}>{icon}</View>}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontFamily: 'SFMonoHeavy',
    letterSpacing: -0.5,
    color: '#000',
  },
  linkText: {
    fontSize: 14,
    fontFamily: 'SFMonoRegular',
    letterSpacing: -0.5,
    color: '#007AFF', // Blue color
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});