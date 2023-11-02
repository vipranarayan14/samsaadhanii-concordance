import FixedWidthContainer from "@/commons/components/FixedWidthContainer";

import { Search } from "./Search";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <FixedWidthContainer width={700}>
      <Search />

      {children}
    </FixedWidthContainer>
  );
}
