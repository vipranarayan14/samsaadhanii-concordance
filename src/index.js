import "./commons/commons";

import { addProperties } from "./commons/utils/addProperties";
import { animateOnPin } from "./commons/utils/animateOnPin";
import { createDhatuModalData } from "./commons/utils/createDhatuModalData";
import { filterData } from "./commons/utils/filterData";
import { getDhatuDetails } from "./commons/utils/getDhatuDetails";
import { getFilterQuery } from "./commons/utils/getFilterQuery";
import { getSearchQuery } from "./commons/utils/getSearchQuery";
import { getSortQuery } from "./commons/utils/getSortQuery";
import { hiliteMatches } from "./commons/utils/hiliteMatches";
import { List } from "./commons/utils/List";
import { loadDhatupatha } from "./commons/utils/loadDhatupatha";
import { Loader } from "./commons/utils/Loader";
import { loadVrittis } from "./commons/utils/loadVrittis";
import { scrollToTop } from "./commons/utils/scrollToTop";
import { searchData } from "./commons/utils/searchData";
import { setupThemeTester } from "./commons/utils/setThemeTester";
import { sortData } from "./commons/utils/sortData";
import { hide, show } from "./commons/utils/utils";

const Globals = window.Globals;

Globals.CACHE = {};

const loaderEle = document.querySelector("#app #loader");
const listEle = document.querySelector("#app #dhatu-list");
const searchFormContainerEle = document.querySelector(
  "#app #search-form-container"
);
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
const viewOptionsIndicatorEle = document.querySelector(
  "#app #view-options-indicator"
);

const list = new List(listEle);
const loader = new Loader(loaderEle);

const updateIndicator = (viewOptions) => {
  const isViewOptionsModified = Object.values(viewOptions).some((value) =>
    Boolean(value)
  );

  viewOptionsIndicatorEle.classList.toggle("hidden", !isViewOptionsModified);
};

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

  const viewOptions = { ...filterQuery, ...sortQuery };

  updateIndicator(viewOptions);
};

const handleFilterFormEleSubmit = (e) => {
  e.preventDefault();

  updateList();
};

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

  const { DHATUPATHA } = Globals.CACHE;

  const dhatuDetails = getDhatuDetails(DHATUPATHA, itemId);

  const modalData = createDhatuModalData(dhatuDetails, Globals);

  const modal = e.target;
  const modalTitle = modal.querySelector(".modal-title");
  const modalBody = modal.querySelector(".modal-body");

  modalTitle.textContent = modalData.title;
  modalBody.replaceChildren(modalData.content);

  loadVrittis(modal, dhatuDetails, Globals);
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

const setupAnimations = () => {
  animateOnPin(searchFormContainerEle);
};

setupAnimations();

loader.show();

loadDhatupatha(Globals.ENDPOINTS.DHATUPATHA).then((data) => {
  Globals.CACHE.DHATUPATHA = addProperties(data);

  initEventListeners();

  updateList();

  loader.hide();
});

// TEMP: For theme testing
setupThemeTester();
