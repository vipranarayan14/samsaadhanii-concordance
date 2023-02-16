export const svarasRegex = "[॒॑]";

const hideClass = "_hidden";

export const qs = (selector, parent = document) =>
  parent.querySelector(selector);

export const qsa = (selector, parent = document) =>
  parent.querySelectorAll(selector);

// Make data-attribute query
export const da = (name, value) =>
  value ? `[data-${name}="${value}"]` : `[data-${name}]`;

export const show = (element) => element.classList.remove(hideClass);

export const hide = (element) => element.classList.add(hideClass);

export const toggle = (element, condition) =>
  element.classList.toggle(hideClass, condition);

export const removeLastVirama = (keyword) => keyword.replace(/्$/, "");

export const removeSvaras = (dhatu) =>
  dhatu.replace(new RegExp(svarasRegex, "g"), "");
