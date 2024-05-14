"use client";

import React from "react";

import Accordion from "react-bootstrap/Accordion";

import { VrittiBadge } from "@/commons/components/VrittiBadge";

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
          <span>{vrittiName}</span>
          &nbsp;
          <VrittiBadge vrittiId={vrittiId} />
        </Accordion.Header>
        <Accordion.Body className="text-break">{children}</Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
