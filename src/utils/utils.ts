import Sanscript from "@indic-transliteration/sanscript";

export const vowelMarksRegex = "[्ािीुूृॄेैोौंःँ॒॑]*";

export const svarasRegex = "[॒॑]";

export const removeLastVirama = (keyword: string) => keyword.replace(/्$/, "");

export const removeSvaras = (str: string) =>
  str.replace(new RegExp(svarasRegex, "g"), "");

export const translitToWX = (input: string) => {
  const inputWithSvarasConverted = input
    .replaceAll("॑", "|")
    .replaceAll("॒", "_");

  return Sanscript.t(inputWithSvarasConverted, "devanagari", "wx");
};

export const translitToDev = (input: string) =>
  Sanscript.t(input, "wx", "devanagari");

export const isArrayEmpty = (array: any[]) => array.length === 0;

export const isObjectEmpty = (object: Record<any, any>) =>
  Object.entries(object).length === 0;

export const chunk = (arr: any[], size: number) => {
  const chunks = [];

  for (let i = 0, l = arr.length; i < l; i += size) {
    chunks.push(arr.slice(i, i + size));
  }

  return chunks;
};

export const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

export const sleep = (delay: number) =>
  new Promise((resolve) => setTimeout(resolve, delay));
