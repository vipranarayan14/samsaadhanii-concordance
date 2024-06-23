import { Loader } from "@/commons/components/Loader";

import { getDhatupatha } from "@/utils/getDhatupatha";
import { checkIsQueryEmpty } from "@/utils/search/checkIsQueryEmpty";
import { filterData } from "@/utils/search/filterData";
import { getFilterQuery } from "@/utils/search/getFilterQuery";
import { getSearchQuery } from "@/utils/search/getSearchQuery";
import { getSortQuery } from "@/utils/search/getSortQuery";
import { getStringFromQueryValue } from "@/utils/search/queryValue";
import { searchData } from "@/utils/search/searchData";
import { sortData } from "@/utils/search/sortData";
import { locateQuery } from "@/utils/search/viewLocate";
import { isArrayEmpty } from "@/utils/utils";

import type { Query } from "@/utils/types";

import { DhatuList } from "./DhatuList";

type Props = {
  isTyping: boolean;
  query: Query;
  updateQuery: (partialQuery: Query, reset?: boolean) => void;
};

export function SearchResults({ isTyping, query, updateQuery }: Props) {
  const { dhatupatha, isError, isLoading } = getDhatupatha();

  const getItemIdToLocate = (query: Query) => {
    const itemIdToLocate = getStringFromQueryValue(query[locateQuery.name]);

    if (!itemIdToLocate) return null;

    return itemIdToLocate;
  };

  const locate = async (itemId: string) => {
    updateQuery({ [locateQuery.name]: itemId }, true);
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

  const isQueryEmpty = checkIsQueryEmpty(query);

  if (isArrayEmpty(searchedList)) {
    return (
      <div className="text-center my-3">
        <div className="fw-bold">No entries found</div>
        <div className="">Try modifying the filters or search keywords</div>
      </div>
    );
  }

  return (
    <>
      {!isQueryEmpty && (
        <div>
          <small>Showing {searchedList.length} entries</small>
        </div>
      )}

      <DhatuList
        dhatuList={searchedList}
        searchQuery={searchQuery}
        locate={locate}
        locatedItemId={locatedItemId}
      />
    </>
  );
}
