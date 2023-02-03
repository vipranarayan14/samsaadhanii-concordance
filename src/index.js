import "./commons/commons";

import { addProperties } from "./commons/utils/addProperties";
import { Loader } from "./commons/utils/Loader";
import { List } from "./commons/utils/List";
import { scrollToTop } from "./commons/utils/scrollToTop";
import { getDhatuDetails } from "./commons/utils/getDhatuDetails";
import { loadVrittis } from "./commons/utils/loadVrittis";
import { createDhatuModalData } from "./commons/utils/createDhatuModalData";
import { loadDhatupatha } from "./commons/utils/loadDhatupatha";
import { setupThemeTester } from "./commons/utils/setThemeTester";
import { getFilterQuery } from "./commons/utils/getFilterQuery";
import { searchData } from "./commons/utils/searchData";
import { hiliteMatches } from "./commons/utils/hiliteMatches";
import { sortData } from "./commons/utils/sortData";
import { getSearchQuery } from "./commons/utils/getSearchQuery";
import { filterData } from "./commons/utils/filterData";
import { getSortQuery } from "./commons/utils/getSortQuery";

const Globals = { CACHE: {} };

const loaderEle = document.querySelector("#app #loader");
const listEle = document.querySelector("#app #dhatu-list");
const searchFormEle = document.querySelector("#app #search-form");
const sortSelectEle = document.querySelector("#app #sort-select");
const searchInputEle = document.querySelector("#app #search-input");
const clearSearchBtnEle = document.querySelector("#app #clear-search-btn");
const dhatuDetailsModalEle = document.querySelector("#dhatu-details-modal");
const scrollToTopEle = document.querySelector("#app #scroll-to-top");
const viewFiltersEle = document.querySelector("#app #view-filters");
const filterSelectEles = viewFiltersEle.querySelectorAll("select");
const resetViewOptionsBtnEle = document.querySelector(
  "#app #reset-view-options-btn"
);

const DHATUPATHA_URL = "./assets/dhatupatha.json";
const CONCORDANCE_ENDPOINT =
  "https://cdn.jsdelivr.net/gh/samsaadhanii/scl/dhaatupaatha";
const VRITTI_ENDPOINT = `${CONCORDANCE_ENDPOINT}/files`;
const GRAPH_ENDPOINT = `${CONCORDANCE_ENDPOINT}/graphs`;
const FORMS_ENDPOINT =
  "https://sanskrit.uohyd.ac.in//cgi-bin/scl/skt_gen/verb/verb_gen_web.cgi";

const list = new List(listEle);
const loader = new Loader(loaderEle);

export const updateList = () => {
  const data = Globals.CACHE.DHATUPATHA;

  const filterQuery = getFilterQuery(filterSelectEles);
  const filteredData = filterData(data, filterQuery);

  const sortQuery = getSortQuery(sortSelectEle);
  const sortedData = sortData(filteredData, sortQuery);

  const searchQuery = getSearchQuery(searchInputEle.value);
  const searchedData = searchData(sortedData, searchQuery);

  const hilitedData = hiliteMatches(searchedData, searchQuery);

  list.setData(hilitedData);
};

const handleFilterFormEleSubmit = (e) => e.preventDefault();

const handleSortSelectEleChange = (e) => updateList();

const handleViewFiltersEleChange = (e) => updateList();

const handleSearchInputEleInput = (e) => updateList();

const handleScrollToTopClick = (e) => scrollToTop();

const handleClearSearchBtnEleClick = (e) => {
  searchInputEle.value = "";
  searchInputEle.focus();

  updateList();
};

const handleResetViewOptionsBtnEleClick = (e) => {
  const viewOptionEles = [sortSelectEle, ...filterSelectEles];

  viewOptionEles.forEach((select) => (select.selectedIndex = 0));

  updateList();
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

const initEventListeners = () => {
  searchFormEle.addEventListener("submit", handleFilterFormEleSubmit);
  sortSelectEle.addEventListener("change", handleSortSelectEleChange);
  viewFiltersEle.addEventListener("change", handleViewFiltersEleChange);
  searchInputEle.addEventListener("input", handleSearchInputEleInput);
  clearSearchBtnEle.addEventListener("click", handleClearSearchBtnEleClick);
  scrollToTopEle.addEventListener("click", handleScrollToTopClick);
  dhatuDetailsModalEle.addEventListener("show.bs.modal", handleModalShow);
  resetViewOptionsBtnEle.addEventListener(
    "click",
    handleResetViewOptionsBtnEleClick
  );
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
