import type { Query } from "../types";

import { sortInput } from "../viewInputsData";
import { getStringFromQueryValue } from "./queryValue";

export type SortQuery = {
  sort: string;
};

export const getSortQuery = (query: Query): SortQuery | null => {
  const sort = getStringFromQueryValue(query[sortInput.name]);

  if (!sort) return null;

  return { sort };
};
