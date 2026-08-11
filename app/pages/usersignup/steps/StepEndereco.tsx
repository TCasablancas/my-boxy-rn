import React, { useState } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { MBMainInput } from '../../../components/ui/form/MBMainInput';
import { NeutralColors, PrimaryColors } from '../../../common/colors/Colors';
import { spacing, typography } from '../../../common/constants/Typgraphy';
import { isValidCEP } from '../../../common/constants/Validators';
import { maskCEP } from '../../../common/constants/Masks';
import { fetchAddressByCEP } from '../../../common/constants/CEP';
import { StepProps } from '../../../common/types/Types';
import MBMainBtn from '../../../components/ui/buttons/MBMainBtn';
import MBTextBtn from '../../../components/ui/buttons/MBTextBtn';
import MBTitleDescripted from '../../../components/ui/texts/MBTitleDescripted';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ScrollViewKeyboard from '../../../sections/global/ScrollViewKeyboard';
import { useKeyboard } from '../../../common/constants/UseKeyboard';

export const StepEndereco: React.FC<StepProps> = ({ data, updateData, onNext, onBack }) => {
  const [buscandoCEP, setBuscandoCEP] = useState(false);
  const [cepError, setCepError] = useState<string | null>(null);

  const handleChangeCEP = async (text: string) => {
    const masked = maskCEP(text);
    updateData({ endereco: { ...data.endereco, cep: masked } });
    setCepError(null);

    if (isValidCEP(masked)) {
      setBuscandoCEP(true);
      try {
        const endereco = await fetchAddressByCEP(masked);
        updateData({
          endereco: {
            ...data.endereco,
            cep: masked,
            logradouro: endereco.logradouro,
            bairro: endereco.bairro,
            cidade: endereco.cidade,
            uf: endereco.uf,
            preenchido: true,
          },
        });
      } catch (err) {
        setCepError(err instanceof Error ? err.message : 'Não foi possível buscar o CEP');
      } finally {
        setBuscandoCEP(false);
      }
    }
  };

  const hasEndereco = isValidCEP(data.endereco.cep) && !!data.endereco.logradouro;

  const handleContinue = () => {
    if (hasEndereco) {
      updateData({ endereco: { ...data.endereco, preenchido: true } });
    }
    onNext();
  };

  const handleSkip = () => {
    updateData({
      endereco: { ...data.endereco, preenchido: false },
    });
    onNext();
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <ScrollViewKeyboard
        children={
          <>
            <View style={styles.contentWrapper}>
              <MBTitleDescripted 
                colorTitle={PrimaryColors.primaryDark}
                title="Seu local principal"
                description="Isso ajuda a calcular fretes e onde seus produtos serão entregues. Você pode preencher depois, se preferir."
              />

              <MBMainInput
                label="CEP"
                placeholder="00000-000"
                value={data.endereco.cep}
                onChangeText={handleChangeCEP}
                error={cepError}
                loading={buscandoCEP}
                keyboardType="number-pad"
                maxLength={9}
                returnKeyType="next"
              />

            {hasEndereco && (
              <>
                <MBMainInput
                  label="Endereço"
                  value={data.endereco.logradouro}
                  onChangeText={(text) => updateData({ endereco: { ...data.endereco, logradouro: text } })}
                  returnKeyType="next"
                />

                <View style={styles.row}>
                  <View style={styles.numeroField}>
                    <MBMainInput
                      label="Número"
                      value={data.endereco.numero}
                      onChangeText={(text) => updateData({ endereco: { ...data.endereco, numero: text } })}
                      keyboardType="number-pad"
                      returnKeyType="next"
                    />
                  </View>
                  <View style={styles.complementoField}>
                    <MBMainInput
                      label="Complemento"
                      placeholder="Opcional"
                      value={data.endereco.complemento}
                      onChangeText={(text) => updateData({ endereco: { ...data.endereco, complemento: text } })}
                      returnKeyType="next"
                    />
                  </View>
                </View>

                <MBMainInput
                  label="Bairro"
                  value={data.endereco.bairro}
                  onChangeText={(text) => updateData({ endereco: { ...data.endereco, bairro: text } })}
                  returnKeyType="next"
                />

                <View style={styles.row}>
                  <View style={styles.cidadeField}>
                    <MBMainInput
                      label="Cidade"
                      value={data.endereco.cidade}
                      onChangeText={(text) => updateData({ endereco: { ...data.endereco, cidade: text } })}
                      returnKeyType="next"
                    />
                  </View>
                  <View style={styles.ufField}>
                    <MBMainInput
                      label="UF"
                      value={data.endereco.uf}
                      onChangeText={(text) => updateData({ endereco: { ...data.endereco, uf: text.toUpperCase() } })}
                      maxLength={2}
                      autoCapitalize="characters"
                      returnKeyType="done"
                    />
                  </View>
                </View>
              </>
            )}
            </View>
          </>
      } />

      <View style={[
        styles.buttonWrapper, 
        { marginBottom: useKeyboard() ? -46 : 0 }
      ]}>
        <MBMainBtn 
          title={'continuar'}
          onPress={handleContinue}
        />
        <View style={styles.subButtonRow}>
          {onBack && <MBTextBtn title="voltar" onPress={onBack} />}
          <MBTextBtn title="pular esta etapa" onPress={handleSkip} />
        </View>
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  numeroField: { flex: 1 },
  complementoField: { flex: 2 },
  cidadeField: { flex: 2 },
  ufField: { flex: 1 },
  subButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  buttonWrapper: {
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    borderTopWidth: 1,
    borderTopColor: NeutralColors.background,
    paddingTop: spacing.lg,
  }
});
