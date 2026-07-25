import React from 'react';
import { Animated, KeyboardAvoidingView, Platform, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { MBStepperHeader } from '../../components/stepper/MBStepperHeader';
import { spacing } from '../../common/constants/Typgraphy';
import { KeyboardScrollProvider } from '../../common/contexts/KeyboardScrollContext';
import { StepSucesso } from './steps/StepSucesso';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { CadastroScreenProps, USER_SIGNUP_STEP_LABELS } from './UserSignupModel';
import { useUserSignupViewModel } from './UserSignupViewModel';
import MainNavigation from '../../common/navigation/MainNavigation';
import MBRoundedIconBtn from '../../components/buttons/MBRoundedIconBtn';
import MBTitledViewHeader from '../../components/header/MBTitledViewHeader';
import { Icons } from '../../common/icons/Icons';
import { NeutralColors } from '../../common/colors/Colors';

export default function UserSignupView({ onFinish }: CadastroScreenProps) {
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
    <SafeAreaProvider style={[styles.container, { marginTop: safeArea.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor={NeutralColors.backgroundAlt} />
      <MBTitledViewHeader 
        title="Cadastro"
        btnsLeft={<MBRoundedIconBtn 
          icon={<Icons.arrowBack width={16} height={16} strokeColor={NeutralColors.textSecondary} />} 
          onPress={() => { MainNavigation.pop(); }}
        />}
      />
      <View style={{ paddingHorizontal: spacing.lg,}}>
        <MBStepperHeader steps={USER_SIGNUP_STEP_LABELS} currentIndex={stepIndex} />
      </View>

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
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  mainWrapper: {
    width: '100%',
    height: '100%',
  },
  container: {
    // flex: 1,
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
    paddingBottom: spacing.md,
    paddingHorizontal: spacing.lg,
  },
});
