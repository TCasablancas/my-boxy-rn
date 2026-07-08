import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import MBTitleWithLinkRight from '../../components/header/MBTitleWithLinkRight';
import { Icons } from '../../common/constants/Icons';
import { NeutralColors } from '../../common/colors/Colors';
import MBHeaderUserComment from '../../components/header/MBHeaderUserComment';
import { IconsNavigation } from '../../common/constants/IconsNavigation';
import UserComment from './UserComment';

export default function ProductCommentsSection({}) {
  return(
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <MBTitleWithLinkRight
          title="Avaliações" 
          linkText="Ver todas" 
          icon={<Icons.arrowUpRight width={16} height={16} color="#007AFF" /> }
          onLinkPress={() => {}}
        />
      </View>
      <View style={styles.bodyWrapper}>
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
    marginVertical: 4,
  },
  bodyWrapper: {
    flex: 1,
    marginTop: 8,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
  },
  mainCommentWrapper: {
    marginBottom: 8,
  },
  repliedCommentWrapper: {
    marginLeft: 32,
  },
});