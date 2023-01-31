export const getFilterQuery = (filterSelectEles) =>
  Object.fromEntries(
    [...filterSelectEles].map((select) => [
      select.dataset.filterBy,
      select.value,
    ])
  );
