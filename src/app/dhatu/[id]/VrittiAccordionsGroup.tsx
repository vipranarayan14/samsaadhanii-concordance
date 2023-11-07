import React from "react";

import { VRITTI_CODES } from "@/utils/consts";
import { DhatuDetails } from "@/utils/getDhatupathaLocal";

import { VrittiAccordion } from "./VrittiAccordion";
import { VrittiContent } from "./VrittiContent";

type Props = {
  dhatuDetails: DhatuDetails;
};

export function VrittiAccordionsGroup({ dhatuDetails }: Props) {
  const { madhaviyaId, kshirataranginiId, dhatupradipaId } = dhatuDetails;

  return (
    <div>
      <VrittiAccordion vrittiName="माधवीयधातुवृत्तिः" vrittiId={madhaviyaId}>
        <VrittiContent
          vrittiId={madhaviyaId}
          vrittiCode={VRITTI_CODES.MADHAVIYA}
        />
      </VrittiAccordion>
      <VrittiAccordion vrittiName="क्षीरतरङ्गिणी" vrittiId={kshirataranginiId}>
        <VrittiContent
          vrittiId={kshirataranginiId}
          vrittiCode={VRITTI_CODES.KSHIRATARANGINI}
        />
      </VrittiAccordion>
      <VrittiAccordion vrittiName="धातुप्रदीपः" vrittiId={dhatupradipaId}>
        <VrittiContent
          vrittiId={dhatupradipaId}
          vrittiCode={VRITTI_CODES.DHATUPRADIPA}
        />
      </VrittiAccordion>
    </div>
  );
}
