import { View, Text, StyleSheet, Pressable } from 'react-native';

interface MBIconInfoContainerProps {
  icon: React.ReactNode;
  title?: string;
  description?: string;
  onPressItem?: (itemId: string) => void;
}

export default function MBIconInfoContainer({
  icon, title, description, onPressItem,
}: MBIconInfoContainerProps) {
  return (
    <Pressable style={styles.container} onPress={() => onPressItem && onPressItem(title || '')}>
      <View style={styles.mainWrapper}>
        <View style={styles.iconWrapper}>
          {icon} 
          <Text style={styles.titleText}>{title && title}</Text>
        </View>
        <Text style={styles.subtitleText}>{description && description}</Text>
    </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 16,
  },
  mainWrapper: { 
    flexDirection: 'column', 
    justifyContent: 'center', 
    alignItems: 'center', 
    columnGap: 8, 
    backgroundColor: '#EBEBEB', 
    borderRadius: 16, 
    paddingVertical: 8,
    paddingHorizontal: 16, 
  },
  iconWrapper: { 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center', 
    columnGap: 4 
  },
  titleText: {
    fontSize: 26,
    fontFamily: 'SNPro-Bold',
    color: '#6C6E6B',
  },
  subtitleText: {
    fontSize: 12,
    fontFamily: 'SNPro-Regular',
    color: '#979696',
  },
});