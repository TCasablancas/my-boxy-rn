import { View } from 'react-native';
import LoginView from './login.view';
import { styles } from './styles';
import MBRoundedIconBtn from '../../components/ui/buttons/MBRoundedIconBtn';
import { NeutralColors } from '../../common/colors/Colors';
import { Icons } from '../../common/icons/Icons';
import MainNavigation from '../../common/navigation/MainNavigation';
import SafeAreaView from '../../components/sections/global/SafeAreaView';

export default function LoginPage() {
  return (
    <SafeAreaView 
      title="Login"
      leftBtn={<MBRoundedIconBtn 
        icon={<Icons.arrowBack width={16} height={16} strokeColor={NeutralColors.textSecondary} />} 
        onPress={() => { MainNavigation.pop(); }}
      />}
    >
      <View style={styles.container}>
        <LoginView />
      </View>
    </SafeAreaView>
  );
}