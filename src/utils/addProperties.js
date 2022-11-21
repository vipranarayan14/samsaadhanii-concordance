import { removeSvaras } from "./utils";

const makeId = (dhatuDetails, index) => {
  return `${dhatuDetails.dhatuId}_${index}`;
};

const createTags = (details) => {
  const simplifiedMuladhatu = removeSvaras(details.muladhatu);

  const tags = [
    simplifiedMuladhatu,
    details.dhatu,
    details.meaning,
    details.gana,
    details.padi,
    details.it,
    `m${details.madhaviyaId}`,
    `k${details.kshirataranginiId}`,
    `d${details.dhatupradipaId}`,
    details.dhatuId,
  ].join(" ");

  return tags;
};

export const addProperties = (dhatuList) =>
  dhatuList.map((dhatuDetails, id) => ({
    id: makeId(dhatuDetails, id),
    ...dhatuDetails,
    tags: createTags(dhatuDetails),
  }));
