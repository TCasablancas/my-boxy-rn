import { 
  View, StyleSheet, KeyboardAvoidingView, Platform, Animated, StatusBar 
} from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardScrollProvider } from '../../common/contexts/KeyboardScrollContext';
import { spacing } from '../../common/constants/Sizes';
import { NeutralColors } from '../../common/colors/Colors';
import { Icons } from '../../common/icons/Icons';

import { MBStepperHeader } from '../../components/stepper/MBStepperHeader';
import MBTitledViewHeader from '../../components/header/MBTitledViewHeader';
import MBRoundedIconBtn from '../../components/buttons/MBRoundedIconBtn';

import { STORE_SIGNUP_STEP_LABELS } from './StoreSignupModel';
import { useStoreSignupViewModel } from './StoreSignupViewModel';
import MainNavigation from '../../common/navigation/MainNavigation';
import SignupSuccessSection from '../../sections/signup/SignupSuccessSection';

export default function StoreSignupView() {
  const safeArea = useSafeAreaInsets();
  
  const { 
    stepIndex,
    formData,
    isComplete,
    handleFinish,
    renderStep,
    scrollViewRef,
    fadeAnim,
    translateXAnim,
  } = useStoreSignupViewModel();

  if (isComplete) {
    return (
      <SignupSuccessSection />
    );
  }

  return (
    <SafeAreaProvider style={[
      { marginTop: Platform.OS === 'ios' ? safeArea.top : safeArea.top + 40 }
    ]}>
      <StatusBar barStyle="dark-content" backgroundColor={NeutralColors.backgroundAlt} />
      <MBTitledViewHeader 
        title="Criar Loja"
        btnsLeft={<MBRoundedIconBtn 
          icon={<Icons.arrowBack width={16} height={16} strokeColor={NeutralColors.textSecondary} />} 
          onPress={() => { MainNavigation.pop(); }}
        />}
      />
      <View style={styles.stepperWrapper}>
        <MBStepperHeader steps={STORE_SIGNUP_STEP_LABELS} currentIndex={stepIndex} />
      </View>

      <KeyboardAvoidingView
        style={[{ flex: 1 }]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <KeyboardScrollProvider scrollViewRef={scrollViewRef}>
          <Animated.View
            style={{
              opacity: fadeAnim,
              flex: 1,
              transform: [{ translateX: translateXAnim }],
              bottom: safeArea.bottom,
            }}
          >
            {renderStep()}
          </Animated.View>
        </KeyboardScrollProvider>
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  stepperWrapper: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  successTitle: {
    fontSize: 18,
    fontFamily: 'SNPro-Bold',
    textAlign: 'center',
  },
});