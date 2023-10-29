import { VrittiBadge } from "./VrittiBadge";

type Props = {
  vrittiName: string;
  vrittiId: string;
};

export function VrittiInfo({ vrittiName, vrittiId }: Props) {
  return (
    <div className="m-2">
      <div
        className="vritti-name mb-1 text-muted"
        style={{ fontSize: "0.9rem" }}
      >
        {vrittiName}
      </div>
      <VrittiBadge vrittiId={vrittiId} />
    </div>
  );
}
