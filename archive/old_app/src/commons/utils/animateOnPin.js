export const animateOnPin = (ele) => {
  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      const isPinned = entry.intersectionRatio < 1;

      entry.target.classList.toggle("pinned", isPinned);
    },
    { threshold: 1 }
  );

  observer.observe(ele);
};
