import { View, Text, Pressable, StyleSheet } from 'react-native';
import { NeutralColors, PrimaryColors } from '../../../common/colors/Colors';
import { Icons } from '../../../common/icons/Icons';
import MainNavigation from '../../../common/navigation/MainNavigation';

export enum MBMainInfoSquareBtnType {
  DEFAULT = 'default',
  LIGHT = 'light',
  DARK = 'dark',
  OUTLINED = 'outlined',
  GRAY = 'gray',
  DISABLED = 'disabled',
}

interface MBMainInfoSquareBtnProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  type?: MBMainInfoSquareBtnType;
  onPress: () => void;
}

const setBackgroundColor = (type: MBMainInfoSquareBtnType = MBMainInfoSquareBtnType.DEFAULT) => {
  switch (type) {
    case MBMainInfoSquareBtnType.LIGHT:
      return PrimaryColors.primaryLight;
    case MBMainInfoSquareBtnType.DARK:
      return NeutralColors.neutral800;
    case MBMainInfoSquareBtnType.OUTLINED:
      return 'transparent';
    case MBMainInfoSquareBtnType.GRAY:
      return NeutralColors.neutral200;
    case MBMainInfoSquareBtnType.DISABLED:
      return NeutralColors.neutral100;
    default:
      return PrimaryColors.primaryDark;
  }
};

const setMainTextColor = (type: MBMainInfoSquareBtnType = MBMainInfoSquareBtnType.DEFAULT) => {
  switch (type) {
    case MBMainInfoSquareBtnType.LIGHT:
      return PrimaryColors.primaryDark;
    case MBMainInfoSquareBtnType.DARK:
      return NeutralColors.textLight;
    case MBMainInfoSquareBtnType.OUTLINED:
      return PrimaryColors.mainBlue;
    case MBMainInfoSquareBtnType.GRAY:
      return NeutralColors.textSecondary;
    case MBMainInfoSquareBtnType.DISABLED:
      return NeutralColors.textDisabled;
    default:
      return NeutralColors.white;
  }
};

const setSecondaryTextColor = (type: MBMainInfoSquareBtnType = MBMainInfoSquareBtnType.DEFAULT) => {
  switch (type) {
    case MBMainInfoSquareBtnType.LIGHT:
      return PrimaryColors.primary;
    case MBMainInfoSquareBtnType.DARK:
      return NeutralColors.textLight;
    case MBMainInfoSquareBtnType.OUTLINED:
      return NeutralColors.textSecondary;
    case MBMainInfoSquareBtnType.GRAY:
      return NeutralColors.textSecondary;
    case MBMainInfoSquareBtnType.DISABLED:
      return NeutralColors.textDisabled;
    default:
      return PrimaryColors.primary;
  }
};

export default function MBMainInfoSquareBtn({ 
  icon, title, description, type, onPress
}: MBMainInfoSquareBtnProps) {

  return (
    <Pressable style={[styles.squareActionButton, { backgroundColor: setBackgroundColor(type) }]} onPress={onPress}>
      <View style={styles.squareActionButtonContent}>
        <View style={styles.iconsRowWrapper}>
          <View style={styles.mainIconWrapper}>
            {icon}
          </View>
          <Icons.arrowUpRight width={16} height={16} color={setMainTextColor(type)} />
        </View>
        <View>
          <Text style={[styles.squareActionButtonTitle, { color: setMainTextColor(type) }]}>{title}</Text>
          <Text style={[styles.squareActionButtonDescription, { color: setSecondaryTextColor(type) }]}>{description}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  squareActionButtonContent: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 50,
  },
  iconsRowWrapper: { 
    flexDirection: 'row', 
    justifyContent: 'space-between' 
  },
  squareActionButton: {
    flex: 1,
    paddingHorizontal: 16, 
    paddingVertical: 12, 
    borderRadius: 16,
  },
  mainIconWrapper: { 
    width: 46, 
    height: 46, 
    borderRadius: 23, 
    backgroundColor: NeutralColors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  squareActionButtonText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'SFMonoBold',
    // letterSpacing: -0.5,
    color: NeutralColors.text,
  },
  squareActionButtonTitle: {
    fontSize: 14,
    // fontFamily: 'SFMonoRegular',
    // letterSpacing: -0.5,
    color: NeutralColors.text,
    fontWeight: '600',
  },
  squareActionButtonDescription: {
    fontSize: 12,
    fontWeight: '400',
    color: NeutralColors.textSecondary,
  },
});