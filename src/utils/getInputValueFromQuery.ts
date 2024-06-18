import { searchInput } from "@/utils/viewInputsData";
import type { Query } from "@/utils/types";

export const getInputValueFromQuery = (query: Query) => {
  return query[searchInput.name] ?? "";
};
