import { scrollToTop } from "./scrollToTop";
import { qs } from "./utils";

const createDhatuListItem = (dhatuDetails) => {
  const {
    id,
    muladhatu,
    dhatu,
    madhaviyaId,
    kshirataranginiId,
    dhatupradipaId,
    ...slotData
  } = dhatuDetails;

  const template = qs("#dhatu-list-item");

  const dhatuListItem = template.content.cloneNode(true);

  const getSlot = (slotName) => qs(`[data-slot="${slotName}"]`, dhatuListItem);

  for (const [slotName, slotValue] of Object.entries(slotData)) {
    const slot = getSlot(slotName);

    if (slot) slot.innerHTML = slotValue;
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

  const dhatuSlot = getSlot("dhatu");

  dhatuSlot.innerHTML = `${muladhatu} (${dhatu})`;

  const idSlot = getSlot("item-id");

  idSlot.setAttribute("data-item-id", id);

  return dhatuListItem;
};

const focusItem = (item) => {
  item.scrollIntoView({ block: "center" });

  item.focus({ preventScroll: true });
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

  goToItem(itemId) {
    const index = this.list.findIndex(({ id }) => id === itemId);

    if (index < 0) return;

    this.setContent(0, index);

    this.loadNext();

    const item = qs(`[data-item-id="${itemId}"]`, this.element);

    focusItem(item);
  }

  onIntersect(entries) {
    entries.forEach((entry) => entry.isIntersecting && this.loadNext());
  }
}
