import { DhatuList } from "@/app/(root)/DhatuList";
import { Metadata } from "next";
import { getSearchQuery } from "@/utils/search/getSearchQuery";
import { searchData } from "@/utils/search/searchData";
import { getDhatupatha } from "@/utils/getDhatupatha";
import { addTags } from "@/utils/search/addTags";
import { getFilterQuery } from "@/utils/search/getFilterQuery";
import { filterData } from "@/utils/search/filterData";
import { getSortQuery } from "@/utils/search/getSortQuery";
import { sortData } from "@/utils/search/sortData";

export const metadata: Metadata = {
  title: "Search | Concordance of Pāṇinian Dhātuvṛttis",
};

export type SearchParams = { [key: string]: string | string[] | undefined };

type Props = {
  searchParams: SearchParams;
};

const dhatupatha = await getDhatupatha();

const dhatupathaWithTags = addTags(dhatupatha);

export default function Page({ searchParams }: Props) {
  const filterQuery = getFilterQuery(searchParams);
  const filteredList = filterData(dhatupathaWithTags, filterQuery);

  const sortQuery = getSortQuery(searchParams);
  const sortedList = sortData(filteredList, sortQuery);

  const searchQuery = getSearchQuery(searchParams);
  const searchedData = searchData(sortedList, searchQuery);

  return <DhatuList dhatuList={searchedData} />;
}
