import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import MBMainBottomsheet from '../../components/ui/bottomsheet/MBMainBottomsheet';
import { NeutralColors, PrimaryColors } from '../../common/colors/Colors';

export default function UserFavoritesBottomsheet({
  visible,
  activeTab,
  selectedFilterId,
  options,
  onSelectFilter,
  onClose,
}) {
  return (
    <MBMainBottomsheet
      visible={visible}
      onClose={onClose}
      closeButton
      title="Filtrar curtidos"
      description={
        activeTab === 'products'
          ? 'Escolha como ordenar seus produtos favoritos.'
          : 'Escolha como ordenar suas lojas favoritas.'
      }
      content={
        <View style={styles.content}>
          {options.map((option) => {
            const isSelected = option.id === selectedFilterId;

            return (
              <Pressable
                key={option.id}
                style={[styles.optionBtn, isSelected && styles.optionBtnSelected]}
                onPress={() => {
                  onSelectFilter(option.id);
                  onClose();
                }}
              >
                <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
                  {option.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 8,
    paddingVertical: 4,
  },
  optionBtn: {
    width: '100%',
    minHeight: 42,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    justifyContent: 'center',
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
  },
  optionBtnSelected: {
    borderColor: PrimaryColors.primary,
    backgroundColor: '#F3FAF8',
  },
  optionText: {
    fontSize: 14,
    fontFamily: 'SNPro-Regular',
    color: NeutralColors.textSecondary,
  },
  optionTextSelected: {
    color: PrimaryColors.primary,
    fontFamily: 'SNPro-Bold',
  },
});
