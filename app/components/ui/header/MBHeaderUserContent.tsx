import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { Icons } from '../../../common/icons/Icons';
import { IconsActions } from '../../../common/icons/IconsActions';
import { IconsCommunication } from '../../../common/icons/IconsCommunication';

export default function MBHeaderUserContent({ 
    userName, userAlias
}: { userName: string; userAlias: string }) {
  return (
    <View style={styles.container}>
      <View style={styles.picWrapper}>
        <Image source={{ uri: '' }} style={styles.userPic} />
      </View>
      <View style={styles.userDataWrapper}>
        <Text style={styles.userName}>{userName}</Text>
        <Text style={styles.userEmail}>{userAlias}</Text>
      </View>
      <View style={styles.iconsWrapper}>
        <Pressable onPress={() => {}}>
          <IconsActions.search width={20} height={20} />
        </Pressable>
        {/* <Pressable onPress={() => {}}>
          <IconsCommunication.notification width={20} height={20} />
        </Pressable> */}
        <Pressable onPress={() => {}}>
          <Icons.cart width={20} height={20} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    backgroundColor: '#F0E5E4',
    flexDirection: 'row',
    alignItems: 'center',
  },
  picWrapper: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ccc',
    marginRight: 10,
    padding: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userPic: {
    width: '98%',
    height: '98%',
    borderRadius: 1000,
    backgroundColor: 'white',
  },
  userDataWrapper: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  userName: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'SFMonoHeavy'
    letterSpacing: -0.5,
  },
  userEmail: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'SFMonoRegular'
    letterSpacing: -0.5,
  },
  iconsWrapper: {
    marginLeft: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 26,
  },
});