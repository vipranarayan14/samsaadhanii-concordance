const setVritti = (targetEle, vrittiName, content) => {
  const vrittiEle = targetEle.querySelector(`[data-slot="${vrittiName}"]`);

  if (!vrittiEle) return;

  vrittiEle.innerHTML = content;
};

const vrittiCodes = {
  madhaviya: "mA",
  kshiratarangini: "kRi",
  dhatupradipa: "XA",
};

export const loadVrittis = (targetEle, details) => {
  Object.entries(vrittiCodes).forEach(async ([vrittiName, vrittiCode]) => {
    const id = details[`${vrittiName}Id`];

    if (!id || id === "-") return setVritti(targetEle, vrittiName, "N/A");

    const vrittiURL = `${details.VRITTI_ENDPOINT}/${vrittiCode}${id}.html`;

    const result = await fetch(vrittiURL);

    const content = await result.text();

    setVritti(targetEle, vrittiName, content);
  });
};
