"use client";

import Accordion from "react-bootstrap/Accordion";
import { VrittiBadge } from "../my-app/src/commons/components/VrittiBadge";
import { DhatuDetails } from "@/utils/getDhatupatha";
import { Suspense } from "react";
import { VrittiAccordionItemContent } from "./VrittiAccordionItemContent";

const vrittiCodes = {
  madhaviya: "mA",
  kshiratarangini: "kRi",
  dhatupradipa: "XA",
};

type VrittiAccordionItemProps = {
  vrittiName: string;
  vrittiId: string;
  vrittiCode: string;
};

function VrittiAccordionItem({
  vrittiName,
  vrittiId,
  vrittiCode,
}: VrittiAccordionItemProps) {
  return (
    <Accordion.Item eventKey={vrittiName}>
      <Accordion.Header className="_bg-surface-hover">
        <span>{vrittiName}</span>
        &nbsp;
        <VrittiBadge vrittiId={vrittiId} />
      </Accordion.Header>
      <Accordion.Body
        className="text-break"
        style={{ maxHeight: "400px", overflowY: "auto" }}
      >
        {/* <Suspense fallback={<p>Loading...</p>}> */}
        <VrittiAccordionItemContent
          vrittiCode={vrittiCode}
          vrittiId={vrittiId}
        />
        {/* </Suspense> */}
      </Accordion.Body>
    </Accordion.Item>
  );
}

type VrittiAccordionProps = {
  dhatuDetails: DhatuDetails;
};

export function VrittiAccordion({ dhatuDetails }: VrittiAccordionProps) {
  const { madhaviyaId, kshirataranginiId, dhatupradipaId } = dhatuDetails;

  return (
    <Accordion alwaysOpen>
      <VrittiAccordionItem
        vrittiName="माधवीयधातुवृत्तिः"
        vrittiCode={vrittiCodes.madhaviya}
        vrittiId={madhaviyaId}
      />
      <VrittiAccordionItem
        vrittiName="क्षीरतरङ्गिणी"
        vrittiCode={vrittiCodes.kshiratarangini}
        vrittiId={kshirataranginiId}
      />
      <VrittiAccordionItem
        vrittiName="धातुप्रदीपः"
        vrittiCode={vrittiCodes.dhatupradipa}
        vrittiId={dhatupradipaId}
      />
    </Accordion>
  );
}
