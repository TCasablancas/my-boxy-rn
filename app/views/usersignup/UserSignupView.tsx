import React from 'react';
import { Animated, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { MBStepperHeader } from '../../components/stepper/MBStepperHeader';
import { GradientColors, NeutralColors } from '../../common/colors/Colors';
import { spacing } from '../../common/constants/Typgraphy';
import { KeyboardScrollProvider } from '../../common/contexts/KeyboardScrollContext';
import { StepSucesso } from './steps/StepSucesso';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CadastroScreenProps, USER_SIGNUP_STEP_LABELS } from './UserSignupModel';
import { useUserSignupViewModel } from './UserSignupViewModel';
import LinearGradient from 'react-native-linear-gradient';

export const UserSignupView: React.FC<CadastroScreenProps> = ({ onFinish }) => {
  const {
    stepIndex,
    formData,
    isComplete,
    handleFinish,
    renderStep,
    scrollViewRef,
    fadeAnim,
  } = useUserSignupViewModel({ onFinish });

  const safeArea = useSafeAreaInsets();

  if (isComplete) {
    return (
      <View style={styles.container}>
        <StepSucesso data={formData} onGoHome={handleFinish} />
      </View>
    );
  }

  return (
    <LinearGradient 
      colors={GradientColors.neutralGradient}
      start={{ x: 0, y: 1 }}
      end={{ x: 0, y: 0 }}
      style={styles.mainWrapper}
    >
      <View style={[styles.container, { paddingTop: safeArea.top + 40 }]}>
        <MBStepperHeader steps={USER_SIGNUP_STEP_LABELS} currentIndex={stepIndex} />

        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
          <KeyboardScrollProvider scrollViewRef={scrollViewRef}>
            <ScrollView
              ref={scrollViewRef}
              contentContainerStyle={styles.scrollContent}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              <Animated.View style={{ opacity: fadeAnim, flex: 1 }}>{renderStep()}</Animated.View>
            </ScrollView>
          </KeyboardScrollProvider>
        </KeyboardAvoidingView>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
  },
  leftGlow: {
    position: 'absolute',
    left: -40,
    top: 140,
    width: 260,
    height: 260,
    borderRadius: 200,
  },
  rightGlow: {
    position: 'absolute',
    right: -30,
    bottom: 0,
    width: 280,
    height: 320,
    borderRadius: 240,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },
});
