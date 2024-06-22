import Stack from "react-bootstrap/Stack";

import { SortOption } from "@/utils/search/viewSort";

import { SelectOption } from "./SelectOption";

type Props = {
  label: string;
  options: SortOption[];
  value: string;
  onChange: (value: string) => void;
};

export function SortSelect({ label, options, value, onChange }: Props) {
  // NOTE: This now a controlled component. If needed, it can be
  // converted to a uncontrolled component by managing state locally.

  const selectedOption = value;

  const handleOptionChange = (optionName: string, isSelected: boolean) => {
    if (isSelected) {
      onChange(optionName);
    } else {
      onChange("");
    }
  };

  return (
    <div className="align-items-center mb-3">
      <div>
        <span className="me-2 fw-bold">{label}</span>
      </div>

      <Stack
        direction="horizontal"
        className="flex-wrap"
        style={{ gap: "0.7rem" }}
      >
        {options.map((option) => (
          <SelectOption
            key={option.name}
            label={option.label}
            option={option.name}
            selected={selectedOption === option.name}
            onChange={handleOptionChange}
          />
        ))}
      </Stack>
    </div>
  );
}
