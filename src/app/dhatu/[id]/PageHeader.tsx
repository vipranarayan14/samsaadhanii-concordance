import { DhatuDetails } from "@/utils/getDhatupatha";

type Props = {
  dhatuDetails: DhatuDetails;
};

export function PageHeader({ dhatuDetails }: Props) {
  const { muladhatu, dhatu, meaning } = dhatuDetails;

  return (
    <header>
      <h1 className="fs-4 py-2 my-3 text-center fw-bold">{`${muladhatu} (${dhatu}) ${meaning}`}</h1>
    </header>
  );
}
