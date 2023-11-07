import type { SearchParams } from "../types";

import { sortInput } from "../viewInputsData";
import { getStringFromSearchParams } from "./getStringFromSearchParams";

export type SortQuery = {
  sort: string;
};

export const getSortQuery = (searchParams: SearchParams): SortQuery | null => {
  const sort = getStringFromSearchParams(searchParams[sortInput.name]);

  if (!sort) return null;

  return { sort };
};
