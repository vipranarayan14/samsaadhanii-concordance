import Link from "next/link";

import { BsGeoAltFill } from "react-icons/bs";
import Button from "react-bootstrap/Button";

import type { DhatuDetails } from "@/utils/types";
import { translitToWX } from "@/utils/utils";
import { SearchQuery } from "@/utils/search/getSearchQuery";
import { hiliteMatches } from "@/utils/search/hiliteMatches";

import { VrittiInfo } from "@/commons/components/VrittiInfo";
import { Icon } from "@/commons/components/Icon";

type Props = {
  dhatuDetails: DhatuDetails;
  searchQuery?: SearchQuery | null;
  locate: (entryId: string) => void;
};

export function DhatuListItem({ dhatuDetails, searchQuery, locate }: Props) {
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

  const hilite = (text: string) =>
    searchQuery ? hiliteMatches(text, searchQuery) : <>{text}</>;

  const itemId = `${id}-${translitToWX(dhatu)}`;

  return (
    <>
      {searchQuery && (
        <Button
          variant="transparent"
          onClick={() => locate(dhatuDetails.id)}
          className="btn-sm position-absolute"
          style={{ top: "5px", left: "5px" }}
          title="Locate this on the list"
        >
          <Icon>
            <BsGeoAltFill />
          </Icon>
        </Button>
      )}

      <Link href={`/dhatu/${id}`} className="text-decoration-none text-body">
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
