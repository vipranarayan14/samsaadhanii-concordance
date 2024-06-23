import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { LakaraDetails } from "@/utils/restructureFormsData";
import { PadiTable } from "./PadiTable";

type Props = {
  lakaraDetails: LakaraDetails;
};

export function LakaraTable({ lakaraDetails }: Props) {
  const { lakaraName, parasmaiForms, aatmaneForms } = lakaraDetails;

  return (
    <div className="py-4">
      <Row className="g-0 justify-content-center fs-5 fw-bold">
        <Col lg={10}>{lakaraName}</Col>
      </Row>

      <Row className="g-0 justify-content-center">
        {parasmaiForms && (
          <Col lg={10}>
            <PadiTable padi="परस्मै" forms={parasmaiForms} />
          </Col>
        )}

        {aatmaneForms && (
          <Col lg={10}>
            <PadiTable padi="आत्मने" forms={aatmaneForms} />
          </Col>
        )}
      </Row>
    </div>
  );
}
