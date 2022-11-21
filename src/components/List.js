import { scrollToTop } from "../utils/scrollToTop";

export const createItem = (dhatuDetails) =>
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

export class List {
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
