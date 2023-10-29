import { getDhatupatha } from "@/app/_utils/getDhatupatha";
import { VrittiInfo } from "./vritti-info";

const dhatupatha = await getDhatupatha();

const D = ({ params }) => {
  const { id } = params;

  const dhatuDetails = dhatupatha.find(
    (dhatuDetails) => dhatuDetails.id === Number(id)
  );

  return <VrittiInfo dhatuDetails={dhatuDetails} />;
};

export default D;
