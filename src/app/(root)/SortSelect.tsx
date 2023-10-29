import Form from "react-bootstrap/Form";

type Props = {
  name: string;
  label: string;
  options: string[][];
};

export function SortSelect({ name, label, options }: Props) {
  return (
    <div>
      <label htmlFor={`${name}-select`} className="d-block h6 fw-bold">
        {label}
      </label>

      <div>
        <Form.Select
          id={`${name}-select`}
          name={`${name}-select`}
          className="bg-body _border-divider rounded-1"
          defaultValue={options[0][0]}
        >
          {options.map(([value, option]) => {
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
