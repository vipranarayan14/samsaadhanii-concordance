import { scrollToTop } from "../utils/scrollToTop";

const createVrittiInfo = (name, id) =>
  `<div class="m-2">
    <div class="vritti-name mb-1 text-on-surface" style="font-size: 0.9rem">
      ${name}
    </div>
    <div>${id}</div>
  </div>`;

export const createItem = (dhatuDetails) =>
  `<a 
      href="#" 
      data-item-id="${dhatuDetails.id}" 
      class="list-group-item list-group-item-action p-1"
      data-bs-toggle="modal"
      data-bs-target="#dhatu-details-modal"
    >
    <div class="align-items-center d-flex flex-column flex-md-row text-center">
      <div class="p-1 w-100" style="font-size: 1.1rem">
        <span class="fw-bold">
          ${dhatuDetails.muladhatu} (${dhatuDetails.dhatu})
        </span>
        <span>${dhatuDetails.meaning}</span>
      </div>
      
      <div class="d-flex justify-content-between" style="font-size: 1.1rem">
        <div class="m-2">${dhatuDetails.gana}</div>
        <div class="m-2">${dhatuDetails.padi}</div>
        <div class="m-2">${dhatuDetails.it}</div>
      </div>

      <hr class="border-secondary d-block d-md-none m-0 w-75">

      <div class="d-flex justify-content-evenly ms-2 w-100">
        ${createVrittiInfo("माधवीयधातुवृत्तिः", dhatuDetails.madhaviyaId)}
        ${createVrittiInfo("क्षीरतरङ्गिणी", dhatuDetails.kshirataranginiId)}
        ${createVrittiInfo("धातुप्रदीपः", dhatuDetails.dhatupradipaId)}
      </div>
    </div>
  </a>`;

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
