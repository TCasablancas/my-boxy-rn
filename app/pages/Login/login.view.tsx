import React from 'react';
import { View, Text } from 'react-native';
import { NeutralColors, PrimaryColors } from '../../common/colors/Colors';
import { Icons } from '../../common/icons/Icons';
import { styles } from './styles';

import MBTitleDescripted from '../../components/ui/texts/MBTitleDescripted';
import MBRoundedIconBtn from '../../components/ui/buttons/MBRoundedIconBtn';
import MBTitledViewHeader from '../../components/ui/header/MBTitledViewHeader';
import MBTextBtn, { MBTextBtnSize } from '../../components/ui/buttons/MBTextBtn';

import MainNavigation from '../../common/navigation/MainNavigation';
import LoginForm from './component/login.form';

export default function LoginView() {
  return (
    <>
      <MBTitledViewHeader 
        title="Login"
        btnsLeft={<MBRoundedIconBtn 
          icon={<Icons.arrowBack width={16} height={16} strokeColor={NeutralColors.textSecondary} />} 
          onPress={() => { MainNavigation.pop(); }}
        />}
      />
      <View style={styles.topContentWrapper}>
        <MBTitleDescripted 
          colorTitle={NeutralColors.white}
          title="Bem-vindo de volta!"
          description={
            <>
            <Text style={{color: PrimaryColors.primary}}>Se você já tem cadastro, faça login para continuar.</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.notSingedUpText}>Se ainda não tem, </Text>
              <MBTextBtn title={'clique aqui.'} textColor={PrimaryColors.mainBlue} size={MBTextBtnSize.LARGE} /> 
            </View>
            </>
          }
          alignment="center"
        />
      </View>
      
      <LoginForm />

      <Text style={styles.footerButtonsWrapper}>
        Ao criar sua conta, você concorda com a nossa.
        <MBTextBtn title={'Política de Privacidade e'} textColor={NeutralColors.textSecondary} />
        <MBTextBtn title={' Termos de Serviço'} textColor={NeutralColors.textSecondary} />
      </Text>
    </>
  );
}