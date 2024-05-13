import { FaArrowUp } from "react-icons/fa6";

import Button from "react-bootstrap/Button";
import { Icon } from "./Icon";

type Props = {
  goToTop: () => void;
};

export function ScrollToTop({ goToTop }: Props) {
  return (
    <Button
      variant="secondary"
      id="scroll-to-top"
      className="d-flex position-fixed bottom-0 end-0 z-fixed m-3 py-2 shadow rounded-1"
      onClick={goToTop}
    >
      <Icon>
        <FaArrowUp />
      </Icon>
    </Button>
  );
}
