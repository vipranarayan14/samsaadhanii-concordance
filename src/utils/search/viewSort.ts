import { DhatuDetails } from "../types";

export type SortOption = {
  name: string;
  label: string;
  compare?: (ddA: DhatuDetails, ddB: DhatuDetails) => number;
};

type Sort = {
  name: string;
  label: string;
  options: SortOption[];
};

const collator = new Intl.Collator();

export const sortOptions: SortOption[] = [
  {
    name: "gana",
    label: "गणः",
  },
  {
    name: "dhatu",
    label: "धातु",
    compare: (ddA, ddB) => collator.compare(ddA.muladhatu, ddB.muladhatu),
  },
  {
    name: "artha",
    label: "अर्थ",
    compare: (ddA, ddB) => collator.compare(ddA.meaning, ddB.meaning),
  },
];

export const viewSort: Sort = {
  name: "sort",
  label: "Sort by",
  options: sortOptions,
};
