import { useState } from "react";

import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";

import { BsCheck2, BsArrowCounterclockwise } from "react-icons/bs";

import {
  filterInputs,
  sortInput,
  viewInputsNames,
} from "@/utils/viewInputsData";

import { SortSelect } from "./SortSelect";
import { FilterSelect } from "./FilterSelect";
import { Query } from "./Search";

type Props = {
  handleHide: () => void;
  show: boolean;
  query: Query;
  setQuery: (query: Query) => void;
};

const viewInputsInitialValues = Object.fromEntries(
  viewInputsNames.map((inputName) => [inputName, ""])
);

export function ViewOptionsOffcanvas({
  handleHide,
  show,
  query,
  setQuery,
}: Props) {
  const inputsValuesFromQuery = {
    ...viewInputsInitialValues,
    ...query,
  };

  const [inputsValues, setInputsValues] = useState<Record<string, string>>(
    inputsValuesFromQuery
  );

  const handleChange = (name: string, value: string) => {
    setInputsValues((values) => ({ ...values, [name]: value }));

    setQuery({ [name]: value });
  };

  const handleResetClick = () => {
    setInputsValues(viewInputsInitialValues);

    setQuery(viewInputsInitialValues);
  };

  return (
    <Offcanvas
      onHide={handleHide}
      show={show}
      placement="start"
      className="_bg-surface"
      style={{ width: "300px" }}
      aria-labelledby="view-options-title"
    >
      <Offcanvas.Header>
        <Offcanvas.Title id="view-options-title">
          <h1 className="h5">Options</h1>
        </Offcanvas.Title>

        <Button
          variant="light"
          onClick={handleHide}
          className="btn-close"
          aria-label="Close"
        ></Button>
      </Offcanvas.Header>

      <Offcanvas.Body>
        <div>
          <SortSelect
            {...sortInput}
            value={inputsValues[sortInput.name]}
            handleChange={handleChange}
          />
        </div>

        <div className="my-4">
          <div>
            <h2 className="h6 fw-bold">Filter by</h2>
          </div>

          {filterInputs.map(({ name, label, options }) => (
            <FilterSelect
              key={name}
              name={name}
              label={label}
              options={options}
              value={inputsValues[name]}
              handleChange={handleChange}
            />
          ))}
        </div>
      </Offcanvas.Body>

      <div className="_offcanvas-footer flex-row-reverse">
        <Button variant="outline-primary" onClick={handleHide}>
          <BsCheck2 />
          &nbsp;
          <span>Okay</span>
        </Button>

        <Button variant="outline-danger" onClick={handleResetClick}>
          <BsArrowCounterclockwise />
          &nbsp;
          <span>Reset</span>
        </Button>
      </div>
    </Offcanvas>
  );
}
