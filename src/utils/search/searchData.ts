import { DhatuDetails } from "../getDhatupatha";
import { DhatuDetailsWithTags } from "./addTags";
import { KeywordsSet, SearchQuery } from "./getSearchQuery";

const scoreItemWithKeywords =
  (keywordsSets: KeywordsSet[]) => (item: DhatuDetailsWithTags) => {
    const scoresByKeywordSet = keywordsSets.map((keywordsSet) =>
      Math.min(...keywordsSet.map((keyword) => item.tags.indexOf(keyword)))
    );

    const score = Math.max(...scoresByKeywordSet);

    return { item, score };
  };

const getListField = (queryField: string) =>
  ({
    id: "dhatuId",
    m: "madhaviyaId",
    k: "kshirataranginiId",
    d: "dhatupradipaId",
  }[queryField]);

export const searchData = (
  dhatupatha: DhatuDetailsWithTags[],
  searchQuery: SearchQuery
) => {
  const { keywordsWithFields, keywordsSets } = searchQuery;

  if (keywordsWithFields) {
    return dhatupatha.filter((item) =>
      keywordsWithFields.every(({ field, value }) => {
        const listField = getListField(field) as keyof DhatuDetails;

        if (!listField) return false;

        return item[listField] === value;
      })
    );
  }

  const listScored = dhatupatha.map(scoreItemWithKeywords(keywordsSets));

  const listSortedByScore = listScored
    .filter(({ score }) => score > -1)
    .sort(({ score: scoreA }, { score: scoreB }) => scoreA - scoreB);

  return listSortedByScore.map(({ item }) => item);
};
