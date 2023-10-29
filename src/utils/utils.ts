import Sanscript from "@indic-transliteration/sanscript";

export const vowelMarksRegex = "[्ािीुूृॄेैोौंःँ॒॑]*";

export const removeLastVirama = (keyword: string) => keyword.replace(/्$/, "");

export const removeSvaras = (dhatu: string) =>
  dhatu.replace(new RegExp(vowelMarksRegex, "g"), "");

export const translitToWX = (input: string) =>
  Sanscript.t(input, "devanagari", "wx");

export const isArrayEmpty = (array: any[]) => array.length === 0;
