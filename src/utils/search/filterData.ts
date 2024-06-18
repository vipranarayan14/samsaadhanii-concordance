import type { DhatuDetails } from "../types";
import { isArrayEmpty, translitToWX } from "../utils";

import { featureFilters } from "./featureFilters";
import { FilterQuery } from "./getFilterQuery";
import { vrittiProps } from "./vrittiProps";

const filterByVritti = (dhatuList: DhatuDetails[], vrittiNames: string[]) => {
  if (!vrittiNames || isArrayEmpty(vrittiNames)) return dhatuList;

  return dhatuList.filter((dhatuDetails) =>
    vrittiNames.some((vrittiName) => {
      const vrittiProp = vrittiProps[vrittiName] as keyof DhatuDetails;

      return vrittiProp ? dhatuDetails[vrittiProp] !== "-" : true;
    })
  );
};

const filterByProp = (dhatuList: DhatuDetails[], propQuery: FilterQuery) =>
  dhatuList.filter((dhatuDetails) =>
    Object.entries(propQuery).every(([prop, value]) =>
      isArrayEmpty(value)
        ? true
        : value.includes(dhatuDetails[prop as keyof DhatuDetails])
    )
  );

const checkFeature = (dhatu: string) => (feature: string) => {
  const dhatu_wx = translitToWX(dhatu);
  const featureFilter = featureFilters[feature];

  return featureFilter(dhatu_wx);
};

const filterByDhatuFeatures = (
  dhatuList: DhatuDetails[],
  featureQuery: FilterQuery
) => {
  return dhatuList.filter((dhatuDetails) =>
    Object.values(featureQuery).every((features) =>
      isArrayEmpty(features)
        ? true
        : features.some(checkFeature(dhatuDetails.dhatu))
    )
  );
};

export const filterData = (
  dhatuList: DhatuDetails[],
  filterQuery: FilterQuery | null
) => {
  if (!filterQuery) return dhatuList;

  let filtered = [];

  const { vritti, upadesha, gana, padi, it, adi, anta } = filterQuery;

  filtered = filterByVritti(dhatuList, vritti);

  const propQuery = { gana, padi, it };

  filtered = filterByProp(filtered, propQuery);

  const featuresQuery = { upadesha, adi, anta };

  filtered = filterByDhatuFeatures(filtered, featuresQuery);

  return filtered;
};
