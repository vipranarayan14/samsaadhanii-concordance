export const getStringFromSearchParams = (
  searchParam: string | string[] | undefined
): string => {
  if (!searchParam) return "";
  if (Array.isArray(searchParam)) return searchParam[0];
  return searchParam;
};
