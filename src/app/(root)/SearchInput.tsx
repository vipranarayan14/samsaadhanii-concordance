import { useState } from "react";

import { useDebouncedCallback } from "use-debounce";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { BsXLg } from "react-icons/bs";

import { searchInput } from "@/utils/viewInputsData";

import { Query } from "./Search";

type Props = {
  query: Query;
  setQuery: (query: Query) => void;
  setIsTyping: (isTyping: boolean) => void;
};

export function SearchInput({ query, setQuery, setIsTyping }: Props) {
  const initialValue = query[searchInput.name] ?? "";

  const [inputValue, setInputValue] = useState(initialValue);

  const debouncedSetQuery = useDebouncedCallback((query: Query) => {
    setQuery(query);

    setIsTyping(false);
  }, 500);

  const updateSearchQuery = (searchString: string) => {
    setInputValue(searchString);

    setIsTyping(true);

    debouncedSetQuery({ [searchInput.name]: searchString });
  };

  return (
    <>
      <Form.Control
        type="text"
        name="q"
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
