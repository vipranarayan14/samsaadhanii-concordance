export class Modal {
  constructor(element) {
    this.element = element;
    this.closeBtn = element.querySelector(".close-btn");
    this.titleEle = element.querySelector(".title");
    this.contentEle = element.querySelector(".content");

    this.closeBtn.addEventListener("click", () => this.hide());
    this.element.addEventListener("click", (e) => this.handleOverlayClick(e));
  }

  handleOverlayClick(e) {
    if (e.target !== e.currentTarget) return;

    this.hide();
  }

  setTitle(html) {
    this.titleEle.innerHTML = html;
  }

  setContent(html) {
    this.contentEle.innerHTML = html;
  }

  setData(data) {
    this.setTitle(data.title);
    this.setContent(data.content);
  }

  reset() {
    this.setTitle("");
    this.setContent("");
  }

  show() {
    this.element.classList.remove("hidden");
    document.body.classList.add("modal-open");
  }

  hide() {
    this.element.classList.add("hidden");
    document.body.classList.remove("modal-open");

    this.reset();
  }
}
