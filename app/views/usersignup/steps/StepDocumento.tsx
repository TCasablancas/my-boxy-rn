import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MBMainInput } from '../../../components/form/MBMainInput';
import { NeutralColors } from '../../../common/colors/Colors';
import { spacing, typography } from '../../../common/constants/Typgraphy';
import { isValidCPF } from '../../../common/constants/Validators';
import { maskCPF } from '../../../common/constants/Masks';
import { StepProps } from '../../../common/types/Types';
import MBMainBtn, { MBMainBtnType } from '../../../components/buttons/MBMainBtn';
import MBTextBtn from '../../../components/buttons/MBTextBtn';
import MBTitleDescripted from '../../../components/texts/MBTitleDescripted';

export const StepDocumento: React.FC<StepProps> = ({ data, updateData, onNext, onBack }) => {
  const [touched, setTouched] = useState(false);

  const cpfError = useMemo(() => {
    if (!touched) return null;
    return isValidCPF(data.cpf) ? null : 'CPF inválido, confira os números';
  }, [data.cpf, touched]);

  const canContinue = isValidCPF(data.cpf);

  const handleContinue = () => {
    setTouched(true);
    if (canContinue) onNext();
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        <MBTitleDescripted 
          title="Estamos quase lá..."
          description="Pedimos seu CPF para vários itens de segurança. Ele não aparece para outros usuários."
        />

        <MBMainInput
          label="CPF"
          placeholder="000.000.000-00"
          value={data.cpf}
          onChangeText={(text) => updateData({ cpf: maskCPF(text) })}
          onBlur={() => setTouched(true)}
          error={cpfError}
          keyboardType="number-pad"
          returnKeyType="done"
          maxLength={14}
          leftIcon={<Text style={styles.lockIcon}>🔒</Text>}
        />
      </View>

      <View style={styles.footerDock}>
        <MBMainBtn 
          title='Continuar' 
          onPress={handleContinue} 
          buttonType={ !canContinue ? MBMainBtnType.DISABLED : MBMainBtnType.NORMAL } 
        />
        {onBack && <View style={styles.backButtonWrapper}>
          <MBTextBtn title="voltar" onPress={onBack} />
        </View>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 130,
  },
  contentWrapper: {
    gap: spacing.sm,
  },
  title: {
    ...typography.h1,
    color: NeutralColors.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body,
    color: NeutralColors.textSecondary,
    marginBottom: spacing.lg,
  },
  footerDock: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: spacing.sm,
    backgroundColor: NeutralColors.background,
  },
  lockIcon: {
    fontSize: 16,
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
