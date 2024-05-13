"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import FixedWidthContainer from "@/commons/components/FixedWidthContainer";
import type { Query } from "@/utils/types";

import { Search } from "./Search";
import { SearchResults } from "./SearchResults";

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
  const params = new URLSearchParams(searchParams);

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

  const updateQuery = (partialQuery: Query) => {
    const newQuery = { ...query, ...partialQuery };

    setQuery(newQuery);
  };

  useEffect(() => {
    const URLSearchString = createURLSearchString(query, searchParams);

    // NOTE:
    //  This causes to render twice. But since shallow routing is not yet available in app router,
    //  this is how it can be done without resorting to History API. As it doesn't cause any perf
    //  problem, it is okay. Ref: https://github.com/vercel/next.js/discussions/48110
    router.push("?" + URLSearchString);
  }, [query]);

  return (
    <div>
      <Search
        setIsTyping={(isTyping) => setIsTyping(isTyping)}
        query={query}
        updateQuery={updateQuery}
      />

      <section>
        <FixedWidthContainer as={"main"}>
          <div className="px-1 py-2">
            <Suspense>
              <SearchResults isTyping={isTyping} query={query} />
            </Suspense>
          </div>
        </FixedWidthContainer>
      </section>
    </div>
  );
}
