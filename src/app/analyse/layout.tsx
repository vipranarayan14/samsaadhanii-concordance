"use client";

import { ModeToggle } from "@/app/(root)/ModeToggle";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ModeToggle />
      {children}
    </>
  );
}
