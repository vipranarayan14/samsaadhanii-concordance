import Form from "react-bootstrap/Form";

type Props = {
  name: string;
  label: string;
  options: string[];
};

export function FilterSelect({ name, label, options }: Props) {
  return (
    <div className="align-items-center d-flex my-2">
      <div style={{ minWidth: "15%" }}>
        <label htmlFor={`${name}-select`} className="me-2 fw-bold">
          {label}
        </label>
      </div>

      <div className="flex-grow-1">
        <Form.Select
          id={`${name}-select`}
          name={`${name}-select`}
          className="_border-divider rounded-1"
          defaultValue={""}
        >
          <option value="">सर्वे</option>

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
