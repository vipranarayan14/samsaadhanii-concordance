import Badge from "react-bootstrap/Badge";

type Props = {
  vrittiId: string;
};

export function VrittiBadge({ vrittiId }: Props) {
  const bg = vrittiId !== "-" ? "primary" : "danger";
  const vrittiNum = vrittiId !== "-" ? vrittiId : "·";

  return (
    <Badge bg={bg} className="user-select-all">
      {vrittiNum}
    </Badge>
  );
}
