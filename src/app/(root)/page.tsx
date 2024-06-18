"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import type { Query } from "@/utils/types";

import FixedWidthContainer from "@/commons/components/FixedWidthContainer";
import { getQueryFromSearchParams } from "@/utils/getQueryFromSearchParams";
import { createURLSearchString } from "@/utils/createURLSearchString";

import { Search } from "./Search";
import { SearchResults, locateQuery } from "./SearchResults";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const queryFromSearchParams = getQueryFromSearchParams(searchParams);

  const [isTyping, setIsTyping] = useState(false);
  const [query, setQuery] = useState<Query>(queryFromSearchParams);

  const updateQuery = (partialQuery: Query, reset: boolean = false) => {
    const _query = reset ? {} : query;

    const newQuery = { ..._query, ...partialQuery };

    setQuery(newQuery);
  };

  const updateSearchQuery = (partialQuery: Query) => {
    const isLocateQueryExists = Object.keys(query).includes(locateQuery.name);

    if (isLocateQueryExists) {
      return updateQuery(partialQuery, true);
    }

    updateQuery(partialQuery);
  };

  // Update URL when query changes
  useEffect(() => {
    const URLSearchString = createURLSearchString(query, searchParams);

    // NOTE:
    //  This causes to render twice. But since shallow routing is not yet available in app router,
    //  this is how it can be done without resorting to History API. As it doesn't cause any perf
    //  problem, it is okay. Ref: https://github.com/vercel/next.js/discussions/48110
    router.push("?" + URLSearchString, { scroll: false });
  }, [query]);

  // Update query when URL changes
  useEffect(() => {
    const queryFromSearchParams = getQueryFromSearchParams(searchParams);

    setQuery(queryFromSearchParams);
  }, [searchParams]);

  return (
    <div>
      <Search
        setIsTyping={(isTyping) => setIsTyping(isTyping)}
        query={query}
        updateQuery={updateSearchQuery}
      />

      <section>
        <FixedWidthContainer as={"main"}>
          <div className="px-1 py-2">
            <Suspense>
              <SearchResults
                isTyping={isTyping}
                query={query}
                updateQuery={updateQuery}
              />
            </Suspense>
          </div>
        </FixedWidthContainer>
      </section>
    </div>
  );
}
