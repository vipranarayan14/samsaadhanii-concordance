import React, { useEffect, useRef } from "react";

import { Virtuoso, VirtuosoHandle } from "react-virtuoso";
import ListGroup from "react-bootstrap/ListGroup";

import type { DhatuDetails } from "@/utils/types";
import { SearchQuery } from "@/utils/search/getSearchQuery";

import { DhatuListItem } from "./DhatuListItem";
import { ScrollToTop } from "@/commons/components/ScrollToTop";

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

const Item = ({ isLocated, ...props }: { isLocated: boolean }) => {
  const locatedClassName = isLocated ? "located" : "";

  return (
    <div
      {...props}
      className={`list-group-item list-group-item-action _bg-surface _bg-surface-hover p-1 ${locatedClassName}`}
    ></div>
  );
};

type Props = {
  dhatuList: DhatuDetails[];
  locate: (entryId: string) => void;
  locatedItemId: string | null;
  searchQuery?: SearchQuery | null;
};

export function DhatuList({
  dhatuList,
  locate,
  locatedItemId,
  searchQuery,
}: Props) {
  const virtuoso = useRef<VirtuosoHandle>(null);

  const goToTop = () => {
    virtuoso.current?.scrollToIndex({
      index: 0,
      behavior: "auto",
      align: "end",
    });
  };

  useEffect(() => {
    if (locatedItemId !== null) {
      virtuoso.current?.scrollToIndex({
        index: Number(locatedItemId),
        behavior: "auto",
        align: "center",
      });
    } else {
      goToTop();
    }
  }, [locatedItemId]);

  return (
    <>
      <div className="py-2">
        <Virtuoso
          ref={virtuoso}
          useWindowScroll
          data={dhatuList}
          components={{
            List,
            // Remove `item` from props to avoid `item="[Object Object]"` attr in HTML
            Item: ({ item: _, ...props }) => (
              <Item
                {...props}
                isLocated={props["data-index"] === Number(locatedItemId)}
              />
            ),
          }}
          itemContent={(_, dhatuDetails) => (
            <DhatuListItem
              key={dhatuDetails.id}
              dhatuDetails={dhatuDetails}
              searchQuery={searchQuery}
              locate={locate}
            />
          )}
        />
      </div>

      <ScrollToTop goToTop={goToTop} />
    </>
  );
}
