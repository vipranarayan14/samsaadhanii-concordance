import { VrittiBadge } from "./VrittiBadge";

type Props = {
  vrittiName: string;
  vrittiId: string;
};

export function VrittiInfo({ vrittiName, vrittiId }: Props) {
  return (
    <div className="p-2">
      <div
        className="vritti-name pb-1 text-muted _fs-body-smaller"
      >
        {vrittiName}
      </div>
      <VrittiBadge vrittiId={vrittiId} />
    </div>
  );
}
