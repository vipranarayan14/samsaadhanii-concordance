import { createFormsQuery } from "@/utils/createFormsQuery";
import type { DhatuDetails } from "@/utils/types";
import { retructureFormsData } from "@/utils/restructureFormsData";
import { ENDPOINTS } from "@/utils/endpoints";

export async function getFormsData(
  dhatuDetails: DhatuDetails,
  prayoga: string
) {
  const formsQuery = createFormsQuery(dhatuDetails, prayoga);

  const formsURL = `${ENDPOINTS.FORMS}/${formsQuery}`;

  const result = await fetch(formsURL, { cache: "force-cache" });

  const formsData = await result.json();

  const retructuredFormsData = retructureFormsData(formsData);

  return retructuredFormsData;
}
