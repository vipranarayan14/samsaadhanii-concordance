const scoreItemWithKeywords = (keywordsSets) => (item) => {
  const scoresByKeywordSet = keywordsSets.map((keywordsSet) =>
    Math.min(...keywordsSet.map((keyword) => item.tags.indexOf(keyword)))
  );

  const score = Math.max(...scoresByKeywordSet);

  return { item, score };
};

export const filterList = (dhatuList, keywordsSets) => {
  const listScored = dhatuList.map(scoreItemWithKeywords(keywordsSets));

  const listSortedByScore = listScored
    .filter(({ score }) => score > 0)
    .sort(({ score: scoreA }, { score: scoreB }) => scoreA - scoreB);

  return listSortedByScore.map(({ item }) => item);
};
