import type { Query } from "@/utils/types";
import { isObjectEmpty } from "@/utils/utils";

import { viewFilters } from "./viewFilters";
import { getArrayFromQueryValue } from "./queryValue";

const viewFilterNames = viewFilters.map(({ name }) => name);

export type FilterQuery = Record<string, string[]>;

export const getFilterQuery = (query: Query) => {
  const filterQuery: FilterQuery = {};

  for (const name of viewFilterNames) {
    filterQuery[name] = getArrayFromQueryValue(query[name]);
  }

  return !isObjectEmpty(filterQuery) ? filterQuery : null;
};
