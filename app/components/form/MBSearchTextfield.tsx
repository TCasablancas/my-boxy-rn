import { View, StyleSheet, Text, TextInput, Pressable } from 'react-native';
import { IconsActions } from '../../common/constants/IconsActions';

interface MBSearchTextfieldProps {
  value?: string;
  onChangeText?: (text: string) => void;
  onPressClear?: () => void;
}

export default function MBSearchTextfield({
  value = '',
  onChangeText,
  onPressClear,
}: MBSearchTextfieldProps) {
  return (
    <View style={styles.container}>
      <View style={styles.searchbarWrapper}>
        <IconsActions.search width={16} height={16} />
        <TextInput
          style={styles.searchInput}
          placeholder="Digite sua busca..."
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor="#d3d3d3"
        />
        <Pressable onPress={onPressClear}>
          <IconsActions.backspace width={16} height={16} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  searchbarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    width: '100%',
    height: 40,
  },
  searchIconWrapper: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    height: 40,
    tintColor: '#000',
    fontFamily: 'SNPro-Regular',
    marginTop: 3,
    marginLeft: 8,
  },
  clearIconWrapper: {
    marginLeft: 8,
  },
});