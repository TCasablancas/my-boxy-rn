import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import MBHeaderUserComment from '../../components/header/MBHeaderUserComment';
import { IconsNavigation } from '../../common/icons/IconsNavigation';
import { NeutralColors } from '../../common/colors/Colors';

interface UserCommentProps {
  userName: string;
  commentTime: string;
  comment: string;
  onPress?: () => void;
}

export default function UserComment({
  userName, commentTime, comment, onPress
}: UserCommentProps) {
  return(
    <View style={styles.bodyWrapper}>
      <MBHeaderUserComment 
        userName={userName}
        commentTime={commentTime}
        onPress={onPress || (() => {})}
      />
      <View style={styles.commentTextWrapper}>
        <IconsNavigation.arrowTurnDownRight width={16} height={16} color={NeutralColors.border} />
        <Text style={styles.comment}>{comment}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  bodyWrapper: {
    flex: 1,
    // marginTop: 8,
    // backgroundColor: '#fff',
    // padding: 12,
    // borderRadius: 8,
  },
  comment: {
    fontSize: 14,
    fontFamily: 'SFMonoRegular',
    letterSpacing: -0.5,
    color: '#000',
    marginLeft: 4,
  },
  commentTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
});