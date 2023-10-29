import { DhatuDetails } from "./getDhatupatha";
import { removeSvaras, translitToWX } from "./utils";

export const createFormsQuery = (details: DhatuDetails, prayoga: string) => {
  const { dhatuId, muladhatu, padi, gana, meaning } = details;

  const encoding = "WX";

  const vb = [dhatuId, removeSvaras(muladhatu), gana, meaning]
    .map(translitToWX)
    .join("_");

  const padiInWX = translitToWX(padi);

  return (
    `?vb=${vb}` +
    `&prayoga_paxI=${translitToWX(prayoga)}-${padiInWX}` +
    `&encoding=${encoding}` +
    `&upasarga=-` + // required
    `&mode=json`
  );
};
