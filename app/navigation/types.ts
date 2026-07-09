import { NavigatorScreenParams } from '@react-navigation/native';

export type MainTabParamList = {
  'início': undefined;
  curtidos: undefined;
  carteira: undefined;
  'notificações': undefined;
  compras: undefined;
  busca: undefined;
  mais: undefined;
};

export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<MainTabParamList> | undefined;
} & Record<string, undefined>;
