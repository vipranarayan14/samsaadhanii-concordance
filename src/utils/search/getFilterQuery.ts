import { filterInputs } from "../viewInputsData";
import { isObjectEmpty } from "../utils";
import type { SearchParams } from "../types";

import { getStringFromSearchParams } from "./getStringFromSearchParams";

const filterInputNames = filterInputs.map(({ name }) => name);

export type FilterQuery = Record<string, string>;

export const getFilterQuery = (searchParams: SearchParams) => {
  const filterQuery: FilterQuery = {};

  for (const [name, value] of Object.entries(searchParams)) {
    if (filterInputNames.includes(name)) {
      filterQuery[name] = getStringFromSearchParams(value);
    }
  }

  return !isObjectEmpty(filterQuery) ? filterQuery : null;
};
