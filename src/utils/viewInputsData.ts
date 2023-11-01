export const searchInput = { name: "q" };

export const sortOptions = {
  gana: "गणः",
  dhatu: "धातु",
  artha: "अर्थ",
};

export const sortInput = {
  name: "sort",
  label: "Sort by",
  options: [sortOptions.gana, sortOptions.dhatu, sortOptions.artha],
};

export const filterInputs = [
  {
    name: "vritti",
    label: "वृत्तिः",
    options: ["माधवीयधातुवृत्तिः", "क्षीरतरङ्गिणी", "धातुप्रदीपः"],
  },
  {
    name: "gana",
    label: "गणः",
    options: [
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
    ],
  },
  { name: "padi", label: "पदि", options: ["परस्मैपदी", "आत्मनेपदी", "उभयपदी"] },
  { name: "it", label: "इट्", options: ["सेट्", "अनिट्", "-"] },
];

export const viewInputsNames = [
  sortInput.name,
  ...filterInputs.map(({ name }) => name),
];
