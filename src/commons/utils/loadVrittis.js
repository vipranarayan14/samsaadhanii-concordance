import { da, qs } from "./utils";

const setVritti = (targetEle, vrittiName, content) => {
  const vrittiEle = qs(da("slot", vrittiName), targetEle);

  if (!vrittiEle) return;

  vrittiEle.innerHTML = content;
};

const vrittiCodes = {
  madhaviya: "mA",
  kshiratarangini: "kRi",
  dhatupradipa: "XA",
};

export const loadVrittis = (targetEle, details, Globals) => {
  Object.entries(vrittiCodes).forEach(async ([vrittiName, vrittiCode]) => {
    const id = details[`${vrittiName}Id`];

    if (!id || id === "-") return setVritti(targetEle, vrittiName, "N/A");

    const vrittiURL = `${Globals.ENDPOINTS.VRITTI}/${vrittiCode}${id}.html`;

    const result = await fetch(vrittiURL);

    const content = await result.text();

    setVritti(targetEle, vrittiName, content);
  });
};
