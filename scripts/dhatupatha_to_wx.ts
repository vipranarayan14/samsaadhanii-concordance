import { readFile, writeFile } from "fs/promises";

import Sanscript from "@indic-transliteration/sanscript";

export const translitToWX = (input: string) => {
  const inputWithSvarasConverted = input
    .replaceAll("॑", "|")
    .replaceAll("॒", "_");

  return Sanscript.t(inputWithSvarasConverted, "devanagari", "wx");
};

const data = await readFile("public/dhatupatha.json", "utf-8");

const concordanceEntries: Record<string, string>[] = JSON.parse(data);

const convertedConcordanceEntries: Record<string, string>[] =
  concordanceEntries.map((entry) =>
    Object.fromEntries(
      Object.entries(entry).map(([key, value]) => [key, translitToWX(value)])
    )
  );

await writeFile(
  "public/dhatupatha_wx.json",
  JSON.stringify(convertedConcordanceEntries, null, 2),
  "utf-8"
);
