import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { IconsNavigation } from '../../../common/icons/IconsNavigation';

interface MBLocationTagProps {
  locationName: string;
  onPress: () => void;
}

export default function MBLocationTag({ 
    locationName, onPress 
}: MBLocationTagProps) {
  return (
    <TouchableOpacity style={styles.locationTag} onPress={onPress}>
      <IconsNavigation.pin width={12} height={12} />
      <Text style={styles.locationText}>{locationName}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  locationTag: {
    backgroundColor: '#EBEBEB',
    borderRadius: 100,
    paddingHorizontal: 10,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  locationText: {
    fontSize: 12,
    fontFamily: 'SFMonoRegular',
    letterSpacing: -0.5,
    color: '#333',
  },
});