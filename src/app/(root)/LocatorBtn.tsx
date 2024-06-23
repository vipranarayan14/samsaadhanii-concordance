import Button from "react-bootstrap/Button";

import { BsGeoAltFill } from "react-icons/bs";

import { Icon } from "@/commons/components/Icon";

type Props = {
  locate: VoidFunction;
};

export function LocatorBtn({ locate }: Props) {
  return (
    <Button
      variant="transparent"
      onClick={locate}
      className="btn-sm position-absolute"
      style={{ top: "5px", left: "5px" }}
      title="Locate this on the list"
    >
      <Icon>
        <BsGeoAltFill />
      </Icon>
    </Button>
  );
}
