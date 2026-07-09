import type { SearchCategory, SearchCriteria, SearchProduct, SearchTag } from './SearchModel';

function normalize(value: string) {
  return value.trim().toLowerCase();
}

export function toggleIdSelection(ids: string[], id: string) {
  if (ids.includes(id)) {
    return ids.filter((currentId) => currentId !== id);
  }

  return [...ids, id];
}

export function resolveSelectedTitlesById(ids: string[], items: Array<SearchTag | SearchCategory>) {
  if (ids.length === 0) return [];

  const titleById = items.reduce<Record<string, string>>((acc, item) => {
    acc[item.id] = normalize(item.title);
    return acc;
  }, {});

  return ids
    .map((id) => titleById[id])
    .filter((title): title is string => Boolean(title));
}

export function filterSearchProducts(
  products: SearchProduct[],
  tags: SearchTag[],
  categories: SearchCategory[],
  criteria: SearchCriteria,
) {
  const normalizedText = normalize(criteria.text);
  const selectedTagTitles = resolveSelectedTitlesById(criteria.selectedTagIds, tags);
  const selectedCategoryTitles = resolveSelectedTitlesById(criteria.selectedCategoryIds, categories);

  return products.filter((product) => {
    const searchableText = normalize(
      `${product.title} ${product.description} ${product.storeName}`,
    );

    const matchesText = !normalizedText || searchableText.includes(normalizedText);

    const matchesTags =
      selectedTagTitles.length === 0 ||
      selectedTagTitles.some((tagTitle) => searchableText.includes(tagTitle));

    const matchesCategories =
      selectedCategoryTitles.length === 0 ||
      selectedCategoryTitles.some((categoryTitle) => searchableText.includes(categoryTitle));

    return matchesText && matchesTags && matchesCategories;
  });
}
