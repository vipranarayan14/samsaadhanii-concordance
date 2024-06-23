import Link from "next/link";

import type { DhatuDetails } from "@/utils/types";
import { createDhatuItemId } from "@/utils/itemId";

import { VrittiInfo } from "@/commons/components/VrittiInfo";

import { LocatorBtn } from "./LocatorBtn";

type Props = {
  dhatuDetails: DhatuDetails;
  hilite: (text: string) => JSX.Element;
  locate: (itemId: string) => void;
  showLocator: boolean;
};

export function DhatuListItem({
  dhatuDetails,
  hilite,
  locate,
  showLocator,
}: Props) {
  const {
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

  const itemId = createDhatuItemId(dhatuDetails);

  return (
    <>
      {showLocator && <LocatorBtn locate={() => locate(itemId)} />}

      <Link
        href={`/dhatu/${itemId}`}
        className="text-decoration-none text-body"
      >
        <div className="align-items-center d-flex flex-column flex-md-row text-center">
          <div className="p-1 w-100" style={{ fontSize: "1.1rem" }}>
            <span className="fw-bold">
              {hilite(muladhatu)} ({hilite(dhatu)})
            </span>{" "}
            <span>{hilite(meaning)}</span>
          </div>

          <div
            className="d-flex justify-content-between"
            style={{ fontSize: "1.1rem" }}
          >
            <div className="p-2" data-slot="gana">
              {hilite(gana)}
            </div>
            <div className="p-2" data-slot="padi">
              {hilite(padi)}
            </div>
            <div className="p-2" data-slot="it">
              {hilite(it)}
            </div>
          </div>

          <hr className="_border-divider d-block d-md-none m-0 w-75" />

          <div className="d-flex justify-content-evenly ps-md-2 w-100">
            <VrittiInfo vrittiName="माधवीयधातुवृत्तिः" vrittiId={madhaviyaId} />
            <VrittiInfo
              vrittiName="क्षीरतरङ्गिणी"
              vrittiId={kshirataranginiId}
            />
            <VrittiInfo vrittiName="धातुप्रदीपः" vrittiId={dhatupradipaId} />
          </div>
        </div>
      </Link>
    </>
  );
}
