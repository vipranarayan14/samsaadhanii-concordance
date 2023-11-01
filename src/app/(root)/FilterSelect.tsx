import Form from "react-bootstrap/Form";

type Props = {
  name: string;
  label: string;
  options: string[];
  value: string;
  handleChange: (name: string, value: string) => void;
};

export function FilterSelect({
  name,
  label,
  options,
  value,
  handleChange,
}: Props) {
  return (
    <div className="align-items-center d-flex my-2">
      <div style={{ minWidth: "15%" }}>
        <label htmlFor={name} className="me-2 fw-bold">
          {label}
        </label>
      </div>

      <div className="flex-grow-1">
        <Form.Select
          id={`${name}-select`}
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
        </Form.Select>
      </div>
    </div>
  );
}
