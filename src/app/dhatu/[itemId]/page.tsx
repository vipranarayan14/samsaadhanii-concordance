import { Metadata } from "next";

import FixedWidthContainer from "@/commons/components/FixedWidthContainer";
import { getDhatupathaLocal } from "@/utils/getDhatupathaLocal";
import { createDhatuItemId, getIdFromItemId } from "@/utils/itemId";

import { PageHeader } from "./PageHeader";
import { DhatuDetailsTable } from "./DetailsTable";
import { VrittiAccordionsGroup } from "./VrittiAccordionsGroup";
import { FormsAccordionsGroup } from "./FormsAccordionsGroup";
import { SectionHeading } from "./SectionHeading";
import { Graph } from "./Graph";

type Props = {
  params: { itemId?: string };
};

const dhatupatha = await getDhatupathaLocal();

export function generateMetadata({ params }: Props): Metadata {
  const { itemId } = params;

  const id = getIdFromItemId(itemId);

  const dhatuDetails = dhatupatha.find(
    (dhatuDetails) => dhatuDetails.id === id
  );

  if (!dhatuDetails) {
    return {
      title: "Page not found",
    };
  }

  const { muladhatu, dhatu, meaning } = dhatuDetails;

  return {
    title: `${muladhatu} (${dhatu}) ${meaning}`,
  };
}

export async function generateStaticParams() {
  const staticParams = dhatupatha.map((dhatuDetails) => ({
    itemId: createDhatuItemId(dhatuDetails),
  }));

  return staticParams;
}

export default function Page({ params }: Props) {
  const { itemId } = params;

  const id = getIdFromItemId(itemId);

  const dhatuDetails = dhatupatha.find(
    (dhatuDetails) => dhatuDetails.id === id
  );

  if (!dhatuDetails) {
    return <p className="text-center p-2">Page not found.</p>;
  }

  return (
    <div>
      <PageHeader dhatuDetails={dhatuDetails} />

      <FixedWidthContainer as={"main"} width={900}>
        <DhatuDetailsTable dhatuDetails={dhatuDetails} />

        <section>
          <SectionHeading>वृत्तयः</SectionHeading>
          <div>
            <VrittiAccordionsGroup dhatuDetails={dhatuDetails} />
          </div>
        </section>

        <section>
          <SectionHeading>तिङन्त-रूपाणि</SectionHeading>
          <div>
            <FormsAccordionsGroup dhatuDetails={dhatuDetails} />
          </div>
        </section>

        {dhatuDetails.graphURL && (
          <section>
            <SectionHeading>वृत्तिषु पाठितानि कानिचन कृदन्त-प्रातिपदिकानि</SectionHeading>

            <Graph graphURL={dhatuDetails.graphURL} />
          </section>
        )}
      </FixedWidthContainer>
    </div>
  );
}
