export class Params {
  static #searchField = "q";

  static #makeNewURL(field, value) {
    const newURL = new URL(window.location);

    if (value === "") {
      newURL.searchParams.delete(field);
    } else {
      newURL.searchParams.set(field, value);
    }

    return newURL;
  }

  static #setHistory(newURL, shouldReplaceHistory = false) {
    if (shouldReplaceHistory) {
      window.history.replaceState({}, "", newURL);
    } else {
      window.history.pushState({}, "", newURL);
    }
  }

  static getOptionField(field) {
    const params = new URLSearchParams(window.location.search);

    return params.get(field);
  }

  static setOptionField(field, value) {
    const newURL = this.#makeNewURL(field, value);

    this.#setHistory(newURL);
  }

  static resetOptionFields(fields) {
    const newURL = new URL(window.location);

    for (const field of fields) {
      newURL.searchParams.delete(field);
    }

    this.#setHistory(newURL);
  }

  static getSearchField() {
    const params = new URLSearchParams(window.location.search);

    return params.get(this.#searchField);
  }

  static setSearchField(value) {
    const field = this.#searchField;

    const currURL = new URL(window.location);

    const shouldReplaceHistory = currURL.searchParams.has(field);

    const newURL = this.#makeNewURL(field, value);

    if (!value) {
      this.#setHistory(newURL);
    } else {
      this.#setHistory(newURL, shouldReplaceHistory);
    }
  }

  static resetSearchField() {
    const newURL = this.#makeNewURL(this.#searchField, "");

    this.#setHistory(newURL);
  }
}
