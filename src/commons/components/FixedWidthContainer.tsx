import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

type Props = {
  children: React.ReactNode;
  width?: number;
};

export default function FixedWidthContainer({ children, width = 700 }: Props) {
  return (
    <Container as="main" fluid="sm">
      <Row className="g-0 justify-content-center">
        <Col style={{ maxWidth: `${width}px` }}>{children}</Col>
      </Row>
    </Container>
  );
}
