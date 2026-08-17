"use client";

import Button from "react-bootstrap/Button";
import { BsChatDots } from "react-icons/bs";
import React from "react";

type Props = {
  isOpen: boolean;
  toggle: () => void;
};

export default function AiChatButton({ isOpen, toggle }: Props) {
  return (
    <Button
      variant={isOpen ? "primary" : "light"}
      className="_rounded-end-1 border border-0 shadow-none d-flex align-items-center"
      title="Ask AI"
      onClick={toggle}
    >
      <BsChatDots />
    </Button>
  );
}
