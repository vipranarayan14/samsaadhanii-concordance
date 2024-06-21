import type { Query } from "@/utils/types";
import { viewSearch } from "@/utils/search/viewSearch";

export const getInputValueFromQuery = (query: Query) => {
  return query[viewSearch.name] ?? "";
};
