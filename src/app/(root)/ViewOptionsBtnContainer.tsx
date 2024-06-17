import type { Query, ViewOptions } from "@/utils/types";

import { useState } from "react";

import { ViewOptionsBtn } from "./ViewOptionsBtn";
import { ViewOptionsModal } from "./ViewOptionsModal";

import { filterInputs, sortInput } from "@/utils/viewInputsData";

type Props = {
  query: Query;
  setQuery: (query: Query) => void;
};

const getViewOptionsFromQuery = (query: Query): ViewOptions => {
  const inputsValues: Record<string, string | string[]> = {};

  inputsValues[sortInput.name] = query[sortInput.name] ?? "";

  for (const { name } of filterInputs) {
    let value = query[name];

    if (!value) value = [];

    if (!Array.isArray(value)) value = [value];

    inputsValues[name] = value;
  }

  return inputsValues;
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
