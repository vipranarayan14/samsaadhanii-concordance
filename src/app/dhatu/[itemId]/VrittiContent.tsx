import { getVrittiData } from "@/utils/getVrittiData";

type Props = {
  vrittiCode: string;
  vrittiId: string;
};

export async function VrittiContent({ vrittiCode, vrittiId }: Props) {
  if (vrittiId === "-") {
    return <div>The dhatu is not found in this vritti.</div>;
  }

  const vrittiData = await getVrittiData(vrittiCode, vrittiId);

  return (
    <div
      className="_fs-body-bigger"
      dangerouslySetInnerHTML={{
        __html: vrittiData,
      }}
    ></div>
  );
}
