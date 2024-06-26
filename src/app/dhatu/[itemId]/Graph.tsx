"use client";

import Image from "next/image";
import Card from "react-bootstrap/Card";
import { BsBoxArrowUpRight } from "react-icons/bs";

import { Icon } from "@/commons/components/Icon";
import { getGraphSrc } from "@/utils/getGraphSrc";

type Props = {
  graphURL: string;
};

export function Graph({ graphURL }: Props) {
  const graphSrc = getGraphSrc(graphURL);

  return (
    <Card className="_bg-surface _border-thick">
      <Card.Body>
        <div className="text-center" data-slot="graph">
          <div
            className="d-flex align-items-center justify-content-center"
            style={{ maxHeight: "500px", minHeight: "500px" }}
          >
            <Image
              src={graphSrc}
              alt="Graph"
              className="w-auto mw-100 p-2"
              style={{ maxHeight: "inherit" }}
              width={500}
              height={500}
            />
          </div>
          <a
            className="btn btn-outline-primary rounded-1 m-2"
            href={graphSrc}
            target="_blank"
          >
            <span>Show full size</span>
            &nbsp;&nbsp;
            <Icon>
              <BsBoxArrowUpRight />
            </Icon>
          </a>
        </div>
      </Card.Body>
    </Card>
  );
}
