import type { Query, ViewOptions } from "@/utils/types";

import { viewSort } from "./viewSort";
import { viewFilters } from "./viewFilters";

export const getViewOptionsFromQuery = (query: Query): ViewOptions => {
  const inputsValues: Record<string, string | string[]> = {};

  inputsValues[viewSort.name] = query[viewSort.name] ?? "";

  for (const { name } of viewFilters) {
    let value = query[name];

    if (!value) value = [];

    if (!Array.isArray(value)) value = [value];

    inputsValues[name] = value;
  }

  return inputsValues;
};
