"use client";

import { DhatuList } from "./DhatuList";
import { Search } from "./Search";

import { getSearchQuery } from "@/utils/search/getSearchQuery";
import { searchData } from "@/utils/search/searchData";
import { getFilterQuery } from "@/utils/search/getFilterQuery";
import { filterData } from "@/utils/search/filterData";
import { getSortQuery } from "@/utils/search/getSortQuery";
import { sortData } from "@/utils/search/sortData";
import { getDhatupatha } from "@/utils/getDhatupatha";

export type SearchParams = { [key: string]: string | string[] | undefined };

type Props = {
  searchParams: SearchParams;
};

export default function Page({ searchParams }: Props) {
  const { dhatupatha, isError, isLoading } = getDhatupatha();

  const filterQuery = getFilterQuery(searchParams);
  const filteredList = filterData(dhatupatha, filterQuery);

  const sortQuery = getSortQuery(searchParams);
  const sortedList = sortData(filteredList, sortQuery);

  const searchQuery = getSearchQuery(searchParams);
  const searchedList = searchData(sortedList, searchQuery);

  return (
    <>
      <Search />
      {isError && <p>Failed to load. Reload page.</p>}
      {/* {isLoading && <Loader />} */}
      {!isError && !isLoading && (
        <DhatuList dhatuList={searchedList} searchQuery={searchQuery} />
      )}
    </>
  );
}
