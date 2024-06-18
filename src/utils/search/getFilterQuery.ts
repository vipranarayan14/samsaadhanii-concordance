import type { Query } from "../types";

import { filterInputs } from "../viewInputsData";
import { isObjectEmpty } from "../utils";

import { getArrayFromQueryValue } from "./queryValue";

const filterInputNames = filterInputs.map(({ name }) => name);

export type FilterQuery = Record<string, string[]>;

export const getFilterQuery = (query: Query) => {
  const filterQuery: FilterQuery = {};

  for (const name of filterInputNames) {
    filterQuery[name] = getArrayFromQueryValue(query[name]);
  }

  return !isObjectEmpty(filterQuery) ? filterQuery : null;
};
