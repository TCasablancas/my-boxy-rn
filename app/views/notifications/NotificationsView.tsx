import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icons } from '../../common/icons/Icons';
import { NeutralColors } from '../../common/colors/Colors';

import EmptyViewSection from '../../sections/empty/EmptyViewSection';
import MBTitledViewHeader from '../../components/header/MBTitledViewHeader';
import MBRoundedIconBtn from '../../components/buttons/MBRoundedIconBtn';

import MainNavigation from '../../common/navigation/MainNavigation';

export default function NotificationsView() {
  const safeAreaInsets = useSafeAreaInsets();
  const notifications: any[] = [
    // {
    //   title: 'Nova mensagem',
    //   message: 'Você recebeu uma nova mensagem de João.',
    //   date: '2024-06-05',
    // },
  ]; // Replace with actual notifications data
  const notificationImage = 'https://cdn3d.iconscout.com/3d/premium/thumb/empty-notification-3d-icon-png-download-10459245.png'; // Replace with actual image URL

  const renderNotificationItem = (notification: any, index: number) => (
    <View key={index} style={styles.notificationItem}>
      <Text style={{ fontWeight: 'bold' }}>{notification.title}</Text>
      <Text>{notification.message}</Text>
      <Text style={{ color: '#888' }}>{notification.date}</Text>
    </View>
  );

  const renderEmptyView = () => (
    <View style={{ top: '60%', alignSelf: 'center' }}>
      <EmptyViewSection
        title="Sem notificações"
        description="Você não possui notificações no momento."
        imageSource={notificationImage}
      />
    </View>
  );

  return (
    <SafeAreaProvider style={{ paddingBottom: safeAreaInsets.bottom }}>
      <MBTitledViewHeader 
        title="Notificações"
        btnsLeft={<MBRoundedIconBtn 
          icon={<Icons.arrowBack width={16} height={16} strokeColor={NeutralColors.textSecondary} />} 
          onPress={() => { MainNavigation.pop(); }}
        />}
      />
      <ScrollView>
        { notifications.length > 0 ? notifications.map(renderNotificationItem) : renderEmptyView() }
      </ScrollView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});