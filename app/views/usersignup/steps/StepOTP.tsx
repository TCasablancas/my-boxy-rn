import React, { useEffect, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import MBMainBtn, { MBMainBtnType } from '../../../components/buttons/MBMainBtn';
import MBTextBtn from '../../../components/buttons/MBTextBtn';
import DSOtpCodeInput from '../../../components/form/MBOTPCodeInput';
import DSTitleDescripted from '../../../components/texts/MBTitleDescripted';
import { NeutralColors } from '../../../common/colors/Colors';
import { spacing, typography } from '../../../common/constants/Typgraphy';
import { StepProps } from '../../../common/types/Types';

interface StepOTPProps extends StepProps {
  otpLength?: number;
}

const RESEND_SECONDS = 60;

function clampOtpLength(length: number) {
  return Math.max(4, Math.min(6, length));
}

function formatCountdown(totalSeconds: number) {
  const safeSeconds = Math.max(0, totalSeconds);
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function getFakeOtpValue(length: number) {
  return Array.from({ length }, () => '1').join('');
}

export const StepOTP: React.FC<StepOTPProps> = ({ data, updateData, onNext, onBack, otpLength = 4 }) => {
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);
  const [hasTriedFinish, setHasTriedFinish] = useState(false);

  const resolvedOtpLength = clampOtpLength(otpLength);
  const normalizedOtp = data.otpCode.replace(/\D/g, '').slice(0, resolvedOtpLength);
  const expectedOtp = useMemo(() => getFakeOtpValue(resolvedOtpLength), [resolvedOtpLength]);

  const isOtpFilled = normalizedOtp.length === resolvedOtpLength;
  const isOtpValid = isOtpFilled && normalizedOtp === expectedOtp;
  const canResend = secondsLeft === 0;
  const shouldShowOtpError = hasTriedFinish && !isOtpValid;

  useEffect(() => {
    if (secondsLeft === 0) return;

    const timeout = setTimeout(() => {
      setSecondsLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearTimeout(timeout);
  }, [secondsLeft]);

  const handleOtpChange = (value: string) => {
    updateData({ otpCode: value.replace(/\D/g, '').slice(0, resolvedOtpLength) });
  };

  const handleResendCode = () => {
    if (!canResend) return;

    setHasTriedFinish(false);
    updateData({ otpCode: '' });
    setSecondsLeft(RESEND_SECONDS);
  };

  const handleFinish = () => {
    setHasTriedFinish(true);
    if (isOtpValid) {
      onNext();
    }
  };

  const destination = data.email || data.celular;
  const destinationLabel = destination ? ` ${destination}` : '';

  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        <DSTitleDescripted
          title="Valide seu código"
          description={`Um código de validação foi enviado para${destinationLabel}.`}
        />

        <View style={styles.otpSection}>
          <DSOtpCodeInput
            length={resolvedOtpLength}
            value={normalizedOtp}
            onChangeValue={handleOtpChange}
            autoFocus
          />
          {shouldShowOtpError && (
            <Text style={styles.errorText}>Código inválido. Tente novamente.</Text>
          )}
        </View>

        <View style={styles.resendRow}>
          <Pressable onPress={handleResendCode} disabled={!canResend}>
            <Text style={[styles.resendText, !canResend && styles.resendTextDisabled]}>
              Enviar código novamente
            </Text>
          </Pressable>

          <Text style={styles.countdownText}>
            {canResend ? 'Disponível agora' : `Renovar em ${formatCountdown(secondsLeft)}`}
          </Text>
        </View>
      </View>

      <View style={styles.footerDock}>
        <MBMainBtn
          title="Finalizar"
          onPress={handleFinish}
          buttonType={isOtpValid ? MBMainBtnType.NORMAL : MBMainBtnType.DISABLED}
        />
        {onBack && (
          <View style={styles.backButtonWrapper}>
            <MBTextBtn title="voltar" onPress={onBack} />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingBottom: 130,
  },
  contentWrapper: {
    gap: spacing.md,
  },
  otpSection: {
    width: '100%',
  },
  resendRow: {
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: spacing.sm,
  },
  resendText: {
    ...typography.bodyBold,
    color: NeutralColors.text,
    textDecorationLine: 'underline',
  },
  resendTextDisabled: {
    color: NeutralColors.textPlaceholder,
    textDecorationLine: 'none',
  },
  countdownText: {
    ...typography.caption,
    color: NeutralColors.textSecondary,
  },
  errorText: {
    ...typography.caption,
    color: '#D9042B',
    textAlign: 'center',
  },
  footerDock: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: spacing.sm,
    backgroundColor: NeutralColors.background,
  },
  backButtonWrapper: {
    flex: 1,
    position: 'relative',
    textAlign: 'center',
    width: '100%',
    marginTop: spacing.sm,
    alignItems: 'center',
  },
});
