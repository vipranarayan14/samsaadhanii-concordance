import { isArrayEmpty, vowelMarksRegex } from "@/utils/utils";

import { SearchQuery } from "./getSearchQuery";

const fillVowelMarks = (keyword: string) =>
  keyword.split("").join(vowelMarksRegex).concat(vowelMarksRegex);

const makeKeywordsRegex = (keywords: string[]) => {
  const keywordsRegexStr = keywords.map(fillVowelMarks).join("|");

  return new RegExp(`(${keywordsRegexStr})`, "g");
};

export const hiliteMatches = (text: string, searchQuery: SearchQuery) => {
  const { keywordsSets } = searchQuery;
  const keywords = keywordsSets.flat(1);

  if (isArrayEmpty(keywords)) return <>{text}</>;

  const keywordsRegex = makeKeywordsRegex(keywords);

  const parts = text.split(keywordsRegex);

  return (
    <>
      {parts.map((part, index) => (
        <span key={part + index}>
          {keywordsRegex.test(part) ? <mark>{part}</mark> : <span>{part}</span>}
        </span>
      ))}
    </>
  );
};
