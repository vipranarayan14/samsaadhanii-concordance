import fs from "fs/promises";
import path from "path";

import { DhatuDetails } from "@/utils/types";

const dhatupathaPath = "public/dhatupatha.json";

export async function getDhatupathaLocal(): Promise<DhatuDetails[]> {
  const dhatupathaPathAbs = path.join(process.cwd(), dhatupathaPath);

  const result = await fs.readFile(dhatupathaPathAbs, "utf-8");

  return await JSON.parse(result);
}
