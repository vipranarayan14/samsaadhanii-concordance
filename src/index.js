import { bootstrap } from "./commons/commons";

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
import { Params } from "./commons/utils/Params";
import { scrollToTop } from "./commons/utils/scrollToTop";
import { searchData } from "./commons/utils/searchData";
import { sortData } from "./commons/utils/sortData";
import { da, qs, qsa, show, hide, toggle } from "./commons/utils/utils";

const Globals = {};

// ENDPOINTS are set in index.html
Globals.ENDPOINTS = {
  DHATUPATHA: DHATUPATHA_ENDPOINT,
  VRITTI: VRITTI_ENDPOINT,
  GRAPH: GRAPH_ENDPOINT,
  FORMS: FORMS_ENDPOINT,
};

Globals.CACHE = {};

const loaderEle = qs("#app #loader");
const listEle = qs("#app #dhatu-list");
const searchFormEle = qs("#app #search-form");
const sortSelectEle = qs("#app #sort-select");
const searchInputEle = qs("#app #search-input");
const clearSearchBtnEle = qs(da("action", "clear"), searchFormEle);
const dhatuDetailsModalEle = qs("#dhatu-details-modal");
const scrollToTopEle = qs("#app #scroll-to-top");
const viewFiltersEle = qs("#app #view-filters");
const filterSelectEles = qsa("select", viewFiltersEle);
const viewOptionsEle = qs("#app #view-options");
const resetViewOptionsBtnEle = qs(da("action", "reset"), viewOptionsEle);
const viewOptionsIndicatorEle = qs("#app #view-options-indicator");
const searchFormContainerEle = qs("#app #search-form-container");
const viewOptionEles = [sortSelectEle, ...filterSelectEles];

const list = new List(listEle);
const loader = new Loader(loaderEle);
const dhatuDetailsModal = new bootstrap.Modal(dhatuDetailsModalEle);

const updateIndicator = (isViewOptionsModified) =>
  toggle(viewOptionsIndicatorEle, !isViewOptionsModified);

const updateListState = (isListModified) =>
  listEle.classList.toggle("_initial", !isListModified);

export const updateList = () => {
  const data = Globals.CACHE.DHATUPATHA;

  const filterQuery = getFilterQuery(filterSelectEles);
  const filteredData = filterData(data, filterQuery);

  const sortQuery = getSortQuery(sortSelectEle);
  const sortedData = sortData(filteredData, sortQuery);

  const searchQuery = getSearchQuery(searchInputEle);
  const searchedData = searchData(sortedData, searchQuery);

  const hilitedData = hiliteMatches(searchedData, searchQuery);

  list.setData(hilitedData);

  // Side-effects 👇

  const viewOptions = { ...filterQuery, ...sortQuery };

  const isViewOptionsModified = Object.values(viewOptions).some((value) =>
    Boolean(value)
  );

  updateIndicator(isViewOptionsModified);

  const isListModified = isViewOptionsModified || Boolean(searchInputEle.value);

  updateListState(isListModified);
};

const updateStateFromParams = () => {
  searchInputEle.value = Params.getSearchField("q");

  viewOptionEles.forEach((select) => {
    const value = Params.getOptionField(select.dataset.field) ?? "";

    const values = [...select.options].map((option) => option.value);

    if (!values.includes(value)) return;

    select.value = value;
  });
};

const resetViewOptions = () => {
  viewOptionEles.forEach((select) => (select.selectedIndex = 0));

  const viewOptionFields = viewOptionEles.map((select) => select.dataset.field);

  Params.resetOptionFields(viewOptionFields);
};

const resetSearch = () => {
  searchInputEle.value = "";

  Params.resetSearchField();
};

const resetQuery = () => {
  resetViewOptions();
  resetSearch();

  updateList();
};

const locateItem = (itemId) => {
  window.setTimeout(() => {
    resetQuery();

    list.goToItem(itemId);
  }, 500);
};

const handleFilterFormEleSubmit = (e) => {
  e.preventDefault();

  updateList();
};

const handleSearchInputEleInput = (e) => {
  updateList();

  Params.setSearchField(e.target.value);
};

const handleScrollToTopClick = (e) => scrollToTop();

const handleClearSearchBtnEleClick = (e) => {
  if (!searchInputEle.value) return;

  resetSearch();

  searchInputEle.focus();

  updateList();
};

const handleViewOptionsEleChange = (e) => {
  updateList();

  Params.setOptionField(e.target.dataset.field, e.target.value);
};

const handleResetViewOptionsBtnEleClick = (e) => {
  resetViewOptions();

  updateList();
};

const handleDhatuListClick = (e) => {
  e.preventDefault();

  const item = e.target.closest(da("item-id"));

  const { itemId } = item.dataset;

  const locateBtn = e.target.closest(da("action", "locate"));

  const isLocateBtnClicked = locateBtn !== null;

  if (isLocateBtnClicked) {
    hide(qs(da("icon", "locate"), locateBtn));
    show(qs(da("icon", "spinner"), locateBtn));

    locateItem(itemId);

    return;
  }

  dhatuDetailsModal.show(item);
};

const handleModalShow = (e) => {
  const item = e.relatedTarget;

  const { itemId } = item.dataset;

  const { DHATUPATHA } = Globals.CACHE;

  const dhatuDetails = getDhatuDetails(DHATUPATHA, itemId);

  const modalData = createDhatuModalData(dhatuDetails, Globals);

  const modalEle = e.target;
  const modalTitle = qs(".modal-title", modalEle);
  const modalBody = qs(".modal-body", modalEle);

  modalEle.setAttribute("data-item-id", itemId);

  modalTitle.textContent = modalData.title;
  modalBody.replaceChildren(modalData.content);

  loadVrittis(modalEle, dhatuDetails, Globals);
};

const handleModalHide = (e) => {
  const modalEle = e.target;

  const { itemId } = modalEle.dataset;

  const relatedTarget = qs(da("item-id", itemId), listEle);

  relatedTarget.focus();
};

const handleDOMContentLoaded = (e) => {
  updateStateFromParams();
};

const handlePopstate = (e) => {
  updateStateFromParams();

  updateList();
};

const initEventListeners = () => {
  searchFormEle.addEventListener("submit", handleFilterFormEleSubmit);
  viewOptionsEle.addEventListener("change", handleViewOptionsEleChange);
  searchInputEle.addEventListener("input", handleSearchInputEleInput);
  clearSearchBtnEle.addEventListener("click", handleClearSearchBtnEleClick);
  scrollToTopEle.addEventListener("click", handleScrollToTopClick);
  listEle.addEventListener("click", handleDhatuListClick);
  dhatuDetailsModalEle.addEventListener("show.bs.modal", handleModalShow);
  dhatuDetailsModalEle.addEventListener("hidden.bs.modal", handleModalHide);
  resetViewOptionsBtnEle.addEventListener(
    "click",
    handleResetViewOptionsBtnEleClick
  );
};

const setupAnimations = () => {
  animateOnPin(searchFormContainerEle);
};

// App init 👇

window.addEventListener("popstate", handlePopstate);
document.addEventListener("DOMContentLoaded", handleDOMContentLoaded);

setupAnimations();

loader.show();

loadDhatupatha(Globals.ENDPOINTS.DHATUPATHA).then((data) => {
  Globals.CACHE.DHATUPATHA = addProperties(data);

  initEventListeners();

  updateList();

  loader.hide();
});
