import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import MBMainBottomsheet from '../../components/bottomsheet/MBMainBottomsheet';
import MBSearchTextfield from '../../components/textfield/MBSearchTextfield';
import MBCategoryBtn from '../../components/buttons/MBCategoryBtn';
import MBSimpleTag from '../../components/tags/MBSimpleTag';
import MBMainBtn from '../../components/buttons/MBMainBtn';

/**
 * @typedef {{ id: string; title: string }} SearchTag
 * @typedef {{ id: string; title: string; icon: import('react').ReactNode }} SearchCategory
 */

/**
 * @param {{
 *   tags?: SearchTag[];
 *   categories?: SearchCategory[];
 *   isVisible: boolean;
 *   onClose: () => void;
 *   searchText: string;
 *   onChangeSearchText: (text: string) => void;
 *   onClearSearch: () => void;
 * }} props
 */

export const HomeSearchBottomsheet = ({ 
  tags = [],
  categories = [],
  isVisible, 
  onClose, 
  searchText, 
  onChangeSearchText, 
  onClearSearch,
}) => {
  const [selectedTagIds, setSelectedTagIds] = useState([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);

  useEffect(() => {
    if (!isVisible) {
      setSelectedTagIds([]);
      setSelectedCategoryIds([]);
    }
  }, [isVisible]);

  function handleToggleTag(tagId) {
    setSelectedTagIds((prev) => (
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    ));
  }

  function handleToggleCategory(categoryId) {
    setSelectedCategoryIds((prev) => (
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    ));
  }

  function handleClose() {
    onClose();
  }

  return (
    <MBMainBottomsheet
      visible={isVisible}
      onClose={handleClose}
      content={
        <View style={styles.searchContainer}>
          <View>
            <MBSearchTextfield
              value={searchText}
              onChangeText={onChangeSearchText}
              onPressClear={onClearSearch}
            />
          </View>
          <View style={styles.searchTagsWrapper}>
            {tags.map((tag) => (
              <MBSimpleTag
                key={tag.id}
                tag={tag}
                isSelected={selectedTagIds.includes(tag.id)}
                onPress={() => handleToggleTag(tag.id)}
              />
            ))}
          </View>
          <View style={styles.searchCategoriesWrapper}>
            <Text>Categorias</Text>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 8 }}
            >
              {categories.map((category) => (
                <MBCategoryBtn 
                  key={category.id} 
                  title={category.title} 
                  icon={category.icon} 
                  isSelected={selectedCategoryIds.includes(category.id)}
                  onPress={() => handleToggleCategory(category.id)} 
                />
              ))}
            </ScrollView>
          </View>
          <View style={styles.searchContentWrapper}>

          </View>

          <MBMainBtn title="Buscar" onPress={() => {}} />
        </View>
      }
    />
  );
};

export const HomeChartBottomsheet = ({ isVisible, onClose }) => {
  function handleClose() {
    onClose();
  }

  return (
    <MBMainBottomsheet
      visible={isVisible}
      title="Carrinho"
      description="This is a chart bottomsheet"
      headerAlign="left"
      onClose={handleClose}
      content={
        <View style={{ height: 300, width: '100%', backgroundColor: 'white' }}></View>
      }
    />
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    // flex: 1,
    width: '100%',
  },
  searchTagsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 16,
  },
  searchContentWrapper: {
    marginTop: 16,
  },
  searchCategoriesWrapper: {
    fontFamily: 'SNPro-Regular',
    flexDirection: 'column',
    gap: 8,
    marginTop: 16,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  categoryIcon: {
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryText: {
    fontSize: 13,
    color: '#444',
    fontFamily: 'SNPro-Regular',
  },
});