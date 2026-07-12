import { View, StyleSheet, StatusBar, Text, Image, FlatList } from 'react-native';
import { NeutralColors } from '../../common/colors/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface MBTitledViewHeaderProps {
  title?: string;
  description?: string;
  midComponent?: React.ReactNode;
  btnsLeft?: React.ReactNode;
  btnsRight?: React.ReactNode;
}

export default function MBTitledViewHeader({
  title, description, midComponent, btnsLeft, btnsRight
}: MBTitledViewHeaderProps) {
  const safeAreaInsets = useSafeAreaInsets();
  
  return (
    <View style={[styles.container, { paddingTop: safeAreaInsets.top }]}>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor="white"
      />
      <View style={styles.contentWrapper}>
        {btnsLeft && <View style={styles.btnsLeftWrapper}>{btnsLeft}</View>}
        <View style={styles.textWrapper}>
          {title && <Text style={styles.title}>{title}</Text>}
          {description && <Text style={styles.description}>{description}</Text>}
          {midComponent && <View style={styles.midComponentWrapper}>{midComponent}</View>}
        </View>
        {btnsRight && <View style={styles.btnsRightWrapper}>{btnsRight}</View>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    height: 40,
    width: '100%',
    justifyContent: 'center',
  },
  contentWrapper: {
    paddingHorizontal: 16,
    paddingTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btnsLeftWrapper: {
    position: 'absolute',
    left: 0,
  },
  btnsRightWrapper: {
    position: 'absolute',
    right: 0,
  },
  textWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: 'SNPro-Bold',
    color: NeutralColors.textSecondary,
  },
  description: {
    fontSize: 16,
    fontFamily: 'SNPro-Regular',
    color: NeutralColors.textPlaceholder,
  },
  midComponentWrapper: {
  },
});