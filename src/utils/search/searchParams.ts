type SearchParam = string | string[] | undefined;

export const getStringFromSearchParams = (searchParam: SearchParam): string => {
  if (!searchParam) return "";

  if (Array.isArray(searchParam)) return searchParam[0];

  return searchParam;
};

export const getArrayFromSearchParams = (
  searchParam: SearchParam
): string[] => {
  if (!searchParam) return [];

  if (!Array.isArray(searchParam)) return [searchParam];

  return searchParam;
};
