import { useState } from "react";

import { ViewOptionsOffcanvas } from "./ViewOptionsOffcanvas";
import { ViewOptionsBtn } from "./ViewOptionsBtn";
import { Query } from "./Search";
import { viewInputsNames } from "@/utils/viewInputsData";

type Props = {
  query: Query;
  setQuery: (query: Query) => void;
};

const getViewOptionsQuery = (query: Query) => {
  const viewOptionsQuery: Query = {};

  for (const [name, value] of Object.entries(query)) {
    if (viewInputsNames.includes(name)) {
      viewOptionsQuery[name] = value;
    }
  }

  return viewOptionsQuery;
};

export function ViewOptions({ query, setQuery }: Props) {
  const [show, setShow] = useState(false);

  const showViewOptions = () => setShow(true);
  const hideViewOptions = () => setShow(false);

  const viewOptionsQuery = getViewOptionsQuery(query);

  const isViewOptionsSet = Object.values(viewOptionsQuery).some(
    (value) => value !== ""
  );

  return (
    <>
      <ViewOptionsBtn
        isViewOptionsSet={isViewOptionsSet}
        handleClick={showViewOptions}
      />

      <ViewOptionsOffcanvas
        show={show}
        handleHide={hideViewOptions}
        query={viewOptionsQuery}
        setQuery={setQuery}
      />
    </>
  );
}
