import { getVrittiData } from "../my-app/src/utils/getVrittiData";

type VrittiAccordionItemContentProps = {
  vrittiCode: string;
  vrittiId: string;
};

async function VrittiContent({
  vrittiCode,
  vrittiId,
}: VrittiAccordionItemContentProps) {
  const vrittiData = await getVrittiData(vrittiCode, vrittiId);

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: vrittiData,
      }}
    ></div>
  );
}

export function VrittiAccordionItemContent({
  vrittiCode,
  vrittiId,
}: VrittiAccordionItemContentProps) {
  return (
    <div>
      <VrittiContent vrittiCode={vrittiCode} vrittiId={vrittiId} />
    </div>
  );
}
