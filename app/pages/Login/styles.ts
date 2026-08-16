import { StyleSheet } from 'react-native';
import { Fonts } from '../../common/constants/Fonts';
import { NeutralColors, PrimaryColors } from '../../common/colors/Colors';

export const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  socialMediaDisclaimer: {
    ...Fonts.LexendRegular14,
    color: NeutralColors.textSecondary,
    textAlign: 'center',
  },
  container: {
    padding: 16,
    gap: 26,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'space-around',
    backgroundColor: NeutralColors.backgroundAlt,
  },
  topContentWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  contentWrapper: {
    gap: 16,
    width: '100%',
    padding: 20,
    paddingBottom: 32,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    borderRadius: 16,
  },
  footerButtonsWrapper: {
    flexDirection: 'row', 
    gap: 16,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    ...Fonts.light14,
  },
  notSingedUpText: { 
    ...Fonts.regular16,
    color: NeutralColors.white 
  },
  actionButtonsWrapper: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  loginErrorText: {
    color: PrimaryColors.mainRed,
    ...Fonts.regular13,
    textAlign: 'center',
  },
  loginWithSocialButtonsWrapper: {
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
});