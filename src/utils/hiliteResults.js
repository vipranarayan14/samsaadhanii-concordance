export const hiliteResults = (filteredList, keywordsSets) => {
  const keywords = keywordsSets.flat(1);
  const keywordsRegex = new RegExp(`${keywords.join("|")}`, "g");

  const hilite = (text) => text.replace(keywordsRegex, "<mark>$&</mark>");

  return filteredList.map((details) => ({
    ...details,
    muladhatu: hilite(details.muladhatu),
    dhatu: hilite(details.dhatu),
    meaning: hilite(details.meaning),
    gana: hilite(details.gana),
    padi: hilite(details.padi),
    it: hilite(details.it),
    madhaviyaId: hilite(details.madhaviyaId),
    kshirataranginiId: hilite(details.kshirataranginiId),
    dhatupradipaId: hilite(details.dhatupradipaId),
  }));
};
