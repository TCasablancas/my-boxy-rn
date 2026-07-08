import { View, StyleSheet, StatusBar, Text, Image, FlatList } from 'react-native';
import { NeutralColors } from '../../common/colors/Colors';

interface MBTitledViewHeaderProps {
  title: string;
  description?: string;
  btnsLeft?: React.ReactNode;
  btnsRight?: React.ReactNode;
}

export default function MBTitledViewHeader({
  title, description, btnsLeft, btnsRight
}: MBTitledViewHeaderProps) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F0E5E4" />
      <View style={styles.contentWrapper}>
        {btnsLeft && <View style={styles.btnsLeftWrapper}>{btnsLeft}</View>}
        <View style={styles.textWrapper}>
          <Text style={styles.title}>{title}</Text>
          {description && <Text style={styles.description}>{description}</Text>}
        </View>
        {btnsRight && <View style={styles.btnsRightWrapper}>{btnsRight}</View>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    backgroundColor: '#F0E5E4',
    width: '100%',
    justifyContent: 'center',
  },
  contentWrapper: {
    // flex: 1,
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
    fontSize: 28,
    fontFamily: 'SNPro-Bold',
  },
  description: {
    fontSize: 16,
    fontFamily: 'SNPro-Regular',
    color: NeutralColors.textPlaceholder,
  },
});