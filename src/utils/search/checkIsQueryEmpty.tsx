import { isArrayEmpty } from "@/utils/utils";

import type { Query } from "@/utils/types";

export const checkIsQueryEmpty = (query: Query) =>
  !Object.values(query).some((value) =>
    Array.isArray(value) ? !isArrayEmpty(value) : value !== ""
  );
