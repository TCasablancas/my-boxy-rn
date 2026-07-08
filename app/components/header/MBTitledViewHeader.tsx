import { View, StyleSheet, StatusBar, Text, Image, FlatList } from 'react-native';
import { NeutralColors } from '../../common/colors/Colors';

interface MBTitledViewHeaderProps {
  title: string;
  description?: string;
  btnsRight?: React.ReactNode;
}

export default function MBTitledViewHeader({
  title, description, btnsRight
}: MBTitledViewHeaderProps) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F0E5E4" />
      <View style={styles.contentWrapper}>
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
    flex: 1,
    backgroundColor: '#F0E5E4',
    width: '100%',
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  btnsRightWrapper: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  textWrapper: {
    flexDirection: 'column',
    alignItems: 'flex-start',
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