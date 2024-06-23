import React from "react";

type Props = {
  children: React.ReactNode;
};

export function SectionHeading({ children }: Props) {
  return (
    <header>
      <h2 className="py-2 my-3 fs-4 border-bottom">{children}</h2>
    </header>
  );
}
