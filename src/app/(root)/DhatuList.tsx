import React from "react";

import { Virtuoso } from "react-virtuoso";
import ListGroup from "react-bootstrap/ListGroup";

import type { DhatuDetails } from "@/utils/types";
import { SearchQuery } from "@/utils/search/getSearchQuery";

import { DhatuListItem } from "./DhatuListItem";

type Props = {
  dhatuList: DhatuDetails[];
  searchQuery?: SearchQuery | null;
};

const Item = ({ ...props }) => (
  <div
    className="list-group-item list-group-item-action _bg-surface _bg-surface-hover p-1"
    {...props}
  ></div>
);

const List = React.forwardRef<any>((props, ref: any) => {
  return (
    <ListGroup
      variant="flush"
      className="_bg-surface rounded-1 shadow"
      {...props}
      ref={ref}
    />
  );
});

export function DhatuList({ dhatuList, searchQuery }: Props) {
  return (
    <Virtuoso
      useWindowScroll
      components={{ List, Item }}
      data={dhatuList}
      itemContent={(_, dhatuDetails) => (
        <DhatuListItem
          key={dhatuDetails.id}
          dhatuDetails={dhatuDetails}
          searchQuery={searchQuery}
        />
      )}
      className="my-2"
    />
  );
}
