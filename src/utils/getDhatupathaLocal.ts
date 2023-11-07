import fs from "fs/promises";
import path from "path";

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

const dhatupathaPath = "src/assets/dhatupatha.json";

export async function getDhatupathaLocal(): Promise<DhatuDetails[]> {
  const dhatupathaPathAbs = path.join(process.cwd(), dhatupathaPath);

  const result = await fs.readFile(dhatupathaPathAbs, "utf-8");

  return await JSON.parse(result);
}
