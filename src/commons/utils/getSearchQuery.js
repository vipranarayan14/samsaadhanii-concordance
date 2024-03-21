import Sanscript from "@indic-transliteration/sanscript";

import { removeSvaras, removeLastVirama } from "./utils";

const getKeywords = (query) => query.split(" ").filter((keyword) => !!keyword);

const extractKeywordsWithFields = (query) =>
  getKeywords(query).map((keyword) => {
    const [field, value] = keyword.split(":");

    return { field, value };
  });

export const getSearchQuery = (searchInputEle) => {
  const searchString = searchInputEle.value;

  const hasFields = searchString.includes(":");

  let keywordsWithFields = null;

  if (hasFields) {
    keywordsWithFields = extractKeywordsWithFields(searchString);
  }

  const simplified = removeSvaras(searchString);
  const convertedFromWx = Sanscript.t(simplified, "wx", "devanagari");
  // const convertedFromItrans = Sanscript.t(simplified, "itrans", "devanagari");

  const keywordsSets = [
    simplified,
    convertedFromWx,
    // convertedFromItrans,
  ].map((searchString) => getKeywords(searchString).map(removeLastVirama));

  return { searchString, hasFields, keywordsWithFields, keywordsSets };
};
