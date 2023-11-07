import ListGroup from "react-bootstrap/ListGroup";

import type { DhatuDetails } from "@/utils/types";
import { SearchQuery } from "@/utils/search/getSearchQuery";

import { DhatuListItem } from "./DhatuListItem";

type Props = {
  dhatuList: DhatuDetails[];
  searchQuery?: SearchQuery | null;
};

export function DhatuList({ dhatuList, searchQuery }: Props) {
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
