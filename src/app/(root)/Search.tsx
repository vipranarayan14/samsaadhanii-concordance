import { useRouter, useSearchParams } from "next/navigation";

import { useInView } from "react-intersection-observer";

import Form from "react-bootstrap/Form";

import FixedWidthContainer from "@/commons/components/FixedWidthContainer";

import { SearchInput } from "./SearchInput";
import { ViewOptions } from "./ViewOptions";
import { useEffect } from "react";

export type Query = Record<string, string>;

type Props = {
  setIsTyping: (isTyping: boolean) => void;
};

export function Search({ setIsTyping }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { entry } = useInView({ threshold: 1 });

  const createURLSearchString = (query: Query) => {
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

  function getQueryFromSearchParams(): Query {
    const query: Query = {};

    for (const [key, value] of searchParams.entries()) {
      query[key] = value;
    }

    return query;
  }

  const setQuery = (partialQuery: Query) => {
    const newQuery = { ...query, ...partialQuery };
    const URLSearchString = createURLSearchString(newQuery);

    router.push("?" + URLSearchString);
  };

  const isPinned = entry && entry.intersectionRatio < 1;
  const bg = isPinned ? "bg-primary" : "bg-body";

  const query = getQueryFromSearchParams();

  return (
    <section className={`sticky-top _transition-bg ${bg}`} style={{ top: -1 }}>
      <FixedWidthContainer>
        <Form className="d-flex align-items-center py-2 px-1">
          <div className="flex-fill rounded-1 shadow">
            <div className="input-group rounded-1">
              <ViewOptions query={query} setQuery={setQuery} />

              <SearchInput
                query={query}
                setQuery={setQuery}
                setIsTyping={setIsTyping}
              />
            </div>
          </div>
        </Form>
      </FixedWidthContainer>
    </section>
  );
}
