import type { Query } from "@/utils/types";
import { isArrayEmpty } from "@/utils/utils";
import { locateQuery } from "./viewLocate";

export const checkIsQueryEmpty = (query: Query) =>
  !Object.entries(query).some(([key, value]) => {
    if (key === locateQuery.name) return false;

    return Array.isArray(value) ? !isArrayEmpty(value) : value !== "";
  });
