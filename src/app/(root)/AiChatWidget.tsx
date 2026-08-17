"use client";

import React, { useState } from "react";
import AiChatButton from "./AiChatButton";
import AiChatWindow from "./AiChatWindow";

export default function AiChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <AiChatButton isOpen={isOpen} toggle={() => setIsOpen((s) => !s)} />
      <AiChatWindow isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
