import { da, hide, qs, removeSvaras, show, translitToWX } from "./utils";

const createFormsQuery = (details) => {
  const { dhatuId, muladhatu, padi, gana, meaning } = details;

  const prayoga = "karwari";
  const encoding = "WX";

  const vb = [dhatuId, removeSvaras(muladhatu), gana, meaning]
    .map(translitToWX)
    .join("_");

  const padiInWX = translitToWX(padi);

  return (
    `?vb=${vb}` +
    `&prayoga_paxI=${prayoga}-${padiInWX}` +
    `&encoding=${encoding}` +
    `&upasarga=-` + // required
    `&mode=json`
  );
};

const lakaras = [
  "लट् (वर्तमान)",
  "लिट् (परोक्ष)",
  "लुट् (अनद्यतन भविष्यत्)",
  "लृट् (अद्यतन भविष्यत्)",
  "लोट् (आज्ञार्थ)",
  "लङ् (अनद्यतन भूत)",
  "विधिलिङ्",
  "आशीर्लिङ्",
  "लुङ् (अद्यतन भूत)",
  "लृङ् (भविष्यत्)",
];

const createFormsTable = (retructuredFormsData) => {
  const template = qs("#template-forms-table");

  const formsTables = [];

  for (const formsData of retructuredFormsData) {
    const formsTable = template.content.cloneNode(true);

    const getSlot = (slotName) => qs(da("slot", slotName), formsTable);

    const lakaraSlot = getSlot("lakara");
    lakaraSlot.textContent = formsData.lakaraName;

    const parasmaiTableSlot = getSlot("parasmaiTable");

    if (formsData.parasmaiForms) {
      for (const [slotName, slotValue] of Object.entries(
        formsData.parasmaiForms
      )) {
        const slot = getSlot(`p${slotName}`);

        if (slot) slot.textContent = slotValue;
      }
    } else {
      hide(parasmaiTableSlot);
    }

    const aatmaneTableSlot = getSlot("aatmaneTable");

    if (formsData.aatmaneForms) {
      for (const [slotName, slotValue] of Object.entries(
        formsData.aatmaneForms
      )) {
        const slot = getSlot(`a${slotName}`);

        if (slot) slot.textContent = slotValue;
      }
    } else {
      hide(aatmaneTableSlot);
    }

    formsTables.push(formsTable);
  }

  return formsTables;
};

const setForms = (targetEle, retructuredFormsData) => {
  const formsTableEle = qs(da("slot", "formsTable"), targetEle);

  if (!formsTableEle) return;

  const formsTables = createFormsTable(retructuredFormsData);

  formsTableEle.replaceChildren(...formsTables);
};

const formKeysMap = {
  "प्रथमपुरुषः-एकवचनम्": "pe",
  "प्रथमपुरुषः-द्विवचनम्": "pd",
  "प्रथमपुरुषः-बहुवचनम्": "pb",
  "मध्यमपुरुषः-एकवचनम्": "me",
  "मध्यमपुरुषः-द्विवचनम्": "md",
  "मध्यमपुरुषः-बहुवचनम्": "mb",
  "उत्तमपुरुषः-एकवचनम्": "ue",
  "उत्तमपुरुषः-द्विवचनम्": "ud",
  "उत्तमपुरुषः-बहुवचनम्": "ub",
};

const restructureForms = (formsData) => {
  const restructuredForms = {
    pe: "",
    pd: "",
    pb: "",
    me: "",
    md: "",
    mb: "",
    ue: "",
    ud: "",
    ub: "",
  };

  for (const formDetails of formsData) {
    const formsKey = formKeysMap[`${formDetails.person}-${formDetails.number}`];

    restructuredForms[formsKey] = formDetails.form;
  }

  return restructuredForms;
};

const retructureFormsData = (formsData) => {
  const parasmai = formsData[0]["parasmE"];
  const aatmane = formsData[0]["Awmane"];

  const retructuredFormsData = [];

  for (const [lakaraId, lakaraName] of lakaras.entries()) {
    const parasmaiForms = parasmai
      ? restructureForms(parasmai[0][`l_forms_${lakaraId}`])
      : null;
    const aatmaneForms = aatmane
      ? restructureForms(aatmane[0][`l_forms_${lakaraId}`])
      : null;

    retructuredFormsData.push({
      lakaraName,
      parasmaiForms,
      aatmaneForms,
    });
  }

  return retructuredFormsData;
};

export const loadForms = async (targetEle, details, Globals) => {
  const formsQuery = createFormsQuery(details);

  const formsURL = `${Globals.ENDPOINTS.FORMS}/${formsQuery}`;

  const result = await fetch(formsURL);

  const formsData = await result.json();

  const retructuredFormsData = retructureFormsData(formsData);

  console.log(retructuredFormsData);

  setForms(targetEle, retructuredFormsData);
};


