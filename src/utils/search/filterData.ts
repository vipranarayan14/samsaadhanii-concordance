import type { DhatuDetails } from "@/utils/types";
import { isArrayEmpty } from "@/utils/utils";

import { viewFilters } from "./viewFilters";
import { FilterQuery } from "./getFilterQuery";

const checkOptions =
  (filterName: string, dhatuDetails: DhatuDetails) => (optionName: string) => {
    const filter = viewFilters.find((filter) => filter.name === filterName);

    const option = filter?.options.find((option) => option.name === optionName);

    const test = option?.test;

    return test?.(dhatuDetails);
  };

const runFilters = (filterQuery: FilterQuery) => (dhatuDetails: DhatuDetails) =>
  Object.entries(filterQuery).every(([filterName, optionNames]) =>
    isArrayEmpty(optionNames)
      ? true
      : optionNames.some(checkOptions(filterName, dhatuDetails))
  );

export const filterData = (
  dhatuList: DhatuDetails[],
  filterQuery: FilterQuery | null
) => {
  if (!filterQuery) return dhatuList;

  const filtered = dhatuList.filter(runFilters(filterQuery));

  return filtered;
};
