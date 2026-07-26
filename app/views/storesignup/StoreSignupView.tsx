import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Animated, StatusBar } from 'react-native';
import { STORE_SIGNUP_STEP_LABELS } from './StoreSignupModel';
import { MBStepperHeader } from '../../components/stepper/MBStepperHeader';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardScrollProvider } from '../../common/contexts/KeyboardScrollContext';
import { spacing } from '../../common/constants/Typgraphy';
import { useStoreSignupViewModel } from './StoreSignupViewModel';
import MBMainBtn from '../../components/buttons/MBMainBtn';
import MBTitledViewHeader from '../../components/header/MBTitledViewHeader';
import MBRoundedIconBtn from '../../components/buttons/MBRoundedIconBtn';
import { NeutralColors } from '../../common/colors/Colors';
import { Icons } from '../../common/icons/Icons';
import MainNavigation from '../../common/navigation/MainNavigation';

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
      <View style={styles.successContainer}>
        <Text style={styles.successTitle}>Cadastro da loja concluído</Text>
        <MBMainBtn title="Voltar para início" onPress={handleFinish} />
      </View>
    );
  }

  return (
    <SafeAreaProvider style={[styles.container, { marginTop: safeArea.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor={NeutralColors.backgroundAlt} />
    {/* <View style={[styles.container, { paddingTop: safeArea.top + 40 }]}>  */}
      <MBTitledViewHeader 
        title="Cadastro"
        btnsLeft={<MBRoundedIconBtn 
          icon={<Icons.arrowBack width={16} height={16} strokeColor={NeutralColors.textSecondary} />} 
          onPress={() => { MainNavigation.pop(); }}
        />}
      />
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
            <Animated.View
              style={{
                opacity: fadeAnim,
                flex: 1,
                transform: [{ translateX: translateXAnim }],
              }}
            >
              {renderStep()}
            </Animated.View>
          </ScrollView>
        </KeyboardScrollProvider>
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: 'red',
    // height: '100%',
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