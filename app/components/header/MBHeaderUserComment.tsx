import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { IconsActions } from '../../common/constants/IconsActions';
import { IconsNavigation } from '../../common/constants/IconsNavigation';

interface MBHeaderUserCommentProps {
  userName: string;
  commentTime: string;
  onPress: () => void;
}

export default function MBHeaderUserComment({ 
    userName, commentTime, onPress 
}: MBHeaderUserCommentProps) {
  return (
    <View style={styles.container}>
      <View style={styles.userInfoContainer}>
        <View style={styles.userPicWrapper}>
          <Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlGEEmPFCYfOinYKWkbGUjILmg2S8hHj6qXAvQ5kaA2w&s=10' }} style={styles.userImage} />
        </View>
        <View style={styles.userDataWrapper}>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.commentTime}>{commentTime}</Text>
        </View>
        <TouchableOpacity style={{alignItems: 'flex-end'}} onPress={onPress}>
          <IconsNavigation.moreHorizontal width={16} height={16} color="#007AFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  readMore: {
    fontSize: 14,
    fontFamily: 'SNPro-Bold',
    color: '#007AFF', // Blue color
    marginTop: 4,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userPicWrapper: {
    width: 30,
    height: 30,
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: 8,
  },
  userImage: {
    width: '100%',
    height: '100%',
  },
  userName: {
    fontSize: 14,
    fontFamily: 'SNPro-Bold',
    color: '#000',
  },
  commentTime: {
    fontSize: 12,
    fontFamily: 'SNPro-Regular',
    color: '#b7b7b7',
  },
  userDataWrapper: {
    flex: 1,
    marginRight: 8,
    flexDirection: 'column',
  },
});