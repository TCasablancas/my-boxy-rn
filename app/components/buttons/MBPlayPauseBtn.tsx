import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Icons } from '../../common/icons/Icons';
import { IconsActions } from '../../common/icons/IconsActions';

export default function MBPlayPauseBtn({ isPlaying, onPress }: { isPlaying: boolean; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.playPauseButton} onPress={onPress}>
      {
        isPlaying ? 
          <View style={styles.playPauseButtonContent}>
            <Text style={styles.playPauseText}>Parar</Text>
            <IconsActions.stop width={16} height={12} strokeColor="#FFFFFF" />
          </View> : 
          <View style={styles.playPauseButtonContent}>
            <Text style={styles.playPauseText}>Continuar</Text>
            <IconsActions.play width={16} height={12} strokeColor="#FFFFFF" />
          </View>
      }
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  playPauseButton: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    borderRadius: 20,
    paddingHorizontal: 10,
    height: 26,
  },
  playPauseButtonContent: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  playPauseText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'SNPro-Regular',
  },
});