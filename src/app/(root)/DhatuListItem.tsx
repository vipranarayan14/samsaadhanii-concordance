import Link from "next/link";

import { VrittiInfo } from "@/commons/components/VrittiInfo";
import { DhatuDetails } from "@/utils/getDhatupatha";

type Props = {
  dhatuDetails: DhatuDetails;
};

export function DhatuListItem({ dhatuDetails }: Props) {
  const {
    id,
    muladhatu,
    dhatu,
    meaning,
    gana,
    padi,
    it,
    madhaviyaId,
    kshirataranginiId,
    dhatupradipaId,
  } = dhatuDetails;

  return (
    <Link
      href={`/dhatu/${id}`}
      className="list-group-item list-group-item-action _bg-surface _bg-surface-hover p-1 position-relative"
    >
      {/* <button
        className="btn btn-transparent btn-sm position-absolute"
        data-action="locate"
        style={{ top: "5px", left: "5px" }}
        title="Locate this on the list"
      >
        <span data-icon="locate">
          <component src="/commons/icons/locate.html"></component>
        </span>

        <span data-icon="spinner" className="_hidden">
          <span
            className="spinner-grow spinner-grow-sm"
            role="status"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Loading...</span>
        </span>
      </button> */}

      <div className="align-items-center d-flex flex-column flex-md-row text-center">
        <div className="p-1 w-100" style={{ fontSize: "1.1rem" }}>
          <span className="fw-bold">{`${muladhatu} (${dhatu})`}</span>{" "}
          <span>{meaning}</span>
        </div>

        <div
          className="d-flex justify-content-between"
          style={{ fontSize: "1.1rem" }}
        >
          <div className="m-2" data-slot="gana">
            {gana}
          </div>
          <div className="m-2" data-slot="padi">
            {padi}
          </div>
          <div className="m-2" data-slot="it">
            {it}
          </div>
        </div>

        <hr className="_border-divider d-block d-md-none m-0 w-75" />

        <div className="d-flex justify-content-evenly ms-md-2 w-100">
          <VrittiInfo vrittiName="माधवीयधातुवृत्तिः" vrittiId={madhaviyaId} />
          <VrittiInfo vrittiName="क्षीरतरङ्गिणी" vrittiId={kshirataranginiId} />
          <VrittiInfo vrittiName="धातुप्रदीपः" vrittiId={dhatupradipaId} />
        </div>
      </div>
    </Link>
  );
}
