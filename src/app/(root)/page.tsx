import { getDhatupathaLocal } from "@/utils/getDhatupathaLocal";

import { DhatuList } from "./DhatuList";
import { Search } from "./Search";

import { getSearchQuery } from "@/utils/search/getSearchQuery";
import { searchData } from "@/utils/search/searchData";
import { getFilterQuery } from "@/utils/search/getFilterQuery";
import { filterData } from "@/utils/search/filterData";
import { getSortQuery } from "@/utils/search/getSortQuery";
import { sortData } from "@/utils/search/sortData";

const dhatupatha = await getDhatupathaLocal();

export type SearchParams = { [key: string]: string | string[] | undefined };

type Props = {
  searchParams: SearchParams;
};

export default function Page({ searchParams }: Props) {
  const filterQuery = getFilterQuery(searchParams);
  const filteredList = filterData(dhatupatha, filterQuery);

  const sortQuery = getSortQuery(searchParams);
  const sortedList = sortData(filteredList, sortQuery);

  const searchQuery = getSearchQuery(searchParams);
  const searchedList = searchData(sortedList, searchQuery);

  return (
    <>
      <Search />
      <DhatuList dhatuList={searchedList} searchQuery={searchQuery} />
    </>
  );
}
