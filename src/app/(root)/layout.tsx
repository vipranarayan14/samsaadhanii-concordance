"use client";

import { ModeToggle } from "./ModeToggle";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ModeToggle />
      {children}
    </>
  );
}
