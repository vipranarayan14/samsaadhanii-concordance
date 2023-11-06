import { DhatuDetails } from "../getDhatupatha";
import { DhatuDetailsWithTags, addTags } from "./addTags";
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
  dhatuList: DhatuDetails[],
  searchQuery: SearchQuery | null
) => {
  if (!searchQuery) return dhatuList;

  const dhatuListWithTags = addTags(dhatuList);
  const { keywordsWithFields, keywordsSets } = searchQuery;

  if (keywordsWithFields) {
    return dhatuListWithTags.filter((item) =>
      keywordsWithFields.every(({ field, value }) => {
        const listField = getListField(field) as keyof DhatuDetails;

        if (!listField) return false;

        return item[listField] === value;
      })
    );
  }

  const listScored = dhatuListWithTags.map(scoreItemWithKeywords(keywordsSets));

  const listSortedByScore = listScored
    .filter(({ score }) => score > -1)
    .sort(({ score: scoreA }, { score: scoreB }) => scoreA - scoreB);

  return listSortedByScore.map<DhatuDetails>(
    ({ item: { tags, ...dhatuDetails } }) => dhatuDetails
  );
};
