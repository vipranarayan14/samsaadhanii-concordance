import React from "react";

import Placeholder from "react-bootstrap/Placeholder";

export function FormsContentPlaceholder() {
  return Array(5).fill(
    <div className="py-4">
      <Placeholder animation="glow" as="div" className="w-75 m-auto">
        <Placeholder style={{ width: "30%" }} className="h5 fw-bold" />
        <br />
        <Placeholder style={{ width: "16%" }} bg="secondary" />
        <span style={{ display: "inline-block", width: "1%" }}></span>
        <Placeholder style={{ width: "83%" }} />
        <br />
        <Placeholder style={{ width: "16%" }} />
        <span style={{ display: "inline-block", width: "1%" }}></span>
        <Placeholder style={{ width: "83%" }} />
        <br />
        <Placeholder style={{ width: "16%" }} />
        <span style={{ display: "inline-block", width: "1%" }}></span>
        <Placeholder style={{ width: "83%" }} />
        <br />
        <Placeholder style={{ width: "16%" }} />
        <span style={{ display: "inline-block", width: "1%" }}></span>
        <Placeholder style={{ width: "83%" }} />
      </Placeholder>
    </div>
  );
}
