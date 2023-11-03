import FixedWidthContainer from "@/commons/components/FixedWidthContainer";

import { Search } from "./Search";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Search />
      <FixedWidthContainer width={700}>{children}</FixedWidthContainer>
    </>
  );
}
