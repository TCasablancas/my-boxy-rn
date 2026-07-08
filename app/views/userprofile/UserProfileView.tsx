import { View, StyleSheet, Text, StatusBar, Image, ScrollView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { getUserProfileViewModel } from './UserProfileViewModel';
import MBTitledViewHeader from '../../components/header/MBTitledViewHeader';
import MBRoundedIconBtn from '../../components/buttons/MBRoundedIconBtn';
import { Icons } from '../../common/constants/Icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MBMainBtn from '../../components/buttons/MBMainBtn';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { PrimaryColors } from './../../common/colors/Colors';
import { MBMainInput } from '../../components/form/MBMainInput';

type UserProfileViewNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function UserProfileView() {
  const navigation = useNavigation<UserProfileViewNavigationProp>();
  const safeAreaInsets = useSafeAreaInsets();
  const paddingTop = safeAreaInsets.top + 40; 

  const { 
    userName, 
    userAlias,
    userEmail,
    userPhone,
    userCPF,
    userBirthDate,
  } = getUserProfileViewModel();

  function handleBackToHome() {
    navigation.popToTop();
  }

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={'light-content'} backgroundColor={'#F0E5E4'} />
      <View style={styles.container}>
        <View style={styles.headerWrapper}>
          <MBTitledViewHeader 
            title="Meus Dados"
            btnsLeft={<MBRoundedIconBtn 
              icon={<Icons.arrowBack width={16} height={16} />} 
              onPress={handleBackToHome} 
            />}
            btnsRight={<MBRoundedIconBtn 
              icon={<Icons.barcode width={16} height={16} />} 
              onPress={() => {}}
            />}
          />
        </View>
        <View style={styles.scrollViewWrapper}>
          <ScrollView 
            style={styles.scrollView} 
            contentContainerStyle={{ flexGrow: 1, gap: 16, }} 
            contentInset={{ top: 0 }} 
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.profileHeader}>
              <Image source={{ uri: 'https://example.com/profile-pic.jpg' }} style={styles.profileImage} />
              <Text style={styles.userName}>{userName}</Text>
              <Text style={styles.userAlias}>@{userAlias}</Text>
            </View>
            <MBMainInput
              label="Nome Completo"
              placeholder="Ex: Maria Oliveira"
              value={userName}
              onChangeText={(text) => {}}
              // onBlur={() => setTouched((t) => ({ ...t, nome: true }))}
              // error={nomeError}
              autoCapitalize="words"
              autoCorrect={false}
              returnKeyType="next"
            />
            <MBMainInput 
              label="Apelido"
              value={userAlias}
              placeholder="Ex: Maria Oliveira"
              onChangeText={(text: string) => {
                // Atualize o estado do apelido do usuário aqui
              }}
              autoCapitalize="words"
              autoCorrect={false}
              returnKeyType="next"
            />
            <MBMainInput 
              label="CPF"
              value={userCPF}
              placeholder="Ex: 123.456.789-00"
              onChangeText={(text: string) => {
                // Atualize o estado do CPF do usuário aqui
              }}
              autoCapitalize="words"
              autoCorrect={false}
              returnKeyType="next"
            />
            <MBMainInput 
              label="Data de Nascimento"
              value={userBirthDate}
              placeholder="Ex: 01/01/2000"
              onChangeText={(text: string) => {
                // Atualize o estado do apelido do usuário aqui
              }}
              autoCapitalize="words"
              autoCorrect={false}
              returnKeyType="next"
            />
            <MBMainInput 
              label="Email"
              value={userEmail}
              placeholder="Ex: maria.oliveira@example.com"
              onChangeText={(text: string) => {
                // Atualize o estado do apelido do usuário aqui
              }}
              autoCapitalize="words"
              autoCorrect={false}
              returnKeyType="next"
            />
            <MBMainInput 
              label="Telefone"
              value={userPhone}
              placeholder="Ex: +55 11 91234-5678"
              onChangeText={(text: string) => {
                // Atualize o estado do telefone do usuário aqui
              }}
              autoCapitalize="words"
              autoCorrect={false}
              returnKeyType="next"
            />
            <View style={styles.bottomButtonWrapper}>
              <MBMainBtn title="finalizar edição" onPress={() => {}} />
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: PrimaryColors.background,
  },
  scrollViewWrapper: {
    // flex: 1,
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    padding: 16,
    borderRadius: 12,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  scrollView: {
    width: '100%',
    // height: '100%',
  },
  profileHeader: {
    paddingVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  userAlias: {
    fontSize: 16,
    color: 'gray',
  },
  headerWrapper: {
    // flex: 1,
    padding: 16,
    zIndex: 1,
  },
  bottomButtonWrapper: {
    // flex: 1,
  },
});