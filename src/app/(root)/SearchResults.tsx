import { Loader } from "@/commons/components/Loader";
import { getSearchQuery } from "@/utils/search/getSearchQuery";
import { searchData } from "@/utils/search/searchData";
import { getFilterQuery } from "@/utils/search/getFilterQuery";
import { filterData } from "@/utils/search/filterData";
import { getSortQuery } from "@/utils/search/getSortQuery";
import { sortData } from "@/utils/search/sortData";
import { getStringFromSearchParams } from "@/utils/search/getStringFromSearchParams";
import { getDhatupatha } from "@/utils/getDhatupatha";

import type { Query } from "@/utils/types";

import { DhatuList } from "./DhatuList";

export const locateQuery = { name: "locate" };

type Props = {
  isTyping: boolean;
  query: Query;
  updateQuery: (partialQuery: Query, reset?: boolean) => void;
};

export function SearchResults({ isTyping, query, updateQuery }: Props) {
  const { dhatupatha, isError, isLoading } = getDhatupatha();

  const getItemIdToLocate = (query: Query) => {
    const itemIdToLocate = getStringFromSearchParams(query[locateQuery.name]);

    if (!itemIdToLocate) return null;

    // const itemIndex = dhatupatha.findIndex(
    //   (dhatuDetails) => dhatuDetails.id === Number(focusId)
    // );

    // if (itemIndex === -1) return null;

    // return itemIndex;

    return Number(itemIdToLocate);
  };

  const locate = async (entryId: number) => {
    updateQuery({ [locateQuery.name]: entryId.toString() }, true);
  };

  if (isError) {
    return (
      <p>
        There was an error while fetching the dhatupatha. Please reload the page
        or try again later.
      </p>
    );
  }

  if (isLoading || isTyping) {
    return <Loader />;
  }

  const filterQuery = getFilterQuery(query);
  const filteredList = filterData(dhatupatha, filterQuery);

  const sortQuery = getSortQuery(query);
  const sortedList = sortData(filteredList, sortQuery);

  const searchQuery = getSearchQuery(query);
  const searchedList = searchData(sortedList, searchQuery);

  const locatedItemId = getItemIdToLocate(query);

  return (
    <DhatuList
      dhatuList={searchedList}
      searchQuery={searchQuery}
      locate={locate}
      locatedItemId={locatedItemId}
    />
  );
}
