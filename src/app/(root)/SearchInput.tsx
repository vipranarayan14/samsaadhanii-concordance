import { useEffect, useState } from "react";

import { useDebouncedCallback } from "use-debounce";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { BsXLg } from "react-icons/bs";

import { searchInput } from "@/utils/viewInputsData";

import type { Query } from "@/utils/types";

const getInputValueFromQuery = (query: Query) => {
  return query[searchInput.name] ?? "";
};

type Props = {
  query: Query;
  updateQuery: (query: Query) => void;
  setIsTyping: (isTyping: boolean) => void;
};

export function SearchInput({ query, updateQuery, setIsTyping }: Props) {
  const initialValue = getInputValueFromQuery(query);

  const [inputValue, setInputValue] = useState(initialValue);

  const debouncedSetQuery = useDebouncedCallback((query: Query) => {
    updateQuery(query);

    setIsTyping(false);
  }, 500);

  const updateSearchQuery = (searchString: string) => {
    setInputValue(searchString);

    setIsTyping(true);

    debouncedSetQuery({ [searchInput.name]: searchString });
  };

  const isInputEmpty = inputValue === "";

  useEffect(() => {
    const newInputValue = getInputValueFromQuery(query);

    // To prevent re-render
    if (newInputValue === inputValue) return;

    setInputValue(newInputValue);
  }, [query]);

  return (
    <>
      <Form.Control
        type="text"
        name="q"
        placeholder="Type to filter..."
        className="_bg-surface border border-0 ms-0 p-2 shadow-none"
        value={inputValue}
        autoCorrect="off"
        spellCheck="false"
        onChange={(e) => updateSearchQuery(e.target.value)}
      />

      {!isInputEmpty && (
        <Button
          variant="light"
          className="_rounded-end-1 border border-0 shadow-none"
          title="Clear"
          onClick={() => updateSearchQuery("")}
        >
          <BsXLg />
        </Button>
      )}
    </>
  );
}
