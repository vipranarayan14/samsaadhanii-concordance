import type { DhatuDetails } from "../types";

import { sortOptions } from "../viewInputsData";

import { SortQuery } from "./getSortQuery";

type SortFn = (dhatuList: DhatuDetails[]) => DhatuDetails[];

const collator = new Intl.Collator();

const sortByArtha: SortFn = (dhatuList) =>
  [...dhatuList].sort((dhatuDetailsA, dhatuDetailsB) =>
    collator.compare(dhatuDetailsA.meaning, dhatuDetailsB.meaning)
  );

const sortByGana: SortFn = (dhatuList) => dhatuList;

const sortByDhatu: SortFn = (dhatuList) =>
  [...dhatuList].sort((dhatuDetailsA, dhatuDetailsB) =>
    collator.compare(dhatuDetailsA.muladhatu, dhatuDetailsB.muladhatu)
  );

export const sortData = (
  dhatuList: DhatuDetails[],
  sortQuery: SortQuery | null
) => {
  if (!sortQuery) return dhatuList;

  const sort = {
    [sortOptions.dhatu]: sortByDhatu,
    [sortOptions.gana]: sortByGana,
    [sortOptions.artha]: sortByArtha,
  }[sortQuery.sort];

  return sort ? sort(dhatuList) : dhatuList;
};
