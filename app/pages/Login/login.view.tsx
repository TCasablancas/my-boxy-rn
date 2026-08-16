import React from 'react';
import { View, Text } from 'react-native';
import { NeutralColors, PrimaryColors } from '../../common/colors/Colors';
import { Icons } from '../../common/icons/Icons';
import { styles } from './styles';
import { USER_LOGIN_VIEW_TITLE, USER_LOGIN_VIEW_DESCRIPTION } from '../../common/strings/MainUserStrings';

import MBTitleDescripted from '../../components/ui/texts/MBTitleDescripted';
import MBRoundedIconBtn from '../../components/ui/buttons/MBRoundedIconBtn';
import MBTitledViewHeader from '../../components/ui/header/MBTitledViewHeader';
import MBTextBtn, { MBTextBtnSize } from '../../components/ui/buttons/MBTextBtn';

import MainNavigation from '../../common/navigation/MainNavigation';
import LoginForm from './component/login.form';
import { Fonts } from '../../common/constants/Fonts';

export default function LoginView() {
  return (
    <>
      <View style={styles.topContentWrapper}>
        <MBTitleDescripted description={<Text>{USER_LOGIN_VIEW_DESCRIPTION}</Text>} />
      </View>
      
      <LoginForm />

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4, marginTop: 16 }}>
        <Text style={{...Fonts.LexendLight12}}>ainda não possui uma conta?</Text>
        <MBTextBtn 
          title={'cadastre-se agora.'} 
          size={MBTextBtnSize.XSMALL}
          textColor={PrimaryColors.mainBlue} 
          onPress={() => { MainNavigation.navigate('RegisterView'); }}
        />
      </View>

      <View style={styles.footerButtonsWrapper}>
        <MBTextBtn 
          title={'Política de Privacidade'} 
          size={MBTextBtnSize.XSMALL}
          textColor={NeutralColors.textSecondary} 
        />
        <MBTextBtn 
          title={' Termos de Serviço'} 
          size={MBTextBtnSize.XSMALL}
          // textColor={NeutralColors.textSecondary} 
        />
      </View>
    </>
  );
}