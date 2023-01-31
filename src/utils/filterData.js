const getVrittiProp = (vritti) =>
  ({
    माधवीयधातुवृत्तिः: "madhaviyaId",
    क्षीरतरङ्गिणी: "kshirataranginiId",
    धातुप्रदीपः: "dhatupradipaId",
  }[vritti]);

const filterByVritti = (dhatupatha, vrittiName) =>
  dhatupatha.filter((dhatuDetails) =>
    vrittiName ? dhatuDetails[getVrittiProp(vrittiName)] !== "-" : true
  );

const filterByProp = (dhatupatha, propQuery) =>
  dhatupatha.filter((dhatuDetails) =>
    Object.entries(propQuery).every(([prop, value]) =>
      value ? dhatuDetails[prop] === value : true
    )
  );

export const filterData = (dhatupatha, filterQuery) => {
  const { vritti, ...propQuery } = filterQuery;

  const filteredByVritti = filterByVritti(dhatupatha, vritti);

  const filteredByProp = filterByProp(filteredByVritti, propQuery);

  return filteredByProp;
};
