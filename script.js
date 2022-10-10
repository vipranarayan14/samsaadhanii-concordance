const loaderEle = document.querySelector("#app .loader");
const listEle = document.querySelector("#app .list");
const filterFormEle = document.querySelector("#app .filter-form");
const sortSelectEle = document.querySelector("#app .sort-select");
const searchInputEle = document.querySelector("#app .search-input");
const modalEle = document.querySelector("#app .modal");
const scrollToTopEle = document.querySelector(".scroll-to-top");

const DHATUPATHA_PATH = "dhatupatha.json";

const DHATUPATHA_ENDPOINT =
  "https://cdn.jsdelivr.net/gh/samsaadhanii/scl/dhaatupaatha";
const VRITTI_ENDPOINT = `${DHATUPATHA_ENDPOINT}/files`;
const GRAPH_ENDPOINT = `${DHATUPATHA_ENDPOINT}/graphs`;
const FORMS_ENDPOINT =
  "https://sanskrit.uohyd.ac.in//cgi-bin/scl/skt_gen/verb/verb_gen_web.cgi";

const ganas = {
  भ्वादिः: 1,
  अदादिः: 2,
  जुहोत्यादिः: 3,
  दिवादिः: 4,
  स्वादिः: 5,
  तुदादिः: 6,
  रुधादिः: 7,
  तनादिः: 8,
  क्र्यादिः: 9,
  चुरादिः: 10,
};

const createItem = (dhatuDetails) =>
  `<div class="item" data-id="${dhatuDetails.id}">
    <div class="dhatu">
      <span class="dhatu-name">
      ${dhatuDetails.muladhatu} (${dhatuDetails.dhatu})
      </span>
      <span>${dhatuDetails.meaning}</span>
    </div>
    <div class="dhatu-details">
      <div>${dhatuDetails.gana}</div>
      <div>${dhatuDetails.padi}</div>
      <div>${dhatuDetails.it}</div>
    </div>
    <div class="vritti-details">
      <div>
        <div class="vritti-name">माधवीयधातुवृत्तिः</div>
        <div>${dhatuDetails.madhaviyaId}</div>
      </div>
      <div>
        <div class="vritti-name">क्षीरतरङ्गिणी</div>
        <div>${dhatuDetails.kshirataranginiId}</div>
      </div>
      <div>
        <div class="vritti-name">धातुप्रदीपः</div>
        <div>${dhatuDetails.dhatupradipaId}</div>
      </div>
    </div>
   </div>`;

const collator = new Intl.Collator();

const sortByArtha = (dhatuList) =>
  [...dhatuList].sort((dhatuDetailsA, dhatuDetailsB) =>
    collator.compare(dhatuDetailsA.meaning, dhatuDetailsB.meaning)
  );

const sortByGana = (dhatuList) =>
  [...dhatuList].sort(
    (dhatuDetailsA, dhatuDetailsB) =>
      ganas[dhatuDetailsA.gana] - ganas[dhatuDetailsB.gana]
  );

const sortByDhatu = (dhatuList) =>
  [...dhatuList].sort((dhatuDetailsA, dhatuDetailsB) =>
    collator.compare(dhatuDetailsA.dhatu, dhatuDetailsB.dhatu)
  );

const sortDhatupatha = (dhatuList, sortBy) => {
  if (sortBy === "dhatu") {
    dhatupathaSortedByDhatu = sortByDhatu(dhatuList);

    return dhatupathaSortedByDhatu;
  }

  if (sortBy === "gana") {
    dhatupathaSortedByGana = sortByGana(dhatuList);

    return dhatupathaSortedByGana;
  }

  if (sortBy === "artha") {
    dhatupathaSortedByArtha = sortByArtha(dhatuList);

    return dhatupathaSortedByArtha;
  }

  return dhatuList;
};

const filterDhatupatha = (dhatuList, keywordsSets) =>
  dhatuList.filter(({ tags }) =>
    keywordsSets.some((keywordsSet) =>
      keywordsSet.every((keyword) => tags.includes(keyword))
    )
  );

const removeLastVirama = (keyword) => keyword.replace(/्$/, "");

const removeSvaras = (dhatu) => dhatu.replace(/[॒॑]/g, "");

const getKeywords = (query) => {
  const simplifiedQuery = removeSvaras(query);
  const queryFromWx = Sanscript.t(simplifiedQuery, "wx", "devanagari");
  const queryFromItrans = Sanscript.t(simplifiedQuery, "itrans", "devanagari");

  const keywordsSets = [simplifiedQuery, queryFromWx, queryFromItrans].map(
    (str) =>
      str
        .split(" ")
        .filter((keyword) => !!keyword)
        .map(removeLastVirama)
  );

  return keywordsSets;
};

const makeId = (dhatuDetails, index) => {
  return `${dhatuDetails.dhatuId}_${index}`;
};

const createTags = (details) => {
  const simplifiedMuladhatu = removeSvaras(details.muladhatu);

  const tags = [
    simplifiedMuladhatu,
    details.dhatu,
    details.meaning,
    details.gana,
    details.padi,
    details.it,
    `m${details.madhaviyaId}`,
    `k${details.kshirataranginiId}`,
    `d${details.dhatupradipaId}`,
  ].join(" ");

  return tags;
};

