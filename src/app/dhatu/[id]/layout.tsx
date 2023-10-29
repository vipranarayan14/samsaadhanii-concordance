import Container from "react-bootstrap/Container";

import FixedWidthContainer from "@/commons/components/FixedWidthContainer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <FixedWidthContainer width={900}>{children}</FixedWidthContainer>;
}
