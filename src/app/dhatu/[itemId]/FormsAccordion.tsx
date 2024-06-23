"use client";

import React, { Suspense } from "react";

import Accordion from "react-bootstrap/Accordion";

import { FormsContentPlaceholder } from "./FormsContentPlaceholder";
import { AccordionTitle } from "./AccordionTitle";

type Props = {
  prayogaName: string;
  children: React.ReactElement;
};

export function FormsAccordion({ children, prayogaName }: Props) {
  return (
    <Accordion defaultActiveKey={prayogaName} className="my-2">
      <Accordion.Item eventKey={prayogaName}>
        <Accordion.Header>
          <AccordionTitle title={prayogaName} />
        </Accordion.Header>

        <Accordion.Body>
          <Suspense fallback={<FormsContentPlaceholder />}>{children}</Suspense>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
