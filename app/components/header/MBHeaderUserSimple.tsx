import { View, StyleSheet, Text, Pressable } from 'react-native';
import MyBoxyIcon from '../../../assets/images/my_boxy_icon.svg';
import { Icons } from '../../common/constants/Icons';
import MBRoundedIconBtn from '../buttons/MBRoundedIconBtn';
import { IconsCommunication } from '../../common/constants/IconsCommunication';

interface MBHeaderUserSimpleProps {
  userName: string;
  userAlias: string;
  onPressNotifications: () => void;
  onPressCart: () => void;
}

export default function MBHeaderUserSimple({ 
  userName, userAlias, onPressNotifications, onPressCart
}: MBHeaderUserSimpleProps) {
  return (
    <View style={styles.container}>
      <View style={styles.picWrapper}>
        <MyBoxyIcon width="40" height="40" />
      </View>
      <View style={styles.userDataWrapper}>
        <View style={styles.userNameWrapper}>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.userEmail}>{userAlias}</Text>
        </View>
        <Icons.chevronDown width={12} height={12} />
      </View>
      <View style={styles.iconsWrapper}>
        <MBRoundedIconBtn 
          icon={<IconsCommunication.notification width={16} height={16} />} 
          onPress={onPressNotifications} 
        />
        <MBRoundedIconBtn 
          icon={<Icons.cart width={16} height={16} />} 
          onPress={onPressCart} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  picWrapper: {
    width: 50,
    height: 50,
    marginRight: 10,
    padding: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userDataWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    margin: 'auto',
    left: 0,
    right: 0,
  },
  userNameWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  userName: {
    fontSize: 16,
    fontFamily: 'SNPro-Bold',
    textAlign: 'center',
    lineHeight: 14,
  },
  userEmail: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'SNPro-Regular',
    textAlign: 'center',
    lineHeight: 14,
  },
  iconsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
    gap: 8,
  },
});