import type { DhatuDetails } from "../types";
import { isArrayEmpty } from "../utils";
import { FilterQuery } from "./getFilterQuery";

const getVrittiProp = (vritti: string) =>
  ({
    माधवीयधातुवृत्तिः: "madhaviyaId",
    क्षीरतरङ्गिणी: "kshirataranginiId",
    धातुप्रदीपः: "dhatupradipaId",
  }[vritti]);

const filterByVritti = (dhatuList: DhatuDetails[], vrittiNames: string[]) => {
  if (!vrittiNames || isArrayEmpty(vrittiNames)) return dhatuList;

  return dhatuList.filter((dhatuDetails) =>
    vrittiNames.some((vrittiName) => {
      const vrittiProp = getVrittiProp(vrittiName) as keyof DhatuDetails;

      return vrittiProp ? dhatuDetails[vrittiProp] !== "-" : true;
    })
  );
};

const filterByProp = (dhatuList: DhatuDetails[], propQuery: FilterQuery) =>
  dhatuList.filter((dhatuDetails) =>
    Object.entries(propQuery).every(([prop, value]) =>
      !isArrayEmpty(value)
        ? value.includes(dhatuDetails[prop as keyof DhatuDetails])
        : true
    )
  );

export const filterData = (
  dhatuList: DhatuDetails[],
  filterQuery: FilterQuery | null
) => {
  if (!filterQuery) return dhatuList;

  const { vritti, ...propQuery } = filterQuery;

  const filteredByVritti = filterByVritti(dhatuList, vritti);

  const filteredByProp = filterByProp(filteredByVritti, propQuery);

  return filteredByProp;
};
