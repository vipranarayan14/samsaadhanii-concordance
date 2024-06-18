import type { Query, ViewOptions } from "@/utils/types";
import { filterInputs, sortInput } from "@/utils/viewInputsData";

export const getViewOptionsFromQuery = (query: Query): ViewOptions => {
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
