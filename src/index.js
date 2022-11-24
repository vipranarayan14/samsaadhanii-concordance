import "./bootstrap";

import { filterList } from "./utils/filterList";
import { hiliteResults } from "./utils/hiliteResults";
import { sortDhatupatha } from "./utils/sortDhatupatha";
import { getKeywords } from "./utils/getKeywords";
import { addProperties } from "./utils/addProperties";
import { Loader } from "./components/Loader";
import { List } from "./components/List";
import { Modal } from "./components/Modal";
import { scrollToTop } from "./utils/scrollToTop";
import { getDhatuDetails } from "./utils/getDhatuDetails";
import { loadVrittis } from "./utils/loadVrittis";
import { createDhatuModalData } from "./utils/createDhatuModalData";
import { loadDhatupatha } from "./utils/loadDhatupatha";
import { setupThemeTester } from "./utils/setThemeTester";

const Globals = { CACHE: {} };

const loaderEle = document.querySelector("#app .loader");
const listEle = document.querySelector("#app #dhatu-list");
const filterFormEle = document.querySelector("#app #filter-form");
const sortSelectEle = document.querySelector("#app #sort-select");
const searchInputEle = document.querySelector("#app #search-input");
const modalEle = document.querySelector("#app .modal");
const scrollToTopEle = document.querySelector(".scroll-to-top");

const DHATUPATHA_URL = require("url:./dhatupatha.json");
const CONCORDANCE_ENDPOINT =
  "https://cdn.jsdelivr.net/gh/samsaadhanii/scl/dhaatupaatha";
const VRITTI_ENDPOINT = `${CONCORDANCE_ENDPOINT}/files`;
const GRAPH_ENDPOINT = `${CONCORDANCE_ENDPOINT}/graphs`;
const FORMS_ENDPOINT =
  "https://sanskrit.uohyd.ac.in//cgi-bin/scl/skt_gen/verb/verb_gen_web.cgi";

const list = new List(listEle);
const loader = new Loader(loaderEle);
const modal = new Modal(modalEle);

const handleFilterFormEleClick = (e) => e.preventDefault();

const handleSortSelectEleChange = (e) => {
  const sortBy = e.target.value;

  Globals.listData = sortDhatupatha(Globals.CACHE.DHATUPATHA, sortBy);

  list.setData(Globals.listData);
};

const handleSearchInputEleInput = (e) => {
  const query = e.target.value;

  if (!query) return list.setData(Globals.listData);

  const keywords = getKeywords(query);

  const results = filterList(Globals.listData, keywords);

  const hilitedResults = hiliteResults(results, keywords);

  list.setData(hilitedResults);
};

const handleListEleClick = (e) => {
  const item = e.target.closest("[data-item-id]");

  if (!listEle.contains(item)) return;

  e.preventDefault();

  const { itemId } = item.dataset;

  const dhatuDetails = getDhatuDetails(Globals.listData, itemId);

  const modalData = createDhatuModalData({
    ...dhatuDetails,
    FORMS_ENDPOINT,
    GRAPH_ENDPOINT,
  });

  modal.setData(modalData);

  modal.show();

  loadVrittis({ ...dhatuDetails, VRITTI_ENDPOINT });
};

const handleScrollToTopClick = (e) => scrollToTop();

const initEventListeners = () => {
  filterFormEle.addEventListener("submit", handleFilterFormEleClick);
  sortSelectEle.addEventListener("change", handleSortSelectEleChange);
  searchInputEle.addEventListener("input", handleSearchInputEleInput);
  listEle.addEventListener("click", handleListEleClick);
  scrollToTopEle.addEventListener("click", handleScrollToTopClick);
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
