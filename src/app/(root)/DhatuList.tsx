import { Suspense } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";

import { getDhatupatha } from "@/utils/getDhatupatha";

import { Loader } from "./Loader";
import { DhatuListItem } from "./DhatuListItem";

async function List() {
  const dhatupatha = await getDhatupatha();

  return (
    <ListGroup variant="flush" className="_bg-surface my-2 rounded-1 shadow">
      {dhatupatha.map((dhatuDetails) => (
        <DhatuListItem key={dhatuDetails.id} dhatuDetails={dhatuDetails} />
      ))}
    </ListGroup>
  );
}

export function DhatuList() {
  return (
    <section>
      <Container fluid="sm" className="p-0">
        <Row className="g-0 justify-content-center">
          <Col className="_mw-700">
            <div className="px-1 py-2">
              <Suspense fallback={<Loader />}>
                <List />
              </Suspense>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
