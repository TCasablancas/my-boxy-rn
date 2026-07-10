import { View, StyleSheet, Text , Image, ScrollView } from 'react-native';
import { getUserProfileViewModel } from './UserProfileViewModel';
import MBTitledViewHeader from '../../components/header/MBTitledViewHeader';
import MBRoundedIconBtn from '../../components/buttons/MBRoundedIconBtn';
import { Icons } from '../../common/icons/Icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MBMainBtn from '../../components/buttons/MBMainBtn';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { NeutralColors, PrimaryColors } from './../../common/colors/Colors';
import { MBMainInput } from '../../components/form/MBMainInput';
import MBProfilePicEditable from '../../components/images/MBProfilePicEditable';

type UserProfileViewNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function UserProfileView() {
  const navigation = useNavigation<UserProfileViewNavigationProp>();
  const safeAreaInsets = useSafeAreaInsets();
  const marioPic = "https://static.wikia.nocookie.net/herois/images/c/c4/MPSS_Mario.webp/revision/latest/thumbnail/width/360/height/360?cb=20220607201508&path-prefix=pt-br";

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
          contentContainerStyle={{ gap: 8 }} 
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.profileHeader}>
            <MBProfilePicEditable imageUrl={marioPic} onPressEdit={() => {}} />
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: 'white',
  },
  scrollViewWrapper: {
    backgroundColor: NeutralColors.background,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
  },
  scrollView: {
    width: '100%',
    height: '100%',
  },
  profileHeader: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: PrimaryColors.primary,
  },
  userName: {
    fontSize: 20,
    fontFamily: 'SNPro-Bold',
    textAlign: 'center',
  },
  userAlias: {
    fontSize: 16,
    color: 'gray',
    fontFamily: 'SNPro-Regular',
    textAlign: 'center',
  },
  headerWrapper: {
    padding: 16,
    zIndex: 1,
  },
  bottomButtonWrapper: {
  },
});