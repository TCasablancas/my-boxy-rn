import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Animated } from 'react-native';
import { STORE_SIGNUP_STEP_LABELS } from './StoreSignupModel';
import { MBStepperHeader } from '../../components/stepper/MBStepperHeader';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardScrollProvider } from '../../common/contexts/KeyboardScrollContext';
import { spacing } from '../../common/constants/Typgraphy';
import { useStoreSignupViewModel } from './StoreSignupViewModel';
import MBMainBtn from '../../components/buttons/MBMainBtn';

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
  } = useStoreSignupViewModel();

  if (isComplete) {
    return (
      <View style={styles.successContainer}>
        <Text style={styles.successTitle}>Cadastro da loja concluído</Text>
        <MBMainBtn title="Voltar para início" onPress={handleFinish} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: safeArea.top + 40 }]}> 
      <MBStepperHeader steps={STORE_SIGNUP_STEP_LABELS} currentIndex={stepIndex} />

      <KeyboardAvoidingView
        style={styles.keyboardArea}
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    gap: 12,
  },
  successTitle: {
    fontSize: 18,
    fontFamily: 'SNPro-Bold',
    textAlign: 'center',
  },
});