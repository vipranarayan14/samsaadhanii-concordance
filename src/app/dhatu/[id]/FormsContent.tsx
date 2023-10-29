import { DhatuDetails } from "@/utils/getDhatupatha";

import { LakaraTable } from "./LakaraTable";
import { getFormsData } from "../../../utils/getFormsData";

type Props = {
  dhatuDetails: DhatuDetails;
  prayoga: string;
};

export async function FormsContent({ dhatuDetails, prayoga }: Props) {
  const formsData = await getFormsData(dhatuDetails, prayoga);

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
