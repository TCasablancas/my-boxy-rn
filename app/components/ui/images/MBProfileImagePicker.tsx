import React, { useCallback } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
// Requer: npm install react-native-image-picker (e configuração nativa de permissões de câmera/galeria)
import { launchImageLibrary } from 'react-native-image-picker';

interface MBProfileImagePickerProps {
  value?: string;
  onChange: (uri: string) => void;
  size?: number;
}

export default function MBProfileImagePicker({ 
  value, onChange, size = 96 
}: MBProfileImagePickerProps) {
  const handlePick = useCallback(async () => {
    const result = await launchImageLibrary({ mediaType: 'photo', quality: 0.8 });

    if (result.didCancel) return;
    if (result.errorMessage) {
      Alert.alert('Não foi possível abrir a galeria', result.errorMessage);
      return;
    }

    const uri = result.assets?.[0]?.uri;
    if (uri) onChange(uri);
  }, [onChange]);

  const dimension = { width: size, height: size, borderRadius: size / 2 };

  return (
    <TouchableOpacity onPress={handlePick} style={styles.wrapper}>
      <View style={[styles.circle, dimension]}>
        {value ? (
          <Image source={{ uri: value }} style={dimension} />
        ) : (
          <Text style={styles.placeholder}>Foto</Text>
        )}
      </View>
      <Text style={styles.action}>{value ? 'Trocar foto' : 'Adicionar foto'}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: { alignItems: 'center', gap: 8 },
  circle: {
    backgroundColor: '#EEF0F5',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  placeholder: { 
    fontSize: 12, 
    color: '#8A93A6' 
  },
  action: { 
    fontSize: 13, 
    fontWeight: '600', 
    color: '#3457D5' 
  },
});