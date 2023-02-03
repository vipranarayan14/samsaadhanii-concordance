import { createURL } from "./utils";

const createDhatuModalTitle = (details) =>
  `${details.muladhatu} (${details.dhatu}) ${details.meaning}`;

const createDhatuModalContent = (details, formsURL, graphURL) => {
  const slotData = details;

  const template = document.querySelector("#dhatu-all-details");

  const dhatuModalContent = template.content.cloneNode(true);

  const getSlot = (query) => dhatuModalContent.querySelector(query);

  for (const [slotName, slotValue] of Object.entries(slotData)) {
    const slot = getSlot(`[data-slot="${slotName}"]`);

    if (slot) slot.textContent = slotValue;
  }

  const formsSlot = getSlot('[data-slot="forms"]');
  const formsLinkSlot = getSlot('[data-slot="formsLink"]');

  if (!formsURL) {
    formsSlot.innerHTML = "N/A";
  } else {
    formsLinkSlot.href = formsURL;
  }

  const graphSlot = getSlot('[data-slot="graph"]');
  const graphLinkSlot = getSlot('[data-slot="graphLink"]');
  const graphImgSlot = getSlot('[data-slot="graphImg"]');

  if (!graphURL) {
    graphSlot.innerHTML = "N/A";
  } else {
    graphLinkSlot.href = graphURL;
    graphImgSlot.src = graphURL;
  }

  return dhatuModalContent;
};

export const createDhatuModalData = (details) => {
  const formsURL = createURL(details.FORMS_ENDPOINT, details.formsURL);
  const graphURL = createURL(details.GRAPH_ENDPOINT, details.graphURL);

  return {
    title: createDhatuModalTitle(details),
    content: createDhatuModalContent(details, formsURL, graphURL),
  };
};