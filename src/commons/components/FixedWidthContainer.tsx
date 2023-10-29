import Container from "react-bootstrap/Container";

type Props = {
  children: React.ReactNode;
  width: number;
};

export default function FixedWidthContainer({ children, width }: Props) {
  return (
    <Container as="main" fluid="sm" style={{ maxWidth: `${width}px` }}>
      {children}
    </Container>
  );
}
