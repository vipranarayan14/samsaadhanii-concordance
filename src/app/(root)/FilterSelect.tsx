import Stack from "react-bootstrap/Stack";

import type { FilterOption } from "@/utils/search/viewFilters";

import { SelectOption } from "./SelectOption";
import { LinkButton } from "./LinkButton";

type Props = {
  label: string;
  options: FilterOption[];
  value: string[];
  onChange: (value: string[]) => void;
};

export function FilterSelect({ label, options, value, onChange }: Props) {
  // NOTE: This now a controlled component. If needed, it can be
  // converted to a uncontrolled component by managing state locally.

  const selectedOptions = value;

  const handleSelectAll = () => {
    const newSelectedOptions = options.map(({ name }) => name);

    onChange(newSelectedOptions);
  };

  const handleClear = () => {
    onChange([]);
  };

  const handleOptionChange = (optionName: string, isSelected: boolean) => {
    const newSelectedOptions = isSelected
      ? [...selectedOptions, optionName]
      : selectedOptions.filter((_optionName) => _optionName !== optionName);

    onChange(newSelectedOptions);
  };

  return (
    <div>
      <Stack direction="horizontal" gap={1} className="mb-3">
        <span className="me-1 fs-5">{label}</span>
        <span
          style={{
            height: "1px",
            width: "100%",
            backgroundColor: "var(--bs-border-color)",
          }}
        />
        <LinkButton onClick={handleSelectAll}>Select&nbsp;All</LinkButton>
        <LinkButton onClick={handleClear}>Clear</LinkButton>
      </Stack>

      <Stack direction="horizontal" className="flex-wrap" style={{gap: "0.7rem"}}>
        {options.map((option) => (
          <SelectOption
            key={option.name}
            label={option.label}
            option={option.name}
            selected={selectedOptions.includes(option.name)}
            onChange={handleOptionChange}
          />
        ))}
      </Stack>
    </div>
  );
}
