import { DhatuDetails } from "../getDhatupatha";
import { FilterQuery } from "./getFilterQuery";

const getVrittiProp = (vritti: string) =>
  ({
    माधवीयधातुवृत्तिः: "madhaviyaId",
    क्षीरतरङ्गिणी: "kshirataranginiId",
    धातुप्रदीपः: "dhatupradipaId",
  }[vritti]);

const filterByVritti = (dhatuList: DhatuDetails[], vrittiName: string) =>
  dhatuList.filter((dhatuDetails) => {
    const vrittiProp = getVrittiProp(vrittiName) as keyof DhatuDetails;

    return vrittiName && vrittiProp ? dhatuDetails[vrittiProp] !== "-" : true;
  });

const filterByProp = (dhatuList: DhatuDetails[], propQuery: FilterQuery) =>
  dhatuList.filter((dhatuDetails) =>
    Object.entries(propQuery).every(([prop, value]) =>
      value ? dhatuDetails[prop as keyof DhatuDetails] === value : true
    )
  );

export const filterData = (
  dhatuList: DhatuDetails[],
  filterQuery: FilterQuery
) => {
  const { vritti, ...propQuery } = filterQuery;

  const filteredByVritti = filterByVritti(dhatuList, vritti);

  const filteredByProp = filterByProp(filteredByVritti, propQuery);

  return filteredByProp;
};
