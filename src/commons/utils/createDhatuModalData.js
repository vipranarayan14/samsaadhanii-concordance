import { da, qs } from "./utils";

const createURL = (endpoint, path) => (path ? `${endpoint}${path}` : "");

const createDhatuModalTitle = (details) =>
  `${details.muladhatu} (${details.dhatu}) ${details.meaning}`;

const createDhatuModalContent = (details, graphURL) => {
  const { madhaviyaId, kshirataranginiId, dhatupradipaId, ...slotData } =
    details;

  const template = qs("#template-dhatu-all-details");

  const dhatuModalContent = template.content.cloneNode(true);

  const getSlot = (slotName) => qs(da("slot", slotName), dhatuModalContent);

  for (const [slotName, slotValue] of Object.entries(slotData)) {
    const slot = getSlot(slotName);

    if (slot) slot.textContent = slotValue;
  }

  const vrittiDetails = { madhaviyaId, kshirataranginiId, dhatupradipaId };

  for (const [slotName, vrittiNum] of Object.entries(vrittiDetails)) {
    const vrittiSlot = getSlot(slotName);

    if (vrittiNum !== "-") {
      vrittiSlot.textContent = vrittiNum;
      vrittiSlot.classList.add("text-bg-primary");
    } else {
      vrittiSlot.textContent = "·";
      vrittiSlot.classList.add("text-bg-danger");
    }
  }

  const graphSlot = getSlot("graph");
  const graphLinkSlot = getSlot("graphLink");
  const graphImgSlot = getSlot("graphImg");

  if (!graphURL) {
    graphSlot.innerHTML = "N/A";
  } else {
    graphLinkSlot.href = graphURL;
    graphImgSlot.src = graphURL;
  }

  return dhatuModalContent;
};

export const createDhatuModalData = (details, Globals) => {
  const graphURL = createURL(Globals.ENDPOINTS.GRAPH, details.graphURL);

  return {
    title: createDhatuModalTitle(details),
    content: createDhatuModalContent(details, graphURL),
  };
};
