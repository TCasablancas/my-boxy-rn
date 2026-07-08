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

type UserProfileViewNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function UserProfileView() {
  const navigation = useNavigation<UserProfileViewNavigationProp>();
  const safeAreaInsets = useSafeAreaInsets();
  const paddingTop = safeAreaInsets.top + 40; 

  const { 
    userName, 
    userAlias 
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
            title="Meu Perfil"
            btnsRight={<MBRoundedIconBtn 
              icon={<Icons.barcode width={16} height={16} />} 
              onPress={() => {}}
            />}
          />
        </View>
        <ScrollView style={[styles.scrollViewWrapper, { paddingTop: paddingTop }]}>
          <View style={styles.profileHeader}>
            <Image source={{ uri: 'https://example.com/profile-pic.jpg' }} style={styles.profileImage} />
            <Text style={styles.userName}>{userName}</Text>
            <Text style={styles.userAlias}>@{userAlias}</Text>
          </View>
          {/* Additional profile content can go here */}
        </ScrollView>
        <View style={styles.bottomButtonWrapper}>
          <MBMainBtn title="voltar para home" onPress={handleBackToHome} />
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PrimaryColors.background,
  },
  scrollViewWrapper: {
    flex: 1,
    backgroundColor: 'white',
    marginHorizontal: 16,
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
    flex: 1,
    padding: 16,
    zIndex: 1,
  },
  bottomButtonWrapper: {
    padding: 16,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});