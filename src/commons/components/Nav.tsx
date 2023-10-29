"use client";

import Container from "react-bootstrap/Container";
import BSNav from "react-bootstrap/Nav";
import BSNavbar from "react-bootstrap/Navbar";
import Link from "next/link";

export function Nav() {
  return (
    <BSNavbar as="nav" expand="lg" className="navbar-dark bg-primary">
      <Container fluid="sm">
        <BSNavbar.Brand as={Link} href="/" className="d-flex flex-column">
          <span className="fs-6">Concordance of</span>
          <span className="fs-4 fw-bold">Pāṇinian Dhātuvṛttis</span>
        </BSNavbar.Brand>

        <BSNavbar.Toggle
          type="button"
          className="border border-0 p-2 fs-6"
          aria-controls="navbar-nav"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </BSNavbar.Toggle>

        <BSNavbar.Collapse className="collapse navbar-collapse justify-content-end">
          <BSNav as="ul">
            <BSNav.Item>
              <BSNav.Link as={Link} href="/">
                Home
              </BSNav.Link>
            </BSNav.Item>
            <BSNav.Item>
              <BSNav.Link as={Link} href="/about">
                About
              </BSNav.Link>
            </BSNav.Item>
            <BSNav.Item>
              <BSNav.Link as={Link} href="/contact">
                Contact Us
              </BSNav.Link>
            </BSNav.Item>
            <BSNav.Item>
              <BSNav.Link
                href="http://scl.samsaadhanii.in/scl/"
                target="_blank"
              >
                <span>Samsādhanī&nbsp;</span>
                {/* <component src="/commons/icons/ext-link.html"></component> */}
              </BSNav.Link>
            </BSNav.Item>
          </BSNav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
}
