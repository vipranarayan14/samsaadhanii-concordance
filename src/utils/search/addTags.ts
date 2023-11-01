import { DhatuDetails } from "../getDhatupatha";
import { removeSvaras } from "../utils";

const createTags = (details: DhatuDetails) => {
  const simplifiedMuladhatu = removeSvaras(details.muladhatu);

  const tags = [
    simplifiedMuladhatu,
    details.dhatu,
    details.meaning,
    details.gana,
    details.padi,
    details.it,
  ].join(" ");

  return tags;
};

export interface DhatuDetailsWithTags extends DhatuDetails {
  tags: string;
}

export const addTags = (dhatuList: DhatuDetails[]): DhatuDetailsWithTags[] =>
  dhatuList.map((dhatuDetails) => ({
    ...dhatuDetails,
    tags: createTags(dhatuDetails),
  }));
