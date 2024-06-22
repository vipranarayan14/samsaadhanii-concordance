import { useId } from "react";

import Form from "react-bootstrap/Form";

import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";

import { FilterSelectOption } from "./FilterSelectOption";

type Props = {
  name: string;
  label: string;
  options: string[];
  value: string;
  handleChange: (name: string, value: string) => void;
};

export function FilterSelect3({
  name,
  label,
  options,
  value,
  handleChange,
}: Props) {
  const id = useId();

  return (
    <div className="align-items-center my-2">
      <div>
        <label htmlFor={id} className="me-2 fw-bold">
          {label}
        </label>
      </div>

      <div className="d-flex flex-wrap">
        {/* <Form.Select
          id={id}
          name={name}
          className="_border-divider rounded-1"
          value={value}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
        >
          <option value="">{`(none)`}</option>

          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}

        </Form.Select> */}

        <ToggleButtonGroup
          type="checkbox"
          defaultValue={[1, 3]}
          className="mb-2"
        >
          {options.map((option) => (
            <ToggleButton id={`${label}-${option}`} value={option}>
              {option}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </div>
    </div>
  );
}
