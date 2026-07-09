import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import MBSearchTextfield from '../../components/textfield/MBSearchTextfield';
import MBSimpleTag from '../../components/tags/MBSimpleTag';
import MBCategoryBtn from '../../components/buttons/MBCategoryBtn';
import MBMainBtn from '../../components/buttons/MBMainBtn';
import { PrimaryColors } from '../../common/colors/Colors';
import { useSearchViewModel } from './SearchViewModel';
import MBTitledViewHeader from '../../components/header/MBTitledViewHeader';

export default function SearchView() {
  const {
    tags,
    categories,
    searchText,
    onChangeSearchText,
    onClearSearch,
    selectedTagIds,
    selectedCategoryIds,
    onToggleTag,
    onToggleCategory,
    onSubmitSearch,
    hasSubmittedSearch,
    results,
    renderProductCard,
  } = useSearchViewModel();

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <MBTitledViewHeader title="Busca" description="Encontre seus produtos" />
      </View>

      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        style={styles.resultsList}
        renderItem={({ item }) => renderProductCard(item)}
        numColumns={2}
        contentContainerStyle={styles.resultsListContent}
        ListHeaderComponent={
          <View style={styles.searchContainer}>
            <MBSearchTextfield
              value={searchText}
              onChangeText={onChangeSearchText}
              onPressClear={onClearSearch}
            />

            <View style={styles.searchTagsWrapper}>
              {tags.map((tag) => (
                <MBSimpleTag
                  key={tag.id}
                  tag={tag}
                  isSelected={selectedTagIds.includes(tag.id)}
                  onPress={() => onToggleTag(tag.id)}
                />
              ))}
            </View>

            <View style={styles.searchCategoriesWrapper}>
              <Text style={styles.categoryTitle}>Categorias</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoryScrollContent}
              >
                {categories.map((category) => (
                  <MBCategoryBtn
                    key={category.id}
                    title={category.title}
                    icon={category.icon}
                    isSelected={selectedCategoryIds.includes(category.id)}
                    onPress={() => onToggleCategory(category.id)}
                  />
                ))}
              </ScrollView>
            </View>

            <View style={styles.searchContentWrapper}>
              <MBMainBtn title="Buscar" onPress={onSubmitSearch} />
              <Text style={styles.resultsSummary}>
                {hasSubmittedSearch
                  ? `${results.length} resultado(s) encontrado(s)`
                  : 'Use os filtros acima e toque em Buscar.'}
              </Text>
            </View>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyStateWrapper}>
            <Text style={styles.emptyStateTitle}>Nenhum resultado encontrado</Text>
            <Text style={styles.emptyStateDescription}>
              Ajuste os filtros ou tente uma nova busca.
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    backgroundColor: PrimaryColors.background,
  },
  headerWrapper: {
    marginTop: 8,
  },
  searchContainer: {
    width: '100%',
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  searchTagsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 16,
  },
  searchContentWrapper: {
    marginTop: 16,
    marginBottom: 8,
    gap: 8,
  },
  searchCategoriesWrapper: {
    flexDirection: 'column',
    gap: 8,
    marginTop: 16,
  },
  categoryTitle: {
    color: '#5A5A5A',
    fontFamily: 'SNPro-Regular',
    fontSize: 14,
  },
  categoryScrollContent: {
    gap: 8,
  },
  resultsList: {
    flex: 1,
  },
  resultsListContent: {
    paddingBottom: 24,
  },
  resultsSummary: {
    color: '#666',
    fontSize: 12,
    fontFamily: 'SNPro-Regular',
  },
  emptyStateWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 24,
  },
  emptyStateTitle: {
    color: PrimaryColors.primary,
    fontFamily: 'SNPro-Bold',
    fontSize: 16,
    marginBottom: 4,
  },
  emptyStateDescription: {
    color: '#777',
    fontFamily: 'SNPro-Regular',
    fontSize: 13,
    textAlign: 'center',
  },
});