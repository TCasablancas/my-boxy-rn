import { Platform } from 'react-native';

/**
 * Tipografia centralizada. Ajuste `fontFamily` para a fonte do seu app
 * (ex: 'Poppins-Regular', 'Poppins-Bold') quando ela estiver carregada
 * via react-native.config.js / assets/fonts.
 */
export const typography = {
  fontFamily: Platform.select({ ios: 'System', android: 'Roboto', default: 'System' }),

  h1: {
    fontSize: 26,
    fontFamily: 'SFMonoBold',
    letterSpacing: -0.5,
    lineHeight: 32,
  },
  h2: {
    fontSize: 20,
    fontFamily: 'SFMonoBold',
    letterSpacing: -0.5,
    lineHeight: 26,
  },
  body: {
    fontSize: 15,
    fontFamily: 'SFMonoRegular',
    letterSpacing: -0.5,
    lineHeight: 21,
  },
  bodyBold: {
    fontSize: 15,
    fontFamily: 'SFMonoBold',
    letterSpacing: -0.5,
    lineHeight: 21,
  },
  caption: {
    fontSize: 13,
    fontFamily: 'SFMonoRegular',
    letterSpacing: -0.5,
    lineHeight: 16,
  },
  label: {
    fontSize: 13,
    fontFamily: 'SFMonoRegular',
    letterSpacing: -0.5,
    lineHeight: 16,
  },
  button: {
    fontSize: 16,
    fontFamily: 'SFMonoBold',
    letterSpacing: -0.5,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const radius = {
  sm: 8,
  md: 14,
  lg: 20,
  pill: 999,
};
