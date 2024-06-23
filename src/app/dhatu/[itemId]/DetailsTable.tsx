"use client";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";

import type { DhatuDetails } from "@/utils/types";

import styles from "./styles.module.scss";

type Props = {
  dhatuDetails: DhatuDetails;
};

export function DhatuDetailsTable({ dhatuDetails }: Props) {
  const { dhatuId, muladhatu, dhatu, meaning, gana, padi, it } = dhatuDetails;

  const LabelledDetails = [
    { label: "मूलधातुः", content: muladhatu },
    { label: "धातुः", content: dhatu },
    { label: "अर्थः", content: meaning },
    { label: "गणः", content: gana },
    { label: "पदि", content: padi },
    { label: "इट्", content: it },
  ];

  return (
    <Row xs={2} md={3} className="g-4">
      {LabelledDetails.map(({ label, content }) => (
        <Col key={label}>
          <Card
            bg="white"
            className="border _border-divider _border-thick text-center"
          >
            <Card.Header className="_border-thick fs-6 fw-bold">
              {label}
            </Card.Header>
            <Card.Body>
              {/* <Card.Title>Special title treatment</Card.Title> */}
              <Card.Text className="fs-5">{content}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
