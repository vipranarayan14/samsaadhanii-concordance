import "./bootstrap";

import { filterList } from "./utils/filterList";
import { hiliteResults } from "./utils/hiliteResults";
import { sortDhatupatha } from "./utils/sortDhatupatha";
import { getQueryDetails } from "./utils/getQueryDetails";
import { addProperties } from "./utils/addProperties";
import { Loader } from "./components/Loader";
import { List } from "./components/List";
import { scrollToTop } from "./utils/scrollToTop";
import { getDhatuDetails } from "./utils/getDhatuDetails";
import { loadVrittis } from "./utils/loadVrittis";
import { createDhatuModalData } from "./utils/createDhatuModalData";
import { loadDhatupatha } from "./utils/loadDhatupatha";
import { setupThemeTester } from "./utils/setThemeTester";

const Globals = { CACHE: {} };

const loaderEle = document.querySelector("#app #loader");
const listEle = document.querySelector("#app #dhatu-list");
const filterFormEle = document.querySelector("#app #filter-form");
const sortSelectEle = document.querySelector("#app #sort-select");
const searchInputEle = document.querySelector("#app #search-input");
const clearSearchBtnEle = document.querySelector("#app #clear-search-btn");
const dhatuDetailsModalEle = document.querySelector("#dhatu-details-modal");
const scrollToTopEle = document.querySelector("#app #scroll-to-top");

const DHATUPATHA_URL = require("url:./dhatupatha.json");
const CONCORDANCE_ENDPOINT =
  "https://cdn.jsdelivr.net/gh/samsaadhanii/scl/dhaatupaatha";
const VRITTI_ENDPOINT = `${CONCORDANCE_ENDPOINT}/files`;
const GRAPH_ENDPOINT = `${CONCORDANCE_ENDPOINT}/graphs`;
const FORMS_ENDPOINT =
  "https://sanskrit.uohyd.ac.in//cgi-bin/scl/skt_gen/verb/verb_gen_web.cgi";

const list = new List(listEle);
const loader = new Loader(loaderEle);

const resetList = () => list.setData(Globals.listData);

const handleFilterFormEleSubmit = (e) => e.preventDefault();

const handleSortSelectEleChange = (e) => {
  const sortBy = e.target.value;

  Globals.listData = sortDhatupatha(Globals.CACHE.DHATUPATHA, sortBy);

  list.setData(Globals.listData);
};

const handleSearchInputEleInput = (e) => {
  const query = e.target.value;

  if (!query) return resetList();

  const queryDetails = getQueryDetails(query);

  const results = filterList(Globals.listData, queryDetails);

  const hilitedResults = hiliteResults(results, queryDetails);

  list.setData(hilitedResults);
};

const handleModalShow = (e) => {
  const item = e.relatedTarget;

  const { itemId } = item.dataset;

  const dhatuDetails = getDhatuDetails(Globals.listData, itemId);

  const modalData = createDhatuModalData({
    ...dhatuDetails,
    FORMS_ENDPOINT,
    GRAPH_ENDPOINT,
  });

  const modal = e.target;
  const modalTitle = modal.querySelector(".modal-title");
  const modalBody = modal.querySelector(".modal-body");

  modalTitle.textContent = modalData.title;
  modalBody.replaceChildren(modalData.content);

  loadVrittis(modal, { ...dhatuDetails, VRITTI_ENDPOINT });
};

const handleClearSearchBtnEleClick = (e) => {
  searchInputEle.value = "";
  searchInputEle.focus();

  resetList();
};

const handleScrollToTopClick = (e) => scrollToTop();

const initEventListeners = () => {
  filterFormEle.addEventListener("submit", handleFilterFormEleSubmit);
  sortSelectEle.addEventListener("change", handleSortSelectEleChange);
  searchInputEle.addEventListener("input", handleSearchInputEleInput);
  clearSearchBtnEle.addEventListener("click", handleClearSearchBtnEleClick);
  scrollToTopEle.addEventListener("click", handleScrollToTopClick);
  dhatuDetailsModalEle.addEventListener("show.bs.modal", handleModalShow);
};

loader.show();

loadDhatupatha(DHATUPATHA_URL).then((data) => {
  Globals.CACHE.DHATUPATHA = addProperties(data);

  const listData = Globals.CACHE.DHATUPATHA;

  list.setData(listData);

  Globals.listData = listData;

  initEventListeners();

  loader.hide();
});

// TEMP: For theme testing
setupThemeTester();
