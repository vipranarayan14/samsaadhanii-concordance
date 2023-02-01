export const setupThemeTester = () => {
  const searchParams = new URLSearchParams(document.location.search);

  const themeParam = searchParams.get("theme");

  if (themeParam) {
    document.body
      .querySelectorAll("*")
      .forEach((ele) => ele.classList.add(themeParam));
  }
};
