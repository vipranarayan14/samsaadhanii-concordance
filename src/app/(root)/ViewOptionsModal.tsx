import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";

import type { ViewOptions } from "@/utils/types";

import { BsCheck2, BsArrowCounterclockwise } from "react-icons/bs";

import { viewSort } from "@/utils/search/viewSort";
import { viewFilters } from "@/utils/search/viewFilters";

import { Icon } from "@/commons/components/Icon";

import { FilterSelect } from "./FilterSelect";
import { SortSelect } from "./SortSelect";

type Props = {
  onHide: () => void;
  show: boolean;
  viewOptions: ViewOptions;
  setViewOptions: (viewOptions: ViewOptions) => void;
  resetViewOptions: () => void;
};

export function ViewOptionsModal({
  onHide,
  show,
  viewOptions,
  setViewOptions,
  resetViewOptions,
}: Props) {
  const handleChange = (name: string, value: string | string[]) => {
    setViewOptions({ [name]: value });
  };

  const handleResetClick = () => {
    resetViewOptions();
  };

  const handleApplyClick = () => {
    onHide();
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      scrollable
      centered
      fullscreen="md-down"
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>Sort & Filter</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Stack gap={5}>
          <SortSelect
            label={viewSort.label}
            options={viewSort.options}
            value={viewOptions[viewSort.name] as string}
            onChange={(value) => handleChange(viewSort.name, value)}
          />
          {viewFilters.map(({ name, label, options }) => (
            <FilterSelect
              key={name}
              label={label}
              options={options}
              value={viewOptions[name] as string[]}
              onChange={(value) => handleChange(name, value)}
            />
          ))}
        </Stack>
      </Modal.Body>

      <Modal.Footer className="flex-row-reverse justify-content-between">
        <Button variant="primary" onClick={handleApplyClick}>
          <Icon>
            <BsCheck2 />
          </Icon>
          &nbsp;
          <span>Apply</span>
        </Button>

        <Button variant="danger" onClick={handleResetClick}>
          <Icon>
            <BsArrowCounterclockwise />
          </Icon>
          &nbsp;
          <span>Reset</span>
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
