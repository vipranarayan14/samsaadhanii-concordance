"use client";

import React, { Suspense } from "react";

import Accordion from "react-bootstrap/Accordion";

import { VrittiBadge } from "@/commons/components/VrittiBadge";

import { VrittiContentPlaceholder } from "./VrittiContentPlaceholder";
import { AccordionTitle } from "./AccordionTitle";

type Props = {
  vrittiId: string;
  vrittiName: string;
  children: React.ReactElement;
};

export function VrittiAccordion({ vrittiId, vrittiName, children }: Props) {
  return (
    <Accordion defaultActiveKey={vrittiName} className="my-2">
      <Accordion.Item eventKey={vrittiName}>
        <Accordion.Header>
          <AccordionTitle title={vrittiName} />
          &nbsp;
          <VrittiBadge vrittiId={vrittiId} />
        </Accordion.Header>
        <Accordion.Body className="text-break">
          <Suspense fallback={<VrittiContentPlaceholder />}>
            {children}
          </Suspense>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
