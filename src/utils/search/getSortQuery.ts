import type { Query } from "@/utils/types";

import { viewSort } from "./viewSort";
import { getStringFromQueryValue } from "./queryValue";

export type SortQuery = {
  sort: string;
};

export const getSortQuery = (query: Query): SortQuery | null => {
  const sort = getStringFromQueryValue(query[viewSort.name]);

  if (!sort) return null;

  return { sort };
};
