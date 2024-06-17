import type { Query } from "../types";

import { filterInputs } from "../viewInputsData";
import { isObjectEmpty } from "../utils";

import {
  getArrayFromSearchParams,
  getStringFromSearchParams,
} from "./searchParams";

const filterInputNames = filterInputs.map(({ name }) => name);

export type FilterQuery = Record<string, string[]>;

export const getFilterQuery = (query: Query) => {
  const filterQuery: FilterQuery = {};

  for (const [name, value] of Object.entries(query)) {
    if (filterInputNames.includes(name)) {
      filterQuery[name] = getArrayFromSearchParams(value);
    }
  }

  return !isObjectEmpty(filterQuery) ? filterQuery : null;
};
