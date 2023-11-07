"use client";

import FixedWidthContainer from "@/commons/components/FixedWidthContainer";

import { Search } from "./Search";

import { Suspense, useState } from "react";
import { SearchResults } from "./SearchResults";

export default function Page() {
  const [isTyping, setIsTyping] = useState(false);

  return (
    <>
      <Search setIsTyping={(isTyping) => setIsTyping(isTyping)} />

      <section>
        <FixedWidthContainer as={"main"}>
          <div className="px-1 py-2">
            <Suspense>
              <SearchResults />
            </Suspense>
          </div>
        </FixedWidthContainer>
      </section>
    </>
  );
}
