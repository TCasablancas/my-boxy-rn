import { StyleSheet, Platform, KeyboardAvoidingView, StatusBar, ScrollView, Keyboard } from 'react-native';
import { spacing } from '../../common/constants/Typgraphy';

export default function ScrollViewKeyboard({ children }: { children: React.ReactNode }) {
  const verticalOffset = Platform.OS === 'ios' ? 0 : StatusBar.currentHeight || 0;
  
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={verticalOffset}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        style={styles.container}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xxl,
  },
  container: {
    flex: 1,
  },
});