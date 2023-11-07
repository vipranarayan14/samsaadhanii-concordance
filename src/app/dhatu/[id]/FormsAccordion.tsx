"use client";

import Accordion from "react-bootstrap/Accordion";

import { DhatuDetails } from "@/utils/getDhatupathaLocal";
import { FormsContent } from "./FormsContent";
import React from "react";

type Props = {
  prayogaName: string;
  children: React.ReactElement;
};

export function FormsAccordion({ children, prayogaName }: Props) {
  return (
    <Accordion defaultActiveKey={prayogaName} className="my-2">
      <Accordion.Item eventKey={prayogaName}>
        <Accordion.Header>
          <span>{prayogaName}</span>
        </Accordion.Header>

        <Accordion.Body>{children}</Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
