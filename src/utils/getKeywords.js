import { removeSvaras, removeLastVirama } from "./utils";

export const getKeywords = (query) => {
  const simplifiedQuery = removeSvaras(query);
  const queryFromWx = Sanscript.t(simplifiedQuery, "wx", "devanagari");
  const queryFromItrans = Sanscript.t(simplifiedQuery, "itrans", "devanagari");

  const keywordsSets = [simplifiedQuery, queryFromWx, queryFromItrans].map(
    (str) =>
      str
        .split(" ")
        .filter((keyword) => !!keyword)
        .map(removeLastVirama)
  );

  return keywordsSets;
};
