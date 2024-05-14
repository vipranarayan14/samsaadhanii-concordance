import React from "react";

import Placeholder from "react-bootstrap/Placeholder";

export function VrittiContentPlaceholder() {
  return (
    <Placeholder animation="glow">
      <Placeholder xs={7} /> <Placeholder xs={4} />
      <br />
      <Placeholder xs={4} /> <Placeholder xs={6} />
      <br />
      <Placeholder xs={5} /> <Placeholder xs={6} />
      <br />
      <Placeholder xs={8} />
    </Placeholder>
  );
}
