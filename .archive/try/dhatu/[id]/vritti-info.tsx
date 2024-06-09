import { ENDPOINTS } from "@/app/endpoints";
import { useEffect } from "react";

const VrittiItem = async ({ code, id }) => {
  const vrittiURL = `${ENDPOINTS.VRITTI}/${code}${id}.html`;

  try {
    const result = await fetch(vrittiURL);
    const content = await result.text();

    console.log(content);
  } catch (error) {
    console.log(error);
  }

  return null;
};

export const VrittiInfo = ({ dhatuDetails }) => {
  const { madhaviyaId, kshirataranginiId, dhatupradipaId } = dhatuDetails;

  return (
    <>
      <VrittiItem id={madhaviyaId} code={"mA"} />
      <VrittiItem id={kshirataranginiId} code={"kRi"} />
      <VrittiItem id={dhatupradipaId} code={"XA"} />
    </>
  );
};
