import Stack from "react-bootstrap/Stack";

import { ViewSelectOption } from "./ViewSelectOption";
import { LinkButton } from "./LinkButton";

type ViewOption = {
  name: string;
  label: string;
};

type Props = {
  type: "radio" | "checkbox";
  label: string;
  options: ViewOption[];
  value: string[];
  onChange: (value: string[]) => void;
};

export function ViewSelect({ type, label, options, value, onChange }: Props) {
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

  const handleCheckboxOptionChange = (
    optionName: string,
    isSelected: boolean
  ) => {
    const newSelectedOptions = isSelected
      ? [...selectedOptions, optionName]
      : selectedOptions.filter((_optionName) => _optionName !== optionName);

    onChange(newSelectedOptions);
  };

  const handleRadioOptionChange = (optionName: string, isSelected: boolean) => {
    if (isSelected) {
      onChange([optionName]);
    } else {
      onChange([]);
    }
  };

  return (
    <div>
      <Stack direction="horizontal" gap={1} className="mb-3">
        <span className="me-1 fs-5 text-nowrap">{label}</span>
        <span
          style={{
            height: "1px",
            width: "100%",
            backgroundColor: "var(--bs-border-color)",
          }}
        />

        {type === "checkbox" && (
          <>
            <LinkButton onClick={handleSelectAll}>Select All</LinkButton>
          </>
        )}
        <LinkButton onClick={handleClear}>Clear</LinkButton>
      </Stack>

      <Stack
        direction="horizontal"
        className="flex-wrap"
        style={{ gap: "0.7rem" }}
      >
        {options.map((option) => (
          <ViewSelectOption
            key={option.name}
            label={option.label}
            option={option.name}
            selected={selectedOptions.includes(option.name)}
            onChange={
              type === "checkbox"
                ? handleCheckboxOptionChange
                : handleRadioOptionChange
            }
          />
        ))}
      </Stack>
    </div>
  );
}
