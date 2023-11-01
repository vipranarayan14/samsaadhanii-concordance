import { SearchParams } from "@/app/(root)/search/page";
import { sortInput } from "../viewInputsData";
import { getStringFromSearchParams } from "./getStringFromSearchParams";

export type SortQuery = {
  sort: string;
};

export const getSortQuery = (searchParams: SearchParams) => {
  const sort = getStringFromSearchParams(searchParams[sortInput.name]);

  return { sort };
};
