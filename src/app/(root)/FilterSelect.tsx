import type { FilterOption } from "@/utils/search/viewFilters";

import { SelectOption } from "./SelectOption";

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

  const handleOptionChange = (optionName: string, isSelected: boolean) => {
    const newSelectedOptions = isSelected
      ? [...selectedOptions, optionName]
      : selectedOptions.filter((_optionName) => _optionName !== optionName);

    onChange(newSelectedOptions);
  };

  return (
    <div className="mb-3">
      <div>
        <span className="me-2 fw-bold">{label}</span>
      </div>

      <div className="d-flex flex-wrap">
        {options.map((option) => (
          <SelectOption
            key={option.name}
            label={option.label}
            option={option.name}
            selected={selectedOptions.includes(option.name)}
            onChange={handleOptionChange}
          />
        ))}
      </div>
    </div>
  );
}
