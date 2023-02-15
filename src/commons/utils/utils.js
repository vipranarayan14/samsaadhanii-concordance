export const removeLastVirama = (keyword) => keyword.replace(/्$/, "");

export const svarasRegex = "[॒॑]";

export const removeSvaras = (dhatu) =>
  dhatu.replace(new RegExp(svarasRegex, "g"), "");

export const createURL = (endpoint, path) => (path ? `${endpoint}${path}` : "");

export const show = (element) => element.classList.remove("_hidden");

export const hide = (element) => element.classList.add("_hidden");


export const qs = (selector, parent = document) =>
  parent.querySelector(selector);

export const qsa = (selector, parent = document) =>
  parent.querySelectorAll(selector);
