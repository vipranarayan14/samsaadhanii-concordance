import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import Button from "react-bootstrap/Button";

import { BsPlusLg, BsDashLg, BsPlusCircle, BsDashCircle } from "react-icons/bs";

import { Icon } from "@/commons/components/Icon";
import { useState } from "react";

type Props = {
  label: string;
  value?: string;
  onChange?: (value: string) => void;
};

export function FilterSelectOption({ label, value, onChange }: Props) {
  // Possible values: "+", "-", ""
  const [selected, setSelected] = useState<string>(value ?? "");

  const _onChange = (selected: string[]) => {
    const _selected = selected.at(-1) ?? "";

    onChange?.(_selected);

    return setSelected(_selected);
  };

  return (
    <ToggleButtonGroup
      type="checkbox"
      value={selected ? [selected] : []}
      onChange={_onChange}
      className="mb-2 me-2"
    >
      <ToggleButton
        variant="outline-primary"
        id={`${label}-check-1`}
        value={"+"}
      >
        <Icon>
          <BsPlusCircle />
        </Icon>
      </ToggleButton>
      <Button variant="outline-dark" disabled id={`${label}-check-1`}>
        {label}
      </Button>
      <ToggleButton
        variant="outline-danger"
        id={`${label}-check-3`}
        value={"-"}
      >
        <Icon>
          <BsDashCircle />
        </Icon>
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
