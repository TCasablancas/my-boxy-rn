import { View, StyleSheet, Text } from 'react-native';
import { NeutralColors } from '../../../common/colors/Colors';
import { spacing } from '../../../common/constants/Sizes';
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
    paddingVertical: spacing.lg,
    marginVertical: spacing.lg,
    marginTop: 18,
    height: 40,
    width: '100%',
    justifyContent: 'center',
  },
  contentWrapper: {
    paddingHorizontal: spacing.lg,
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
    fontSize: 16,
    fontFamily: 'SFMonoBold',
    letterSpacing: -0.5,
    color: NeutralColors.textSecondary,
  },
  description: {
    fontSize: 16,
    fontFamily: 'SFMonoRegular',
    letterSpacing: -0.5,
    color: NeutralColors.textPlaceholder,
  },
  midComponentWrapper: {
  },
});