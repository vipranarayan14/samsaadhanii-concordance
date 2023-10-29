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
        <p>
          This page provides the comparison of Pāṇinian Dhātuvṛttis. The three
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
          This work is reported in the&nbsp;
          <a href="http://sanskrit.uohyd.ac.in/faculty/amba/PUBLICATIONS/Student_Thesis/shailaja_PhD.pdf">
            Ph.D. thesis of Dr. Shailaja N.
          </a>
        </p>
      </div>
    </div>
  );
}
