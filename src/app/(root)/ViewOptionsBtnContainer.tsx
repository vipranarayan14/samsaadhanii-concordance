import { useState } from "react";

import type { Query, ViewOptions } from "@/utils/types";

import { getViewOptionsFromQuery } from "@/utils/getViewOptionsFromQuery";

import { ViewOptionsBtn } from "./ViewOptionsBtn";
import { ViewOptionsModal } from "./ViewOptionsModal";

type Props = {
  query: Query;
  setQuery: (query: Query) => void;
};

const checkIsViewOptionsSet = (viewOptions: ViewOptions) =>
  // checking `.length` will work for both array and string
  Object.values(viewOptions).some((value) => value.length > 0);

export function ViewOptionsBtnContainer({ query, setQuery }: Props) {
  const [show, setShow] = useState(false);

  const viewOptions = getViewOptionsFromQuery(query);

  const setViewOptions = (viewOptions: ViewOptions) => setQuery(viewOptions);
  const resetViewOptions = () => setQuery(getViewOptionsFromQuery({}));

  const isViewOptionsSet = checkIsViewOptionsSet(viewOptions);

  return (
    <>
      <ViewOptionsBtn
        isViewOptionsSet={isViewOptionsSet}
        handleClick={() => setShow(true)}
      />

      <ViewOptionsModal
        show={show}
        onHide={() => setShow(false)}
        viewOptions={viewOptions}
        setViewOptions={setViewOptions}
        resetViewOptions={resetViewOptions}
      />
    </>
  );
}
