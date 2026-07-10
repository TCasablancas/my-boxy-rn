import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Icons } from '../../common/icons/Icons';
import { PrimaryColors } from '../../common/colors/Colors';

interface MBProfilePicEditableProps {
  imageUrl: string;
  onPressEdit: () => void;
}

export default function MBProfilePicEditable({ 
  imageUrl, onPressEdit 
}: MBProfilePicEditableProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPressEdit}>
      <View style={styles.imageWrapper}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
      </View>
      <View style={styles.editIconWrapper}>
        <Icons.camera strokeColor="white" width={16} height={16} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  imageWrapper: {
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: 'white',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: PrimaryColors.primary,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#000',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'SNPro-Regular',
  },
  editIconWrapper: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: PrimaryColors.primary,
    padding: 8,
    borderRadius: 16,
  },
});