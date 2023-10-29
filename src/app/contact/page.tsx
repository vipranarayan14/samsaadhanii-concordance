import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Concordance of Pāṇinian Dhātuvṛttis",
};

export default function About() {
  return (
    <div className="py-2">
      <div className="py-2">
        <h1 className="fs-4">Contact Us</h1>
      </div>
      <div>
        <p className="fs-6 fw-bold">Amba P. Kulkarni</p>
        <p>
          Professor,
          <br />
          Department of Sanskrit Studies,
          <br />
          University of Hyderabad,
          <br />
          Hyderabad, Telangana, India.
        </p>
        <p>
          <a href="mailto:ambapradeep@gmail.com">ambapradeep@gmail.com</a>
        </p>
      </div>
    </div>
  );
}
