import { createURL } from "./utils";

const createDhatuModalTitle = (details) =>
  `${details.muladhatu} (${details.dhatu}) ${details.meaning}`;

const createDhatuModalContent = (details, formsURL, graphURL) => {
  const basicInfoSection = `
  <section class="basic-info">
    <div><span class="name">मूलधातुः</span><span>${details.muladhatu}</span></div>
    <div><span class="name">धातुः</span><span>${details.dhatu}</span></div>
    <div><span class="name">अर्थः</span><span>${details.meaning}</span></div>
    <div><span class="name">गणः</span><span>${details.gana}</span></div>
    <div><span class="name">पदि</span><span>${details.padi}</span></div>
    <div><span class="name">इट्</span><span>${details.it}</span></div>
  </section>`;

  const vrittisSection = `
  <section class="vrittis">
    <h3>वृत्तयः</h3>
    <div>
      <details class="madhaviya-details">
        <summary>माधवीयधातुवृत्तिः (${details.madhaviyaId})</summary>
        <div class="content">Loading...</div>
      </details>
      <details class="kshiratarangini-details">
        <summary>क्षीरतरङ्गिणी (${details.kshirataranginiId})</summary>
        <div class="content">Loading...</div>
      </details>
      <details class="dhatupradipa-details">
        <summary>धातुप्रदीपः (${details.dhatupradipaId})</summary>
        <div class="content">Loading...</div>
      </details>
    </div>
  </section>`;

  const formsContent = !formsURL
    ? "N/A"
    : `<a class="link" href="${formsURL}" target="_blank">Show forms</a>`;

  const formsSection = `
  <section class="forms">
    <h3>रूपाणि</h3>
    <div class="content">
      ${formsContent}
    </div>
  </section>`;

  const graphContent = !graphURL
    ? "N/A"
    : `
    <a class="link" href="${graphURL}" target="_blank">Show full size</a>
    <div class="image">
      <img src="${graphURL}" alt="Graph" loading="lazy" />
    </div>`;

  const graphSection = `
  <section class="graph">
    <h3>Graph</h3>
    <div class="content">
      ${graphContent}
    </div>
  </section>`;

  const modalContent = `
  <div class="dhatu-all-details">
    ${basicInfoSection}
    ${vrittisSection}
    ${formsSection}
    ${graphSection}
  </div>`;

  return modalContent;
};

export const createDhatuModalData = (details) => {
  const formsURL = createURL(details.FORMS_ENDPOINT, details.formsURL);
  const graphURL = createURL(details.GRAPH_ENDPOINT, details.graphURL);

  return {
    title: createDhatuModalTitle(details),
    content: createDhatuModalContent(details, formsURL, graphURL),
  };
};
