export type DhatuDetails = {
  id: number;
  dhatuId: string;
  muladhatu: string;
  dhatu: string;
  graphURL: string;
  meaning: string;
  gana: string;
  padi: string;
  it: string;
  madhaviyaId: string;
  kshirataranginiId: string;
  dhatupradipaId: string;
};

export type SearchParams = { [key: string]: string | string[] | undefined };
