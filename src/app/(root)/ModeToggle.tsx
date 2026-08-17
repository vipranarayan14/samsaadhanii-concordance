"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsSearch, BsStars } from "react-icons/bs";
import Badge from "react-bootstrap/Badge";
import Nav from "react-bootstrap/Nav";
import styles from "./ModeToggle.module.scss";

export function ModeToggle() {
  const pathname = usePathname();

  // Determine active key based on pathname
  const activeKey = pathname === "/analyse" ? "/analyse" : "/";

  return (
    <div className="p-2 d-flex">
      <Nav variant="underline" activeKey={activeKey} className="m-auto">
        <Nav.Link as={Link} href="/" eventKey="/" className={styles.navLink}>
          <BsSearch className="me-2" />
          Search
        </Nav.Link>
        <Nav.Link
          as={Link}
          href="/analyse"
          eventKey="/analyse"
          className={styles.navLink}
        >
          <BsStars className="me-2" />
          AI Analyse
          <Badge bg="warning" text="dark" className="ms-2">
            NEW
          </Badge>
        </Nav.Link>
      </Nav>
    </div>
  );
}
