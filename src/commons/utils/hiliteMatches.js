import { isArrayEmpty, vowelMarksRegex } from "./utils";

const fillVowelMarks = (keyword) =>
  keyword.split("").join(vowelMarksRegex).concat(vowelMarksRegex);

const makeKeywordsRegex = (keywords) => {
  const keywordsRegexStr = keywords.map(fillVowelMarks).join("|");

  return new RegExp(keywordsRegexStr, "g");
};

export const hiliteMatches = (filteredList, { keywordsSets }) => {
  const keywords = keywordsSets.flat(1);

  if (isArrayEmpty(keywords)) return filteredList;

  const keywordsRegex = makeKeywordsRegex(keywords);

  const hilite = (text) => text.replace(keywordsRegex, "<mark>$&</mark>");

  return filteredList.map((details) => ({
    ...details,
    muladhatu: hilite(details.muladhatu),
    dhatu: hilite(details.dhatu),
    meaning: hilite(details.meaning),
    gana: hilite(details.gana),
    padi: hilite(details.padi),
    it: hilite(details.it),
  }));
};
