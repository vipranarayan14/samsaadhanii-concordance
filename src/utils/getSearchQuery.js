import { removeSvaras, removeLastVirama } from "./utils";

const getKeywords = (query) => query.split(" ").filter((keyword) => !!keyword);

const extractKeywordsWithFields = (query) =>
  getKeywords(query).map((keyword) => {
    const [field, value] = keyword.split(":");

    return { field, value };
  });

export const getSearchQuery = (query) => {
  const hasFields = query.includes(":");

  let keywordsWithFields = null;

  if (hasFields) {
    keywordsWithFields = extractKeywordsWithFields(query);
  }

  const simplifiedQuery = removeSvaras(query);
  const queryFromWx = Sanscript.t(simplifiedQuery, "wx", "devanagari");
  const queryFromItrans = Sanscript.t(simplifiedQuery, "itrans", "devanagari");

  const keywordsSets = [simplifiedQuery, queryFromWx, queryFromItrans].map(
    ($query) => getKeywords($query).map(removeLastVirama)
  );

  return { hasFields, keywordsWithFields, keywordsSets };
};
