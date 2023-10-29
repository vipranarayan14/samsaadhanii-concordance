import { BsCheck2, BsArrowCounterclockwise } from "react-icons/bs";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";

import { SortSelect } from "./SortSelect";
import { FilterSelect } from "./FilterSelect";

type Props = {
  handleHide: () => void;
  show: boolean;
};

export function ViewOptionsOffcanvas({ handleHide, show }: Props) {
  return (
    <Offcanvas
      onHide={handleHide}
      show={show}
      placement="start"
      className="_bg-surface"
      style={{ width: "300px" }}
      aria-labelledby="view-options-title"
    >
      <Offcanvas.Header>
        <Offcanvas.Title id="view-options-title">
          <h1 className="h5">Options</h1>
        </Offcanvas.Title>

        <Button
          variant="light"
          onClick={handleHide}
          className="btn-close"
          aria-label="Close"
        ></Button>
      </Offcanvas.Header>

      <Offcanvas.Body>
        <div>
          <SortSelect
            name="sort"
            label="Sort by"
            options={[
              ["", "गणः"],
              ["dhatu", "धातु"],
              ["artha", "अर्थ"],
            ]}
          />
        </div>

        <div className="my-4">
          <div>
            <h2 className="h6 fw-bold">Filter by</h2>
          </div>

          <FilterSelect
            name="vritti"
            label="वृत्तिः"
            options={["माधवीयधातुवृत्तिः", "क्षीरतरङ्गिणी", "धातुप्रदीपः"]}
          />

          <FilterSelect
            name="gana"
            label="गणः"
            options={[
              "भ्वादिः",
              "अदादिः",
              "जुहोत्यादिः",
              "दिवादिः",
              "स्वादिः",
              "तुदादिः",
              "रुधादिः",
              "तनादिः",
              "क्र्यादिः",
              "चुरादिः",
            ]}
          />

          <FilterSelect
            name="padi"
            label="पदि"
            options={["परस्मैपदी", "आत्मनेपदी", "उभयपदी"]}
          />

          <FilterSelect
            name="it"
            label="इट्"
            options={["सेट्", "अनिट्", "-"]}
          />
        </div>
      </Offcanvas.Body>

      <div className="_offcanvas-footer flex-row-reverse">
        <Button variant="outline-primary" onClick={handleHide}>
          <BsCheck2 />
          &nbsp;
          <span>Okay</span>
        </Button>

        <Button variant="outline-danger">
          <BsArrowCounterclockwise />
          &nbsp;
          <span>Reset</span>
        </Button>
      </div>
    </Offcanvas>
  );
}
