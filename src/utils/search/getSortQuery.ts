import type { Query } from "../types";

import { sortInput } from "../viewInputsData";
import { getStringFromSearchParams } from "./searchParams";

export type SortQuery = {
  sort: string;
};

export const getSortQuery = (query: Query): SortQuery | null => {
  const sort = getStringFromSearchParams(query[sortInput.name]);

  if (!sort) return null;

  return { sort };
};
