import { DhatuList } from "@/app/(root)/DhatuList";
import { Metadata } from "next";
import { ReadonlyURLSearchParams } from "next/navigation";

export const metadata: Metadata = {
  title: "Search | Concordance of Pāṇinian Dhātuvṛttis",
};

type Props = {
  searchParams: ReadonlyURLSearchParams;
};

export default function Page({ searchParams }: Props) {
  console.log(searchParams);

  return <DhatuList />;
}
