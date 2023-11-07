import React from "react";

import { DhatuDetails } from "@/utils/getDhatupathaLocal";

import { FormsAccordion } from "./FormsAccordion";
import { FormsContent } from "./FormsContent";
import { PRAYOGAS } from "@/utils/consts";

type Props = {
  dhatuDetails: DhatuDetails;
};

export function FormsAccordionsGroup({ dhatuDetails }: Props) {
  const { dhatuId } = dhatuDetails;

  return (
    <div>
      <FormsAccordion prayogaName="कर्तरि">
        <FormsContent dhatuDetails={dhatuDetails} prayoga={PRAYOGAS.KARTARI} />
      </FormsAccordion>
      <FormsAccordion prayogaName="कर्मणि">
        <FormsContent dhatuDetails={dhatuDetails} prayoga={PRAYOGAS.KARMANI} />
      </FormsAccordion>
    </div>
  );
}
