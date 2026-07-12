import React, { useMemo, createElement } from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import MBMainBtn from '../../components/buttons/MBMainBtn';
import { PrimaryColors } from '../colors/Colors';
import { MBMainBtnType } from '../../components/buttons/MBMainBtn';
import MainNavigation, { registerNavigationTarget } from '../navigation/MainNavigation';
import UserSignupView from '../../views/usersignup/UserSignupView';
import MBEmptyImageView from '../../components/images/MBEmptyImageView';

registerNavigationTarget('UserSignupView', UserSignupView);

export function getBlockedTabBottomsheetTitle() {
  return 'Acesso restrito';
}

export function getBlockedTabBottomsheetDescription({ tabName }: { tabName?: string } = {}) {
  return `Faça login para acessar ${tabName || 'essa área do aplicativo'}.`;
}

export function renderBlockedTabBottomsheetContent() {
  return (
    <View style={[styles.container]}>
      <MBEmptyImageView />
      <View style={styles.buttonWrapper}>
        <MBMainBtn title="Entrar" onPress={() => { MainNavigation.navigate('Login'); }} />
      </View>
      <View style={styles.buttonWrapper}>
        <MBMainBtn 
          title="Criar conta" 
          buttonType={MBMainBtnType.LIGHT} 
          onPress={() => { MainNavigation.push('UserSignupView'); }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 16, 
    alignItems: 'center',
    paddingTop: 16,
  },
  title: {
    fontSize: 16,
    fontFamily: 'SNPro-Bold',
    color: '#1F2A44',
  },
  description: {
    fontSize: 13,
    fontFamily: 'SNPro-Regular',
    color: '#4B5875',
    lineHeight: 18,
  },
  buttonWrapper: {
    height: 46,
    width: '100%',
  },
});
