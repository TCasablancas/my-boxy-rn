import { View, StyleSheet, Text , Image, ScrollView } from 'react-native';
import { NeutralColors } from '../../../common/colors/Colors';

interface MBHeaderUserConfigProps {
  userName?: string;
  userAlias?: string;
  userImageUrl?: string;
}

export default function MBHeaderUserConfig({
  userName, userAlias, userImageUrl
}: MBHeaderUserConfigProps) {
  return (
    <View style={styles.container}>
      <View style={styles.userInfoWrapper}>
        <View style={styles.userImageWrapper}>
          <Image source={{ uri: userImageUrl }} style={styles.userImage} />
        </View>
        <View style={styles.userTextWrapper}>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.userAlias}>@{userAlias}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: NeutralColors.background,
    borderRadius: 16,
  },
  userImageWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  userInfoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userTextWrapper: {
    marginLeft: 12,
  },
  userName: {
    fontSize: 16,
    fontFamily: 'SFMonoBold',
    letterSpacing: -0.5,
    color: '#000',
  },
  userAlias: {
    fontSize: 14,
    fontFamily: 'SFMonoRegular',
    letterSpacing: -0.5,
    color: '#888',
  },
});