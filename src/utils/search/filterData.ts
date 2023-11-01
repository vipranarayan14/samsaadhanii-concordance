import { DhatuDetailsWithTags } from "./addTags";
import { FilterQuery } from "./getFilterQuery";

const getVrittiProp = (vritti: string) =>
  ({
    माधवीयधातुवृत्तिः: "madhaviyaId",
    क्षीरतरङ्गिणी: "kshirataranginiId",
    धातुप्रदीपः: "dhatupradipaId",
  }[vritti]);

const filterByVritti = (
  dhatuList: DhatuDetailsWithTags[],
  vrittiName: string
) =>
  dhatuList.filter((dhatuDetails) => {
    const vrittiProp = getVrittiProp(vrittiName) as keyof DhatuDetailsWithTags;

    return vrittiName && vrittiProp ? dhatuDetails[vrittiProp] !== "-" : true;
  });

const filterByProp = (
  dhatuList: DhatuDetailsWithTags[],
  propQuery: FilterQuery
) =>
  dhatuList.filter((dhatuDetails) =>
    Object.entries(propQuery).every(([prop, value]) =>
      value ? dhatuDetails[prop as keyof DhatuDetailsWithTags] === value : true
    )
  );

export const filterData = (
  dhatuList: DhatuDetailsWithTags[],
  filterQuery: FilterQuery
) => {
  const { vritti, ...propQuery } = filterQuery;

  const filteredByVritti = filterByVritti(dhatuList, vritti);

  const filteredByProp = filterByProp(filteredByVritti, propQuery);

  return filteredByProp;
};
