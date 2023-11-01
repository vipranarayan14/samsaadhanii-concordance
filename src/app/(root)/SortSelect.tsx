import Form from "react-bootstrap/Form";

type Props = {
  name: string;
  label: string;
  options: string[];
  value: string;
  handleChange: (name: string, value: string) => void;
};

export function SortSelect({
  name,
  label,
  options,
  value,
  handleChange,
}: Props) {
  return (
    <div>
      <label htmlFor={name} className="d-block h6 fw-bold">
        {label}
      </label>

      <div>
        <Form.Select
          id={`${name}-select`}
          name={name}
          className="bg-body _border-divider rounded-1"
          value={value}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
        >
          {options.map((option, index) => {
            const value = index === 0 ? "" : option;

            return (
              <option key={option} value={value}>
                {option}
              </option>
            );
          })}
        </Form.Select>
      </div>
    </div>
  );
}
