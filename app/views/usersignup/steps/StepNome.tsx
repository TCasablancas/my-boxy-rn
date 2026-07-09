import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MBMainInput } from '../../../components/form/MBMainInput';
import LinearGradient from 'react-native-linear-gradient';
import { GradientColors, PrimaryColors } from '../../../common/colors/Colors';
import { spacing, typography } from '../../../common/constants/Typgraphy';
import { isValidFullName, isValidUsername } from '../../../common/constants/Validators';
import { StepProps } from '../../../common/types/Types';
import DSMainButton, { MBMainBtnType } from '../../../components/buttons/MBMainBtn';
import MBTitleDescripted from '../../../components/texts/MBTitleDescripted';

export const StepNome: React.FC<StepProps> = ({ data, updateData, onNext }) => {
  const [touched, setTouched] = useState({ nome: false, username: false });

  const nomeError = useMemo(() => {
    if (!touched.nome) return null;
    return isValidFullName(data.nomeCompleto) ? null : 'Digite seu nome completo';
  }, [data.nomeCompleto, touched.nome]);

  const usernameError = useMemo(() => {
    if (!touched.username) return null;
    if (data.username.length === 0) return 'Escolha um nome de usuário';
    return isValidUsername(data.username)
      ? null
      : 'Use apenas letras minúsculas, números, "." ou "_" (3 a 20 caracteres)';
  }, [data.username, touched.username]);

  const canContinue = isValidFullName(data.nomeCompleto) && isValidUsername(data.username);

  const handleContinue = () => {
    setTouched({ nome: true, username: true });
    if (canContinue) onNext();
  };

  return (
    <View style={styles.container}>
      <MBTitleDescripted 
        title="Iniciar cadastro"
        description="Primeiro, como todos vão te encontrar por aqui?"
      />

      <View style={styles.inputWrapper}>
        <MBMainInput
          label="Nome Completo"
          placeholder="Ex: Maria Oliveira"
          value={data.nomeCompleto}
          onChangeText={(text) => updateData({ nomeCompleto: text })}
          onBlur={() => setTouched((t) => ({ ...t, nome: true }))}
          error={nomeError}
          autoCapitalize="words"
          autoCorrect={false}
          returnKeyType="next"
        />

        <MBMainInput
          label="Nome de Usuário"
          placeholder="Ex: maria.ceramica"
          value={data.username}
          onChangeText={(text) => updateData({ username: text.toLowerCase().replace(/\s/g, '') })}
          onBlur={() => setTouched((t) => ({ ...t, username: true }))}
          error={usernameError}
          helperText={!usernameError ? 'Esse será seu @ para todos' : undefined}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="done"
        />
      </View>

      <View style={styles.footerDock}>
        <DSMainButton 
          title="continuar"
          onPress={handleContinue}
          buttonType={!canContinue ? MBMainBtnType.DISABLED : MBMainBtnType.NORMAL}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputWrapper: {
    gap: 16,
  },
  footerDock: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
