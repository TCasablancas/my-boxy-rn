import { StyleSheet, Platform } from 'react-native';
import { NeutralColors, PrimaryColors } from '../../../common/colors/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    height: '100%',
    width: '100%',
  },
  sheetHost: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 8,
    paddingBottom: 16,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  content: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 8,
    paddingTop: 16,
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    bottom: Platform.OS === 'ios' ? 20 : 0,
  },
  contentBox: {
    alignSelf: 'stretch',
    padding: 8,
    borderRadius: 16,
    marginTop: 16,
    alignItems: 'stretch',
  },
  closeBtn: {
    position: 'absolute',
    top: 32,
    right: 16,
    zIndex: 10,
  },
  handleCap: {
    width: 50,
    height: 8,
    borderRadius: 4,
    backgroundColor: NeutralColors.border,
  },
  title: {
    width: '100%',
    // fontFamily: 'SFMonoBold',
    // letterSpacing: -0.5,
    fontWeight: '600',
    fontSize: 18,
    marginTop: 16,
    paddingHorizontal: 16,
    color: PrimaryColors.primaryDark,
  },
  description: {
    width: '100%',
    fontWeight: '400',
    // fontFamily: 'SFMonoLight',
    // letterSpacing: -0.5,
    fontSize: 14,
    color: NeutralColors.textPlaceholder,
    paddingHorizontal: 16,
    lineHeight: 18,
    marginTop: 8,
  },
  headerImage: {
    marginVertical: 12,
    width: '100%',
    alignItems: 'center',
  },
  actionButton: {
    marginTop: 16,
    width: '100%',
    alignItems: 'center',
  },
});

export default styles;