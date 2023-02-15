export class Loader {
  constructor(element) {
    this.element = element;
  }

  show() {
    this.element.classList.remove("_hidden");
  }

  hide() {
    this.element.classList.add("_hidden");
  }
}
