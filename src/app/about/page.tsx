import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Concordance of Pāṇinian Dhātuvṛttis",
};

export default function About() {
  return (
    <div className="py-2">
      <div className="py-2">
        <h1 className="fs-4">About</h1>
      </div>
      <div>
        <h2 className="fs-5">Work</h2>
        <p>
          The site provides the comparison of Pāṇinian Dhātuvṛttis. The three
          vṛttis chosen are
        </p>

        <ul>
          <li>
            <span className="fw-bold my-1">
              Mādhavīyā Dhātuvṛtti by Sāyaṇa{" "}
            </span>
            <br />
            Editor: Pandit Ananta Śāstri Phadake and Vyākaraṇācārya Pandit
            Sadāśiva śarma Śāstri,
            <br />
            Publisher: Jai Kṛṣṇadās-Haridās Gupta, The Caukhamba Samskrit Series
            Office, Benares, 1934.
          </li>
          <li>
            <span className="fw-bold my-1">Kṣīrataraṅgiṇī by Kṣīrasvāmin </span>
            <br />
            Editor: Yudhiṣṭhira Mīmāṃsaka
            <br />
            Publisher: Rāmlāl Kapūr Trust, Revali, Sonipat (Haryana), 2005.
          </li>
          <li>
            <span className="fw-bold my-1">
              Dhātupradīpa by Maitreyarakṣita{" "}
            </span>
            <br />
            Editor: Śīśacandracakravartī Bhaṭṭācārya.
            <br />
            Publisher: Rāmlāl Kapūr Trust, Revali, Sahapuraturka, Sonipat
            (Haryana), 1986.
          </li>
        </ul>

        <p>
          This work is reported in the{" "}
          <a href="http://sanskrit.uohyd.ac.in/faculty/amba/PUBLICATIONS/Student_Thesis/shailaja_PhD.pdf">
            Ph.D. thesis of Dr. Shailaja N.
          </a>
        </p>

        <h2 className="fs-5">Legend</h2>
        <ul>
          <li>
            <span className="badge text-bg-primary">501</span> The numbers below
            each vritti name indicates the dhatu's location in the vritti.
          </li>
          <li>
            <span className="badge text-bg-danger">·</span> A red dot below a
            vritti name indicates that the dhatu (with its anubandha and/or
            meaning) is not found in that vritti.
          </li>
        </ul>

        <h2 className="fs-5">Credits</h2>
        <p>
          This site is developed by{" "}
          <a href="https://github.com/vipranarayan14/">
            Prasanna Venkatesh T S
          </a>
          .
        </p>
      </div>
    </div>
  );
}
