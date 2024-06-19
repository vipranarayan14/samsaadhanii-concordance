import type { DhatuDetails } from "../types";
import { isArrayEmpty, translitToWX } from "../utils";
import {
  featureFilterInputs,
  propFilterInputs,
  vrittiFilterInput,
} from "../viewInputsData";

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

const checkFeature = (dhatuDetails: DhatuDetails) => (feature: string) => {
  const dhatuWx = translitToWX(dhatuDetails.dhatu);
  const muladhatuWx = translitToWX(dhatuDetails.muladhatu);

  const featureFilter = featureFilters[feature];

  return featureFilter(dhatuWx, muladhatuWx);
};

const filterByDhatuFeatures = (
  dhatuList: DhatuDetails[],
  featureQuery: FilterQuery
) => {
  return dhatuList.filter((dhatuDetails) =>
    Object.values(featureQuery).every((features) =>
      isArrayEmpty(features) ? true : features.some(checkFeature(dhatuDetails))
    )
  );
};

export const filterData = (
  dhatuList: DhatuDetails[],
  filterQuery: FilterQuery | null
) => {
  if (!filterQuery) return dhatuList;

  let filtered = [];

  const vritti = filterQuery[vrittiFilterInput.name];

  filtered = filterByVritti(dhatuList, vritti);

  const propQuery = Object.fromEntries(
    propFilterInputs.map(({ name }) => [name, filterQuery[name]])
  );

  filtered = filterByProp(filtered, propQuery);

  const featuresQuery = Object.fromEntries(
    featureFilterInputs.map(({ name }) => [name, filterQuery[name]])
  );

  filtered = filterByDhatuFeatures(filtered, featuresQuery);

  return filtered;
};