const createURL = (endpoint, path) => (path ? `${endpoint}${path}` : "");

const addProperties = (dhatuList) =>
  dhatuList.map((dhatuDetails, id) => ({
    id: makeId(dhatuDetails, id),
    ...dhatuDetails,
    tags: createTags(dhatuDetails),
  }));

const getDhatuDetails = (id) =>
  dhatupatha.find((dhatuDetails) => dhatuDetails.id === id);

const createDhatuModalTitle = (dhatuDetails) =>
  `${dhatuDetails.muladhatu} (${dhatuDetails.dhatu}) ${dhatuDetails.meaning}`;

const createDhatuModalContent = (details) => {
  const formsURL = createURL(FORMS_ENDPOINT, details.formsURL);
  const graphURL = createURL(GRAPH_ENDPOINT, details.graphURL);

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

const loadVrittis = (dhatuDetails) => {
  Object.entries(vrittiCodes).forEach(async ([vrittiName, vrittiCode]) => {
    const id = dhatuDetails[`${vrittiName}Id`];

    if (!id || id === "-") return setVritti(vrittiName, "N/A");

    const vrittiURL = `${VRITTI_ENDPOINT}/${vrittiCode}${id}.html`;

    const result = await fetch(vrittiURL);

    const content = await result.text();

    setVritti(vrittiName, content);
  });
};

const showDhatuDetails = (dhatuDetails) => {
  modal.setTitle(createDhatuModalTitle(dhatuDetails));
  modal.setContent(createDhatuModalContent(dhatuDetails));

  modal.show();

  loadVrittis(dhatuDetails);
};

const scrollToTop = () =>
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

class List {
  constructor(element) {
    this.element = element;
    this.itemsToLoad = 20;

    this.list = [];
    this.lastLoadedId = 0;

    this.observer = new IntersectionObserver((entries) =>
      this.onIntersect(entries)
    );
  }

  setData(list) {
    this.list = list;
    this.lastLoadedId = 0;
    this.clearContent();
    this.loadNext();

    scrollToTop();
  }

  setContent(fromId, toId) {
    const content = this.list.slice(fromId, toId).map(createItem).join("");

    this.element.insertAdjacentHTML("beforeend", content);

    this.lastLoadedId = toId;
  }

  clearContent() {
    this.element.innerHTML = "";
  }

  stopObserver() {
    if (this.element.lastElementChild) {
      this.observer.unobserve(this.element.lastElementChild);
    }
  }

  startObserver() {
    this.observer.observe(this.element.lastElementChild);
  }

  loadNext() {
    this.stopObserver();

    if (this.lastLoadedId > this.list.length - 1) return;

    this.setContent(this.lastLoadedId, this.lastLoadedId + this.itemsToLoad);

    this.startObserver();
  }

  onIntersect(entries) {
    entries.forEach((entry) => entry.isIntersecting && this.loadNext());
  }
}

class Loader {
  constructor(element) {
    this.element = element;
  }

  show() {
    this.element.classList.remove("hidden");
  }

  hide() {
    this.element.classList.add("hidden");
  }
}

class Modal {
  constructor(element) {
    this.element = element;
    this.closeBtn = element.querySelector(".close-btn");
    this.titleEle = element.querySelector(".title");
    this.contentEle = element.querySelector(".content");

    this.closeBtn.addEventListener("click", () => this.hide());
  }

  setTitle(html) {
    this.titleEle.innerHTML = html;
  }

  setContent(html) {
    this.contentEle.innerHTML = html;
  }

  reset() {
    this.titleEle.innerHTML = "";
    this.contentEle.innerHTML = "";
  }

  show() {
    this.element.classList.remove("hidden");
    document.body.classList.add("modal-open");
  }

  hide() {
    this.element.classList.add("hidden");
    document.body.classList.remove("modal-open");
    // this.reset();
  }
}

let dhatupatha = [];

const list = new List(listEle);
const loader = new Loader(loaderEle);
const modal = new Modal(modalEle);

(async () => {
  loader.show();

  const result = await fetch(DHATUPATHA_PATH);

  const data = await result.json();

  dhatupatha = addProperties(data);

  list.setData(dhatupatha);

  loader.hide();
})();

filterFormEle.addEventListener("submit", (e) => e.preventDefault());

sortSelectEle.addEventListener("change", (e) => {
  const sortBy = e.target.value;

  const sortedList = sortDhatupatha(dhatupatha, sortBy);

  list.setData(sortedList);
});

searchInputEle.addEventListener("input", (e) => {
  const query = e.target.value;

  if (!query) return list.setData(dhatupatha);

  const keywords = getKeywords(query);

  const filteredList = filterDhatupatha(dhatupatha, keywords);

  list.setData(filteredList);
});

listEle.addEventListener("click", (e) => {
  const item = e.target.closest(".item");

  if (!listEle.contains(item)) return;

  const { id } = item.dataset;

  const dhatuDetails = getDhatuDetails(id);

  showDhatuDetails(dhatuDetails);
});

scrollToTopEle.addEventListener("click", scrollToTop);

// TEMP: Theme testing

const searchParams = new URLSearchParams(document.location.search);

const themeParam = searchParams.get("theme");

if (themeParam) listEle.classList.add(themeParam);
