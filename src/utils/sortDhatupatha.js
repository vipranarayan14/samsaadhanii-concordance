const ganas = {
  भ्वादिः: 1,
  अदादिः: 2,
  जुहोत्यादिः: 3,
  दिवादिः: 4,
  स्वादिः: 5,
  तुदादिः: 6,
  रुधादिः: 7,
  तनादिः: 8,
  क्र्यादिः: 9,
  चुरादिः: 10,
};

const collator = new Intl.Collator();

const sortByArtha = (dhatuList) =>
  [...dhatuList].sort((dhatuDetailsA, dhatuDetailsB) =>
    collator.compare(dhatuDetailsA.meaning, dhatuDetailsB.meaning)
  );

const sortByGana = (dhatuList) =>
  [...dhatuList].sort(
    (dhatuDetailsA, dhatuDetailsB) =>
      ganas[dhatuDetailsA.gana] - ganas[dhatuDetailsB.gana]
  );

const sortByDhatu = (dhatuList) =>
  [...dhatuList].sort((dhatuDetailsA, dhatuDetailsB) =>
    collator.compare(dhatuDetailsA.dhatu, dhatuDetailsB.dhatu)
  );

export const sortDhatupatha = (dhatupatha, sortBy) => {
  const sort = { dhatu: sortByDhatu, gana: sortByGana, artha: sortByArtha }[
    sortBy
  ];

  return sort ? sort(dhatupatha) : dhatupatha;
};
