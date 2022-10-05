const listEle = document.querySelector("#app .list");
const filterFormEle = document.querySelector("#app .filter-form");
const sortSelectEle = document.querySelector("#app .sort-select");
const searchInputEle = document.querySelector("#app .search-input");

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
  `<div class="item">
    <div class="dhatu-details">
      <div class="dhatu-container">
        <span class="dhatu">${dhatuDetails.dhatu}</span>
        <span>${dhatuDetails.meaning}</span>
      </div>
      <div>${dhatuDetails.gana}</div>
      <div>${dhatuDetails.it}</div>
      <div>${dhatuDetails.padi}</div>
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
  dhatuList.filter((dhatuDetails) => {
    const { dhatu, meaning, gana, padi, it } = dhatuDetails;
    const detailsStr = [dhatu, meaning, gana, padi, it].join(" ");

    return keywordsSets.some((keywordsSet) =>
      keywordsSet.every((keyword) => detailsStr.includes(keyword))
    );
  });

const getFilterKeywords = (searchStr) => {
  const searchStrFromWx = Sanscript.t(searchStr, "wx", "devanagari");
  const searchStrFromItrans = Sanscript.t(searchStr, "itrans", "devanagari");

  const keywordsSets = [searchStr, searchStrFromWx, searchStrFromItrans].map(
    (str) => str.split(" ").filter((keyword) => !!keyword)
  );

  return keywordsSets;
};

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

let dhatupatha = [];

const list = new List(listEle);

(async () => {
  const result = await fetch("dhatupatha.json");

  const data = await result.json();

  dhatupatha = data;

  list.setData(dhatupatha);
})();

filterFormEle.addEventListener("submit", (e) => e.preventDefault());

sortSelectEle.addEventListener("change", (e) => {
  const sortBy = e.target.value;

  const sortedList = sortDhatupatha(dhatupatha, sortBy);

  list.setData(sortedList);
});

searchInputEle.addEventListener("input", (e) => {
  const searchStr = e.target.value;

  if (!searchStr) return list.setData(dhatupatha);

  const keywords = getFilterKeywords(searchStr);

  const filteredList = filterDhatupatha(dhatupatha, keywords);

  list.setData(filteredList);
});
