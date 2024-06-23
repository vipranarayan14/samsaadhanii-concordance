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

  // return (
  //   <Container fluid className="px-0" style={{ fontSize: "1.1rem" }}>
  //     {" "}
  //     <Row className="py-1">
  //       <Col sm={2} className="fw-bold">
  //         मूलधातुः
  //       </Col>
  //       <Col>{muladhatu}</Col>
  //     </Row>
  //     <Row className="py-1">
  //       <Col sm={2} className="fw-bold">
  //         धातुः
  //       </Col>
  //       <Col>{dhatu}</Col>
  //     </Row>
  //     <div className="row py-1">
  //       <Col sm={2} className="fw-bold">
  //         अर्थः
  //       </Col>
  //       <Col>{meaning}</Col>
  //     </div>
  //     <Row className="py-1">
  //       <Col sm={2} className="fw-bold">
  //         गणः
  //       </Col>
  //       <Col>{gana}</Col>
  //     </Row>
  //     <Row className="py-1">
  //       <Col sm={2} className="fw-bold">
  //         पदि
  //       </Col>
  //       <Col>{padi}</Col>
  //     </Row>
  //     <Row className="py-1">
  //       <Col sm={2} className="fw-bold">
  //         इट्
  //       </Col>
  //       <Col>{it}</Col>
  //     </Row>
  //   </Container>
  // );

  return (
    <Card className="_bg-surface _border-thick">
      <Card.Body>
        <table
          className={`${styles.detailsTable} _bg-surface text-center m-auto`}
          style={{ width: "50%" }}
        >
          <tbody className="_bg-surface">
            <tr>
              <th>मूलधातुः</th>
              <td>{muladhatu}</td>
            </tr>
            <tr>
              <th>धातुः</th>
              <td>{dhatu}</td>
            </tr>
            <tr>
              <th>अर्थः</th>
              <td>{meaning}</td>
            </tr>
            <tr>
              <th>गणः</th>
              <td>{gana}</td>
            </tr>
            <tr>
              <th>पदि</th>
              <td>{padi}</td>
            </tr>
            <tr>
              <th>इट्</th>
              <td>{it}</td>
            </tr>
            {/* TODO: Show dhatuId only under "Advanced" mode */}
            {/* <tr>
              <th>dhatuId</th>
              <td>{dhatuId}</td>
            </tr> */}
          </tbody>
        </table>
      </Card.Body>
    </Card>
  );
}
