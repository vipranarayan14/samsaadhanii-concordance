import type { Query } from "../types";

import { filterInputs } from "../viewInputsData";
import { isObjectEmpty } from "../utils";

import { getStringFromSearchParams } from "./getStringFromSearchParams";

const filterInputNames = filterInputs.map(({ name }) => name);

export type FilterQuery = Record<string, string>;

export const getFilterQuery = (query: Query) => {
  const filterQuery: FilterQuery = {};

  for (const [name, value] of Object.entries(query)) {
    if (filterInputNames.includes(name)) {
      filterQuery[name] = getStringFromSearchParams(value);
    }
  }

  return !isObjectEmpty(filterQuery) ? filterQuery : null;
};
