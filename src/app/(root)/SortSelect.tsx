import { SelectOption } from "./SelectOption";

type Props = {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
};

export function SortSelect({ label, options, value, onChange }: Props) {
  // NOTE: This now a controlled component. If needed, it can be
  // converted to a uncontrolled component by managing state locally.

  const selectedOption = value;

  const handleOptionChange = (option: string, isSelected: boolean) => {
    if (isSelected) {
      onChange(option);
    } else {
      onChange("");
    }
  };

  return (
    <div className="align-items-center mb-3">
      <div>
        <span className="me-2 fw-bold">{label}</span>
      </div>

      <div className="d-flex flex-wrap">
        {options.map((option) => (
          <SelectOption
            key={option}
            label={option}
            option={option}
            selected={selectedOption === option}
            onChange={handleOptionChange}
          />
        ))}
      </div>
    </div>
  );
}
