import type { DhatuDetails } from "@/utils/types";

import { viewSort } from "./viewSort";
import { SortQuery } from "./getSortQuery";

export const sortData = (
  dhatuList: DhatuDetails[],
  sortQuery: SortQuery | null
) => {
  if (!sortQuery) return dhatuList;

  const optionName = sortQuery.sort;

  const sortOption = viewSort.options.find(
    (option) => option.name === optionName
  );

  const compareFn = sortOption?.compare;

  return dhatuList.slice().sort(compareFn);
};
