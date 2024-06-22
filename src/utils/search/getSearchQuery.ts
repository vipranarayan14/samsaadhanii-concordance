import Sanscript from "@indic-transliteration/sanscript";

import type { Query } from "@/utils/types";
import { viewSearch } from "@/utils/search/viewSearch";
import { removeSvaras, removeLastVirama } from "@/utils/utils";

import { getStringFromQueryValue } from "./queryValue";

type Keyword = string;

const getKeywords = (query: string): Keyword[] =>
  query.split(" ").filter((keyword) => !!keyword);

type KeywordWithField = {
  field: string;
  value: string;
};

const extractKeywordsWithFields = (searchString: string): KeywordWithField[] =>
  getKeywords(searchString).map((keyword) => {
    const [field, value] = keyword.split(":");

    return { field, value };
  });

export type KeywordsSet = Keyword[];

export type SearchQuery = {
  searchString: string;
  keywordsWithFields: KeywordWithField[] | null;
  keywordsSets: KeywordsSet[];
};

export const getSearchQuery = (query: Query): SearchQuery | null => {
  const searchString = getStringFromQueryValue(query[viewSearch.name]);

  if (!searchString) return null;

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
    // convertedFromItrans
  ].map((searchString) => getKeywords(searchString).map(removeLastVirama));

  return { searchString, keywordsWithFields, keywordsSets };
};
