const loaderEle = document.querySelector("#app .loader");
const listEle = document.querySelector("#app .list");
const filterFormEle = document.querySelector("#app .filter-form");
const sortSelectEle = document.querySelector("#app .sort-select");
const searchInputEle = document.querySelector("#app .search-input");
const modalEle = document.querySelector("#app .modal");

const DHATUPATHA_PATH = "dhatupatha2.json";

const CDN = "https://cdn.jsdelivr.net/gh/samsaadhanii/scl/dhaatupaatha";
const VRITTI_ENDPOINT = `${CDN}/files`;
const GRAPH_ENDPOINT = CDN;
const FORMS_ENDPOINT = "https://sanskrit.uohyd.ac.in";

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
      <span class="dhatu-name">${dhatuDetails.dhatu}</span>
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

let dhatupathaSortedByDhatu, dhatupathaSortedByGana, dhatupathaSortedByArtha;

const sortByArtha = (dhatuList) =>
  [...dhatuList].sort((dhatuDetailsA, dhatuDetailsB) =>
    new Intl.Collator().compare(dhatuDetailsA.meaning, dhatuDetailsB.meaning)
  );

const sortByGana = (dhatuList) =>
  [...dhatuList].sort(
    (dhatuDetailsA, dhatuDetailsB) =>
      ganas[dhatuDetailsA.gana] - ganas[dhatuDetailsB.gana]
  );

const sortByDhatu = (dhatuList) =>
  [...dhatuList].sort((dhatuDetailsA, dhatuDetailsB) =>
    new Intl.Collator().compare(dhatuDetailsA.dhatu, dhatuDetailsB.dhatu)
  );

const sortDhatupatha = (dhatuList, sortBy) => {
  if (sortBy === "dhatu") {
    if (dhatupathaSortedByDhatu) return dhatupathaSortedByDhatu;

    dhatupathaSortedByDhatu = sortByDhatu(dhatuList);

    return dhatupathaSortedByDhatu;
  }

  if (sortBy === "gana") {
    if (dhatupathaSortedByGana) return dhatupathaSortedByGana;

    dhatupathaSortedByGana = sortByGana(dhatuList);

    return dhatupathaSortedByGana;
  }

  if (sortBy === "artha") {
    if (dhatupathaSortedByArtha) return dhatupathaSortedByArtha;

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

const getKeywords = (query) => {
  const queryFromWx = Sanscript.t(query, "wx", "devanagari");
  const queryFromItrans = Sanscript.t(query, "itrans", "devanagari");

  const keywordsSets = [query, queryFromWx, queryFromItrans].map((str) =>
    str
      .split(" ")
      .filter((keyword) => !!keyword)
      .map(removeLastVirama)
  );

  console.log(keywordsSets);

  return keywordsSets;
};

const makeId = (dhatuDetails, index) => {
  return `${dhatuDetails.dhatuId}_${index}`;
};

const cleanDhatu = (dhatu) => dhatu.replace(/[॒॑]/g, "");

const createTags = (dhatuDetails) => {
  const { dhatu, meaning, gana, padi, it } = dhatuDetails;
  const tags = [cleanDhatu(dhatu), meaning, gana, padi, it].join(" ");

  return tags;
};

const createURL = (endpoint, path) => (path ? `${endpoint}${path}` : "/#");

const addProperties = (dhatuList) =>
  dhatuList.map((dhatuDetails, id) => ({
    id: makeId(dhatuDetails, id),
    ...dhatuDetails,
    formsURL: createURL(FORMS_ENDPOINT, dhatuDetails.formsURL),
    graphURL: createURL(GRAPH_ENDPOINT, dhatuDetails.graphURL),
    tags: createTags(dhatuDetails),
  }));

const getDhatuDetails = (id) =>
  dhatupatha.find((dhatuDetails) => dhatuDetails.id === id);

const createDhatuModalTitle = (dhatuDetails) =>
  `${dhatuDetails.dhatu} ${dhatuDetails.meaning}`;

const createDhatuModalContent = (details) => `
<div class="dhatu-all-details">
  <section class="basic-info">
    <div><span class="name">धातुः</span><span>${details.dhatu}</span></div>
    <div><span class="name">अर्थः</span><span>${details.meaning}</span></div>
    <div><span class="name">गणः</span><span>${details.gana}</span></div>
    <div><span class="name">पदि</span><span>${details.padi}</span></div>
    <div><span class="name">इट्</span><span>${details.it}</span></div>
  </section>

  <section class="vrittis">
    <h3>वृत्तयः</h3>
    <div>
      <details>
        <summary>माधवीयधातुवृत्तिः (${details.madhaviyaId})</summary>
        <span class="madhaviya-info">Loading...</span>
      </details>
      <details>
        <summary>क्षीरतरङ्गिणी (${details.kshirataranginiId})</summary>
        <span class="kshiratarangini-info">Loading...</span>
      </details>
      <details>
        <summary>धातुप्रदीपः (${details.dhatupradipaId})</summary>
        <span class="dhatupradipa-info">Loading...</span>
      </details>
    </div>
  </section>

  <section class="chart">
    <h3>रूपाणि</h3>
    <div class="content">
      <a class="link" href="${details.formsURL}" target="_blank">Show forms</a>
    </div>
  </section>

  <section class="chart">
    <h3>Chart</h3>
    <div class="content">
      <a class="link" href="${details.graphURL}" target="_blank">Show full size</a>
        <div class="image">
          <img src="${details.graphURL}" alt="Chart" loading="lazy" />
        </div>
    </div>
  </section>
</div>`;

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

const setVritti = (vrittiName, content) => {
  const vrittiEle = document.querySelector(
    `.dhatu-all-details .${vrittiName}-info`
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
