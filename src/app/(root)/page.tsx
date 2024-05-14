"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import FixedWidthContainer from "@/commons/components/FixedWidthContainer";
import type { Query } from "@/utils/types";

import { Search } from "./Search";
import { SearchResults, locateQuery } from "./SearchResults";

function getQueryFromSearchParams(searchParams: URLSearchParams) {
  const query: Query = {};

  for (const [key, value] of searchParams.entries()) {
    if (!value) {
      continue;
    } else if (Array.isArray(value)) {
      query[key] = value[0];
    } else {
      query[key] = value;
    }
  }

  return query;
}

const createURLSearchString = (query: Query, searchParams: URLSearchParams) => {
  // const params = new URLSearchParams(searchParams);
  const params = new URLSearchParams("");

  for (const [name, value] of Object.entries(query)) {
    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
  }

  return params.toString();
};

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

  useEffect(() => {
    const URLSearchString = createURLSearchString(query, searchParams);

    // NOTE:
    //  This causes to render twice. But since shallow routing is not yet available in app router,
    //  this is how it can be done without resorting to History API. As it doesn't cause any perf
    //  problem, it is okay. Ref: https://github.com/vercel/next.js/discussions/48110
    router.push("?" + URLSearchString, { scroll: false });
  }, [query]);

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
