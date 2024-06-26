import FixedWidthContainer from "@/commons/components/FixedWidthContainer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <FixedWidthContainer as={"main"} width={700}>{children}</FixedWidthContainer>;
}
