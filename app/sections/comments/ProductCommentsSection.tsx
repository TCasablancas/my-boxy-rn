import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import MBTitleWithLinkRight from '../../components/header/MBTitleWithLinkRight';
import { Icons } from '../../common/icons/Icons';
import { PrimaryColors } from '../../common/colors/Colors';
import UserComment from './UserComment';
import MBMainBtn, { MBMainBtnType } from '../../components/buttons/MBMainBtn';
import { IconsActions } from '../../common/icons/IconsActions';

export default function ProductCommentsSection({}) {
  return(
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <MBTitleWithLinkRight
          title="Comentários" 
          linkText="Ver todas" 
          icon={<Icons.arrowUpRight width={16} height={16} color="#007AFF" /> }
          onLinkPress={() => {}}
        />
      </View>
      <View style={styles.bodyWrapper}>
        <View style={styles.contentArea}>
          <View style={styles.mainCommentWrapper}>
            <UserComment 
              userName="João Silva"
              commentTime="2 horas atrás"
              comment="Este é um comentário de exemplo."
              onPress={() => {}}
            />
          </View>
          <View style={styles.repliedCommentWrapper}>
            <UserComment 
              userName="João Silva"
              commentTime="2 horas atrás"
              comment="Este é um comentário de exemplo."
              onPress={() => {}}
            />
          </View>
        </View>
        <MBMainBtn 
          title="comentar" 
          icon={<IconsActions.chatBubbleDouble width={16} height={16} strokeColor={PrimaryColors.primary} />}
          onPress={() => {}}
          buttonType={MBMainBtnType.OUTLINED}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bodyWrapper: {
    flex: 1,
    backgroundColor: '#EBEBEB',
    padding: 12,
    borderRadius: 12,
    gap: 16,
  },
  contentArea: {
    flex: 1,
  },
  mainCommentWrapper: {
    marginBottom: 8,
  },
  repliedCommentWrapper: {
    marginLeft: 32,
  },
});