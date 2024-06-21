import ToggleButton from "react-bootstrap/ToggleButton";
import Badge from "react-bootstrap/Badge";

import { BsCheckLg } from "react-icons/bs";

import { Icon } from "@/commons/components/Icon";
import { useId } from "react";

type Props = {
  label: string;
  option: string;
  selected: boolean;
  onChange: (option: string, isSelected: boolean) => void;
};

export function SelectOption({ label, option, selected, onChange }: Props) {
  const id = useId();

  const selectedClassName = "border-success";
  const unselectedClassName = "border-success-subtle";

  const className = selected ? selectedClassName : unselectedClassName;

  return (
    // NOTE: Wrapper needed to avoid scroll-jumping on btn toggle
    <div className="d-inline-block">
      <ToggleButton
        id={id}
        type="checkbox"
        checked={selected}
        value={option}
        onChange={(e) => onChange(option, e.currentTarget.checked)}
        className={`position-relative bg-white text-body ${className}`}
        style={{ marginRight: "0.7rem", marginTop: "0.7rem", minWidth: "48px" }}
      >
        {label}

        {selected && (
          <Badge
            bg="success"
            className="position-absolute top-0 start-0 translate-middle p-1 rounded-circle"
          >
            <Icon>
              <BsCheckLg />
            </Icon>
            <span className="visually-hidden">Selected</span>
          </Badge>
        )}
      </ToggleButton>
    </div>
  );
}
