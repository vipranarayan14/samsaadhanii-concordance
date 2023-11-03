import { LAKARAS_DEV_LIST } from "./consts";

type FormDetails = {
  form: string;
  person: string;
  number: string;
};

export type LakaraDetails = {
  lakaraName: string;
  parasmaiForms: Record<string, string> | null;
  aatmaneForms: Record<string, string> | null;
};

const formKeysMap: Record<string, string> = {
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

const restructureForms = (formsData: FormDetails[]) => {
  const restructuredForms: Record<string, string> = {
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

export const retructureFormsData = (formsData: Record<string, any>) => {
  const parasmai = formsData[0]["parasmE"];
  const aatmane = formsData[0]["Awmane"];

  const retructuredFormsData: LakaraDetails[] = [];

  for (const [lakaraId, lakaraName] of LAKARAS_DEV_LIST.entries()) {
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
