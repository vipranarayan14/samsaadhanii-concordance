const setVritti = (vrittiName, content) => {
  const vrittiEle = document.querySelector(
    `.dhatu-all-details .${vrittiName}-details .content`
  );

  if (!vrittiEle) return;

  vrittiEle.innerHTML = content;
};

const vrittiCodes = {
  madhaviya: "mA",
  kshiratarangini: "kRi",
  dhatupradipa: "XA",
};

export const loadVrittis = (details) => {
  Object.entries(vrittiCodes).forEach(async ([vrittiName, vrittiCode]) => {
    const id = details[`${vrittiName}Id`];

    if (!id || id === "-") return setVritti(vrittiName, "N/A");

    const vrittiURL = `${details.VRITTI_ENDPOINT}/${vrittiCode}${id}.html`;

    const result = await fetch(vrittiURL);

    const content = await result.text();

    setVritti(vrittiName, content);
  });
};
