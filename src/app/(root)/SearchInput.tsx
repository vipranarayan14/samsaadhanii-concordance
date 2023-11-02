import { useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { BsXLg } from "react-icons/bs";
import { Query } from "./Search";
import { searchInput } from "@/utils/viewInputsData";

type Props = {
  query: Query;
  setQuery: (query: Query) => void;
};


export function SearchInput({ query, setQuery }: Props) {
  const initialValue = query[searchInput.name] ?? "";

  const [inputValue, setInputValue] = useState(initialValue);

  const updateSearchQuery = (searchString: string) => {
    setInputValue(searchString);

    setQuery({ [searchInput.name]: searchString });
  };

  return (
    <>
      <Form.Control
        type="text"
        name="search"
        placeholder="Type to filter..."
        className="_bg-surface border border-0 ms-0 p-2 shadow-none"
        value={inputValue}
        onChange={(e) => updateSearchQuery(e.target.value)}
      />

      <Button
        variant="light"
        className="_rounded-end-1 border border-0 shadow-none"
        title="Clear"
        onClick={() => updateSearchQuery("")}
      >
        <BsXLg />
      </Button>
    </>
  );
}