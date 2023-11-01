"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { useInView } from "react-intersection-observer";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

import { SearchInput } from "./SearchInput";
import { ViewOptions } from "./ViewOptions";

export type Query = Record<string, string>;

export function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { ref, entry } = useInView({ threshold: 1 });

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

    if (URLSearchString === "") {
      router.push("/");
    } else {
      router.push("/search" + "?" + URLSearchString);
    }
  };

  const isPinned = entry && entry.intersectionRatio < 1;
  const bg = isPinned ? "bg-primary" : "bg-body";

  const query = getQueryFromSearchParams();

  return (
    <section className={`sticky-top _transition-bg ${bg}`} style={{ top: -1 }}>
      <Container ref={ref} fluid="sm" className=" p-0">
        <Row className="g-0 justify-content-center">
          <Col style={{ maxWidth: "700px" }}>
            <Form className="d-flex align-items-center py-2 px-1">
              <div className="flex-fill rounded-1 shadow">
                <div className="input-group rounded-1">
                  <ViewOptions query={query} setQuery={setQuery} />

                  <SearchInput query={query} setQuery={setQuery} />
                </div>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
