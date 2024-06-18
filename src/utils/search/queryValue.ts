type queryValue = string | string[] | undefined;

export const getStringFromQueryValue = (searchParam: queryValue): string => {
  if (!searchParam) return "";

  if (Array.isArray(searchParam)) return searchParam[0];

  return searchParam;
};

export const getArrayFromQueryValue = (searchParam: queryValue): string[] => {
  if (!searchParam) return [];

  if (!Array.isArray(searchParam)) return [searchParam];

  return searchParam;
};
