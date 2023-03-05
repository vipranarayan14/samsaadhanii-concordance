export const getFilterQuery = (filterSelectEles) =>
  Object.fromEntries(
    [...filterSelectEles].map((select) => [select.dataset.field, select.value])
  );
