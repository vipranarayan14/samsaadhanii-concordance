import { SearchParams } from "@/app/(root)/page";
import { filterInputs } from "../viewInputsData";
import { getStringFromSearchParams } from "./getStringFromSearchParams";
import { isObjectEmpty } from "../utils";

const filterInputNames = filterInputs.map(({ name }) => name);

export type FilterQuery = Record<string, string>;

export const getFilterQuery = (searchParams: SearchParams) => {
  const filterQuery: FilterQuery = {};

  for (const [name, value] of Object.entries(searchParams)) {
    if (filterInputNames.includes(name)) {
      filterQuery[name] = getStringFromSearchParams(value);
    }
  }

  return !isObjectEmpty(filterQuery) ? filterQuery: null;
};
