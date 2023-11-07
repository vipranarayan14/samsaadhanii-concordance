import Link from "next/link";

import { BsGeoAltFill } from "react-icons/bs";

import { DhatuDetails } from "@/utils/getDhatupathaLocal";
import { translitToWX } from "@/utils/utils";
import { SearchQuery } from "@/utils/search/getSearchQuery";
import { hiliteMatches } from "@/utils/search/hiliteMatches";

import { VrittiInfo } from "@/commons/components/VrittiInfo";
import { Icon } from "@/commons/components/Icon";

type Props = {
  dhatuDetails: DhatuDetails;
  searchQuery?: SearchQuery | null;
};

export function DhatuListItem({ dhatuDetails, searchQuery }: Props) {
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
    <div
      id={itemId}
      className="list-group-item list-group-item-action _bg-surface _bg-surface-hover p-1 position-relative"
    >
      {searchQuery && (
        <Link
          href={`/#${itemId}`}
          className="btn btn-transparent btn-sm position-absolute"
          data-action="locate"
          style={{ top: "5px", left: "5px" }}
          title="Locate this on the list"
          scroll={false}
        >
          <Icon>
            <BsGeoAltFill />
          </Icon>
        </Link>
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
            <div className="m-2" data-slot="gana">
              {hilite(gana)}
            </div>
            <div className="m-2" data-slot="padi">
              {hilite(padi)}
            </div>
            <div className="m-2" data-slot="it">
              {hilite(it)}
            </div>
          </div>

          <hr className="_border-divider d-block d-md-none m-0 w-75" />

          <div className="d-flex justify-content-evenly ms-md-2 w-100">
            <VrittiInfo vrittiName="माधवीयधातुवृत्तिः" vrittiId={madhaviyaId} />
            <VrittiInfo
              vrittiName="क्षीरतरङ्गिणी"
              vrittiId={kshirataranginiId}
            />
            <VrittiInfo vrittiName="धातुप्रदीपः" vrittiId={dhatupradipaId} />
          </div>
        </div>
      </Link>
    </div>
  );
}
