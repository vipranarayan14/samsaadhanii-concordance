import React, { useRef } from "react";

import { Virtuoso, VirtuosoHandle } from "react-virtuoso";
import ListGroup from "react-bootstrap/ListGroup";

import type { DhatuDetails } from "@/utils/types";
import { SearchQuery } from "@/utils/search/getSearchQuery";

import { DhatuListItem } from "./DhatuListItem";
import { ScrollToTop } from "@/commons/components/ScrollToTop";

// Remove `item` from props to avoid `item="[Object Object]"` attr in HTML
const Item = ({ item: _, ...props }: { item: any }) => (
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

type Props = {
  dhatuList: DhatuDetails[];
  searchQuery?: SearchQuery | null;
};

export function DhatuList({ dhatuList, searchQuery }: Props) {
  const virtuoso = useRef<VirtuosoHandle>(null);

  const goToTop = () => {
    virtuoso.current?.scrollToIndex({
      index: 0,
      behavior: "auto",
      align: "end",
    });
  };

  return (
    <>
      <div className="py-2">
        <Virtuoso
          ref={virtuoso}
          useWindowScroll
          data={dhatuList}
          components={{ List, Item }}
          itemContent={(_, dhatuDetails) => (
            <DhatuListItem
              key={dhatuDetails.id}
              dhatuDetails={dhatuDetails}
              searchQuery={searchQuery}
            />
          )}
        />
      </div>

      <ScrollToTop goToTop={goToTop} />
    </>
  );
}
