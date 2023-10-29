"use client";

import { useInView } from "react-intersection-observer";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { BsXLg } from "react-icons/bs";

import { ViewOptionsBtn } from "./ViewOptionsBtn";

export function Search() {
  const { ref, entry } = useInView({ threshold: 1 });

  const isPinned = entry && entry.intersectionRatio < 1;
  const bg = isPinned ? "bg-primary" : "bg-body";

  return (
    <section className={`sticky-top _transition-bg ${bg}`} style={{ top: -1 }}>
      <Container ref={ref} fluid="sm" className=" p-0">
        <Row className="g-0 justify-content-center">
          <Col style={{ maxWidth: "700px" }}>
            <Form className="d-flex align-items-center py-2 px-1">
              <div className="flex-fill rounded-1 shadow">
                <div className="input-group rounded-1">
                  <ViewOptionsBtn />

                  <Form.Control
                    type="text"
                    name="search"
                    placeholder="Type to filter..."
                    className="_bg-surface border border-0 ms-0 p-2 shadow-none"
                  />

                  <Button
                    variant="light"
                    className="_rounded-end-1 border border-0 shadow-none"
                    title="Clear"
                  >
                    <BsXLg />
                  </Button>
                </div>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
