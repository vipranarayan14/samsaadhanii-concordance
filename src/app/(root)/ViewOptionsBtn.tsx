import { useState } from "react";
import { IconContext } from "react-icons";
import { BsSliders } from "react-icons/bs";
import Button from "react-bootstrap/Button";

import { ViewOptionsOffcanvas } from "./ViewOptionsOffcanvas";

export function ViewOptionsBtn() {
  const [show, setShow] = useState(false);

  const showViewOptions = () => setShow(true);
  const hideViewOptions = () => setShow(false);

  return (
    <>
      <Button
        variant="secondary"
        className="bg-secondary-hover _rounded-start-1 border border-0 shadow-none"
        title="Show sort/filter options"
        onClick={showViewOptions}
      >
        <IconContext.Provider
          value={{
            size: "1.2rem",
            style: { verticalAlign: "-0.2em" },
          }}
        >
          <span className="position-relative">
            <BsSliders />
            <span
              className="position-absolute start-0 translate-middle bg-danger rounded-circle _hidden"
              style={{ top: "10%", padding: "0.35rem" }}
            >
              <span className="visually-hidden">
                Some view options are modified
              </span>
            </span>
          </span>
        </IconContext.Provider>
      </Button>

      <ViewOptionsOffcanvas show={show} handleHide={hideViewOptions} />
    </>
  );
}
