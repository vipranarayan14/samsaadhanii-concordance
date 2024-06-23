"use client";

import { useRouter } from "next/navigation";

import { BsArrowLeft } from "react-icons/bs";

import { Icon } from "@/commons/components/Icon";
import { Button } from "react-bootstrap";

export function BackBtn() {
  const router = useRouter();

  return (
    <Button
      variant="outline-secondary"
      //   size="sm"
      onClick={() => router.back()}
      className="fs-4 border border-0 text-body"
    >
      <Icon>
        <BsArrowLeft />
      </Icon>
    </Button>
  );
}
