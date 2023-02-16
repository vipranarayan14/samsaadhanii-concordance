import { hide, show } from "./utils";

export class Loader {
  constructor(element) {
    this.element = element;
  }

  show() {
    show(this.element);
  }

  hide() {
    hide(this.element);
  }
}
