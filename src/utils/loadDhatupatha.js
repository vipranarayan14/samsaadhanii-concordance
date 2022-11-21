export const loadDhatupatha = async (DHATUPATHA_URL) => {
  const result = await fetch(DHATUPATHA_URL);

  const data = await result.json();

  return data;
};
