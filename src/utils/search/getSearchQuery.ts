import Sanscript from "@indic-transliteration/sanscript";

import { removeSvaras, removeLastVirama } from "../utils";
import { SearchParams } from "@/app/(root)/search/page";

import { searchInput } from "@/utils/viewInputsData";
import { getStringFromSearchParams } from "./getStringFromSearchParams";

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

export const getSearchQuery = (
  searchParams: SearchParams
): SearchQuery | null => {
  const searchString = getStringFromSearchParams(
    searchParams[searchInput.name]
  );

  if (!searchString) return null;

  const hasFields = searchString.includes(":");

  let keywordsWithFields = null;

  if (hasFields) {
    keywordsWithFields = extractKeywordsWithFields(searchString);
  }

  const simplified = removeSvaras(searchString);
  const convertedFromWx = Sanscript.t(simplified, "wx", "devanagari");
  const convertedFromItrans = Sanscript.t(simplified, "itrans", "devanagari");

  const keywordsSets = [simplified, convertedFromWx, convertedFromItrans].map(
    (searchString) => getKeywords(searchString).map(removeLastVirama)
  );

  return { searchString, keywordsWithFields, keywordsSets };
};
