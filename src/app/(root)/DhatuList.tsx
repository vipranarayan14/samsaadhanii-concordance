import { Suspense } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";

import { DhatuDetails } from "@/utils/getDhatupatha";
import { SearchQuery } from "@/utils/search/getSearchQuery";
import { hiliteMatches } from "@/utils/search/hiliteMatches";

import { Loader } from "./Loader";
import { DhatuListItem } from "./DhatuListItem";

type Props = {
  dhatuList: DhatuDetails[];
  searchQuery?: SearchQuery;
};

async function List({ dhatuList, searchQuery }: Props) {
  const hilite = (text: string) =>
    searchQuery ? hiliteMatches(text, searchQuery) : <>{text}</>;

  return (
    <ListGroup variant="flush" className="_bg-surface my-2 rounded-1 shadow">
      {dhatuList.map((dhatuDetails) => (
        <DhatuListItem
          key={dhatuDetails.id}
          dhatuDetails={dhatuDetails}
          hilite={hilite}
        />
      ))}
    </ListGroup>
  );
}

export function DhatuList({ ...props }: Props) {
  return (
    <section>
      <Container fluid="sm" className="p-0">
        <Row className="g-0 justify-content-center">
          <Col className="_mw-700">
            <div className="px-1 py-2">
              <Suspense fallback={<Loader />}>
                <List {...props} />
              </Suspense>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
