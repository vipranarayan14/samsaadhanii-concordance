import { useSearchParams } from "next/navigation";

import { Loader } from "@/commons/components/Loader";
import { getSearchQuery } from "@/utils/search/getSearchQuery";
import { searchData } from "@/utils/search/searchData";
import { getFilterQuery } from "@/utils/search/getFilterQuery";
import { filterData } from "@/utils/search/filterData";
import { getSortQuery } from "@/utils/search/getSortQuery";
import { sortData } from "@/utils/search/sortData";
import { getDhatupatha } from "@/utils/getDhatupatha";

import { DhatuList } from "./DhatuList";

export function SearchResults() {
  const params = useSearchParams();

  const searchParams = Object.fromEntries(params.entries());

  const { dhatupatha, isError, isLoading } = getDhatupatha();

  if (isError) {
    return (
      <p>
        There was an error while fetching the dhatupatha. Please reload the page
        or try again later.
      </p>
    );
  }

  if (isLoading) {
    return <Loader />;
  }

  const filterQuery = getFilterQuery(searchParams);
  const filteredList = filterData(dhatupatha, filterQuery);

  const sortQuery = getSortQuery(searchParams);
  const sortedList = sortData(filteredList, sortQuery);

  const searchQuery = getSearchQuery(searchParams);
  const searchedList = searchData(sortedList, searchQuery);

  return <DhatuList dhatuList={searchedList} searchQuery={searchQuery} />;
}
