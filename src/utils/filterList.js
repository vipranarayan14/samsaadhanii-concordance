export const filterList = (dhatuList, keywordsSets) =>
  dhatuList.filter(({ tags }) =>
    keywordsSets.some((keywordsSet) =>
      keywordsSet.every((keyword) => tags.includes(keyword))
    )
  );
