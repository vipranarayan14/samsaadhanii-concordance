import type { Query } from "@/utils/types";
import { isArrayEmpty } from "@/utils/utils";

export const checkIsQueryEmpty = (query: Query) =>
  !Object.values(query).some((value) =>
    Array.isArray(value) ? !isArrayEmpty(value) : value !== ""
  );
