import { DhatuDetails } from "@/utils/types";
import { removeSvaras, translitToWX } from "./utils";

const PAGE_ID_SEPARATOR = "-";

export const createDhatuItemId = (dhatuDetails: DhatuDetails) => {
  const { id, dhatuId, muladhatu, meaning } = dhatuDetails;

  const muladhatuWX = translitToWX(removeSvaras(muladhatu));
  const meaningWX = translitToWX(removeSvaras(meaning));

  return [id, muladhatuWX, meaningWX, dhatuId].join(PAGE_ID_SEPARATOR);
};

export const getIdFromItemId = (itemId?: string): string | undefined =>
  itemId?.split(PAGE_ID_SEPARATOR)[0];

export const getIndexFromItemId = (itemId: string | null): number | null =>
  itemId === null ? null : parseInt(getIdFromItemId(itemId) ?? "");
