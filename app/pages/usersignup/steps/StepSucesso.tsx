import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { GradientColors, NeutralColors, PrimaryColors } from '../../../common/colors/Colors';
import { spacing, typography } from '../../../common/constants/Typgraphy';
import { CadastroFormData } from '../../../common/types/Types';
import MBTextBtn from '../../../components/ui/buttons/MBTextBtn';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DSEmptyImageView from '../../../components/ui/global/MBEmptyImage';

interface StepSucessoProps {
  data: CadastroFormData;
  onGoHome: () => void;
}

export const StepSucesso: React.FC<StepSucessoProps> = ({ data, onGoHome }) => {

  const safeArea = useSafeAreaInsets();

  return (
    <LinearGradient 
      colors={GradientColors.neutralGradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.mainWrapper}
    >
      <View style={[styles.container, { marginBottom: safeArea.bottom, marginTop: safeArea.top }]}>
        <View style={styles.contentWrapper}>
          <DSEmptyImageView />

          <Text style={styles.title}>Prontinho, {data.nomeCompleto.split(' ')[0]}!</Text>
          <Text style={styles.subtitle}>
            Sua conta foi criada com sucesso. Agora é hora de cadastrar seus primeiros produtos e
            deixar sua loja com a sua cara.
          </Text>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Seus Dados</Text>
            <Text style={styles.summaryValue}>@{data.username}</Text>
          </View>
        </View>

        <View style={styles.buttonWrapper}>
          <MBTextBtn title="Ir para o início" onPress={onGoHome} />
        </View>
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    height: '100%',
  },
  contentWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: spacing.xxl,
    paddingHorizontal: spacing.lg,
  },
  badge: {
    width: 84,
    height: 84,
    borderRadius: 42,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  badgeIcon: {
    fontSize: 40,
  },
  title: {
    ...typography.h1,
    color: NeutralColors.text,
    textAlign: 'center',
    marginBottom: spacing.sm,
    marginTop: spacing.lg,
  },
  subtitle: {
    ...typography.body,
    color: NeutralColors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  summaryCard: {
    backgroundColor: NeutralColors.backgroundAlt,
    borderRadius: 14,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.xl,
    width: '100%',
  },
  summaryLabel: {
    ...typography.caption,
    color: NeutralColors.textSecondary,
  },
  summaryValue: {
    ...typography.h2,
    color: PrimaryColors.primary,
    marginTop: spacing.xs,
  },
  button: {
    width: '100%',
  },
  buttonWrapper: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    width: '100%',
  },
});
