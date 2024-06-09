const scoreItemWithKeywords = (keywordsSets) => (item) => {
  const scoresByKeywordSet = keywordsSets.map((keywordsSet) =>
    Math.min(...keywordsSet.map((keyword) => item.tags.indexOf(keyword)))
  );

  const score = Math.max(...scoresByKeywordSet);

  return { item, score };
};

const getListField = (queryField) =>
  ({
    id: "dhatuId",
    m: "madhaviyaId",
    k: "kshirataranginiId",
    d: "dhatupradipaId",
  }[queryField]);

export const searchData = (dhatuList, queryDetails) => {
  const { keywordsWithFields, keywordsSets } = queryDetails;

  if (queryDetails.hasFields) {
    return dhatuList.filter((item) =>
      keywordsWithFields.every(
        ({ field, value }) => item[getListField(field)] === value
      )
    );
  }

  const listScored = dhatuList.map(scoreItemWithKeywords(keywordsSets));

  const listSortedByScore = listScored
    .filter(({ score }) => score > -1)
    .sort(({ score: scoreA }, { score: scoreB }) => scoreA - scoreB);

  return listSortedByScore.map(({ item }) => item);
};
