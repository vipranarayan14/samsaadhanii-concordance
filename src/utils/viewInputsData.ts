import {
  adiFilters,
  antaFilters,
  svaraFilters,
  upadeshaFilters,
} from "./search/featureFilters";

import { vrittiProps } from "./search/vrittiProps";

const ganaOptions = [
  "भ्वादिः",
  "अदादिः",
  "जुहोत्यादिः",
  "दिवादिः",
  "स्वादिः",
  "तुदादिः",
  "रुधादिः",
  "तनादिः",
  "क्र्यादिः",
  "चुरादिः",
];

const padiOptions = ["परस्मैपदी", "आत्मनेपदी", "उभयपदी"];

const itOptions = ["सेट्", "अनिट्", "-"];

export const sortOptions = {
  gana: "गणः",
  dhatu: "धातु",
  artha: "अर्थ",
};

export const searchInput = { name: "q" };

export const sortInput = {
  name: "sort",
  label: "Sort by",
  options: [sortOptions.gana, sortOptions.dhatu, sortOptions.artha],
};

export const filterInputs = [
  { name: "vritti", label: "वृत्तिः", options: Object.keys(vrittiProps) },
  { name: "gana", label: "गणः", options: ganaOptions },
  { name: "padi", label: "पदि", options: padiOptions },
  { name: "it", label: "इट्", options: itOptions },
  { name: "upadesha", label: "उपदेशः", options: Object.keys(upadeshaFilters) },
  { name: "svara", label: "स्वरः", options: Object.keys(svaraFilters) },
  { name: "adi", label: "आदिवर्णः", options: Object.keys(adiFilters) },
  { name: "anta", label: "अन्त्यवर्णः", options: Object.keys(antaFilters) },
];

export const viewInputsNames = [
  sortInput.name,
  ...filterInputs.map(({ name }) => name),
];
