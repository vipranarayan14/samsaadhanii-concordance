import { IconContext } from "react-icons";
import { BsSliders } from "react-icons/bs";

import Button from "react-bootstrap/Button";

function IndicatorDot() {
  return (
    <span
      className="position-absolute start-0 translate-middle bg-danger rounded-circle _hidden"
      style={{ top: "10%", padding: "0.35rem" }}
    >
      <span className="visually-hidden">Some view options are modified</span>
    </span>
  );
}

type Props = {
  handleClick: () => void;
  isViewOptionsSet: boolean;
};

export function ViewOptionsBtn({ handleClick, isViewOptionsSet }: Props) {
  return (
    <Button
      variant="secondary"
      className="bg-secondary-hover _rounded-start-1 border border-0 shadow-none"
      title="Show sort/filter options"
      onClick={handleClick}
    >
      <IconContext.Provider
        value={{
          size: "1.2rem",
          style: { verticalAlign: "-0.2em" },
        }}
      >
        <span className="position-relative">
          <BsSliders />

          {isViewOptionsSet && <IndicatorDot />}
        </span>
      </IconContext.Provider>
    </Button>
  );
}
