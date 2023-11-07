import { Suspense } from "react";

import ListGroup from "react-bootstrap/ListGroup";

import { DhatuDetails } from "@/utils/getDhatupatha";
import { SearchQuery } from "@/utils/search/getSearchQuery";

import FixedWidthContainer from "@/commons/components/FixedWidthContainer";
import { Loader } from "@/commons/components/Loader";

import { DhatuListItem } from "./DhatuListItem";

type Props = {
  dhatuList: DhatuDetails[];
  searchQuery?: SearchQuery | null;
};

async function List({ dhatuList, searchQuery }: Props) {
  return (
    <ListGroup variant="flush" className="_bg-surface my-2 rounded-1 shadow">
      {dhatuList.map((dhatuDetails) => (
        <DhatuListItem
          key={dhatuDetails.id}
          dhatuDetails={dhatuDetails}
          searchQuery={searchQuery}
        />
      ))}
    </ListGroup>
  );
}

export function DhatuList({ ...props }: Props) {
  return (
    <section>
      <FixedWidthContainer as={"main"}>
        <div className="px-1 py-2">
          <Suspense fallback={<Loader />}>
            <List {...props} />
          </Suspense>
        </div>
      </FixedWidthContainer>
    </section>
  );
}
