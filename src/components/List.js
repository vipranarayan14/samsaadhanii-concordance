import { scrollToTop } from "../utils/scrollToTop";

const createDhatuListItem = (dhatuDetails) => {
  const { id, muladhatu, dhatu, ...slotData } = dhatuDetails;

  const template = document.querySelector("#dhatu-list-item");

  const dhatuListItem = template.content.cloneNode(true);

  const getSlot = (query) => dhatuListItem.querySelector(query);

  for (const [slotName, slotValue] of Object.entries(slotData)) {
    const slot = getSlot(`[data-slot="${slotName}"]`);

    if (slot) slot.innerHTML = slotValue;
  }

  const idSlot = getSlot('[data-slot="item-id"]');

  idSlot.setAttribute("data-item-id", id);

  const dhatuSlot = getSlot('[data-slot="dhatu"]');

  dhatuSlot.innerHTML = `${muladhatu} (${dhatu})`;

  return dhatuListItem;
};

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
    const items = this.list.slice(fromId, toId).map(createDhatuListItem);

    this.element.append(...items);

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
