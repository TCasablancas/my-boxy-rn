import { View, StyleSheet, Text, Pressable } from 'react-native';
import { Icons } from '../../common/constants/Icons';

interface MBMenuNestedListProps {
  title?: string;
  items: { id: string; icon?: React.ReactNode; label: string }[];
  onPress?: (itemId: string) => void;
}

export default function MBMenuNestedList({ 
    title, items, onPress 
}: MBMenuNestedListProps) {
  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        <Text style={styles.nestTitle}>{title || 'More Configs View'}</Text>
        <View style={styles.nestWrapper}>
          {items.map((item) => (
            <Pressable 
              key={item.id} 
              style={styles.nestItemWrapper} 
              onPress={() => onPress?.(item.id)}
            >
              {item.icon && <View style={styles.iconWrapper}>{item.icon}</View>}
              <View style={styles.textWrapper}>
                <Text style={styles.nestItemText}>{item.label}</Text>
              </View>
              <Icons.chevronRight width={12} height={12} />
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
    width: '100%',
  },
  nestWrapper: {
    flex: 1,
    marginTop: 8,
    gap: 8,
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  nestTitle: {
    fontSize: 18,
    fontFamily: 'SNPro-Bold',
  },
  nestItemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 16,
    // backgroundColor: '#d3d3d3',
    borderRadius: 8,
  },
  nestItemText: {
    fontSize: 16,
    fontFamily: 'SNPro-Regular',
  },
  textWrapper: {
    flex: 1,
  },
  iconWrapper: {
    marginRight: 8,
  },
});