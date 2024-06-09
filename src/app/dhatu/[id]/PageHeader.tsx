import type { DhatuDetails } from "@/utils/types";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import FixedWidthContainer from "@/commons/components/FixedWidthContainer";
import { BackBtn } from "./BackBtn";

type Props = {
  dhatuDetails: DhatuDetails;
};

export function PageHeader({ dhatuDetails }: Props) {
  const { muladhatu, dhatu, meaning } = dhatuDetails;

  return (
    <header className="_bg-surface py-2 mb-3 shadow sticky-top">
      <FixedWidthContainer width={900}>
        <Container className="g-0 align-items-center">
          <Row>
            <Col>
              <BackBtn />
            </Col>
            <Col className="align-self-center" xs={6}>
              <h1 className="fs-4 p-1 m-0 text-center fw-bold text-truncate">{`${muladhatu} (${dhatu}) ${meaning}`}</h1>
            </Col>
            <Col></Col>
          </Row>
        </Container>
      </FixedWidthContainer>
    </header>
  );
}
