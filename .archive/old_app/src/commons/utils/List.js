import { scrollToTop } from "./scrollToTop";
import { da, qs } from "./utils";

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

  const template = qs("#template-dhatu-list-item");

  const dhatuListItem = template.content.cloneNode(true);

  const getSlot = (slotName) => qs(da("slot", slotName), dhatuListItem);

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
  #itemsToLoad = 20;
  #lastLoadedId = 0;
  #data = [];
  #observer = new IntersectionObserver((entries) => this.#onIntersect(entries));

  constructor(element) {
    this.element = element;
  }

  goToItem(itemId) {
    const index = this.#data.findIndex(({ id }) => id === itemId);

    if (index < 0) return;

    this.#clear();
    this.#append(0, index);
    this.#loadNext();

    const item = qs(da("item-id", itemId), this.element);

    focusItem(item);
  }

  setData(data) {
    this.#data = data;
    this.#lastLoadedId = 0;
    this.#clear();
    this.#loadNext();

    scrollToTop();
  }

  #append(fromId, toId) {
    const items = this.#data.slice(fromId, toId).map(createDhatuListItem);

    this.element.append(...items);

    this.#lastLoadedId = toId;
  }

  #clear() {
    this.element.innerHTML = "";
  }

  #stopObserver() {
    if (this.element.lastElementChild) {
      this.#observer.unobserve(this.element.lastElementChild);
    }
  }

  #startObserver() {
    this.#observer.observe(this.element.lastElementChild);
  }

  #onIntersect(entries) {
    entries.forEach((entry) => entry.isIntersecting && this.#loadNext());
  }

  #loadNext() {
    this.#stopObserver();

    if (this.#lastLoadedId > this.#data.length - 1) return;

    this.#append(this.#lastLoadedId, this.#lastLoadedId + this.#itemsToLoad);

    this.#startObserver();
  }
}
