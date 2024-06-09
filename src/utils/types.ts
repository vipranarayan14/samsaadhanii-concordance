export type DhatuDetails = {
  id: string;
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

export type Query = Record<string, string>;

export type SearchParams = { [key: string]: string | string[] | undefined };
