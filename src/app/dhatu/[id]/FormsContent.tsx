import { DhatuDetails } from "@/utils/getDhatupatha";
import { getFormsDataLocal } from "@/utils/getFormsDataLocal";

import { LakaraTable } from "./LakaraTable";

type Props = {
  dhatuDetails: DhatuDetails;
  prayoga: string;
};

export async function FormsContent({ dhatuDetails, prayoga }: Props) {
  // const formsData: LakaraDetails[] = [];
  // const formsData = await getFormsData(dhatuDetails, prayoga);
  const formsData = await getFormsDataLocal(dhatuDetails, prayoga);

  return (
    <div>
      {formsData.map((lakaraDetails) => (
        <LakaraTable
          lakaraDetails={lakaraDetails}
          key={lakaraDetails.lakaraName}
        />
      ))}
    </div>
  );
}
