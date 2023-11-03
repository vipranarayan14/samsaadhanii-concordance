import util from "node:util";
import childProcess from "node:child_process";

import {
  LAKARAS_DEV_LIST,
  LAKARAS_WX_LIST,
  PADI_SHORT,
  PV_NUM_LIST,
} from "./consts";

import { LakaraDetails } from "./restructureFormsData";
import { translitToDev, translitToWX } from "./utils";

import { DhatuDetails } from "./getDhatupatha";

const exec = util.promisify(childProcess.exec);

const verbsGenBinFilePath = "src/assets/verbs_generator.bin";

async function getForms(formsInput: string): Promise<string> {
  const cmd = `echo '${formsInput}' | lt-proc -gc ${verbsGenBinFilePath}`;

  const { stdout, stderr } = await exec(cmd);

  if (stderr) {
    console.error("stderr:", stderr);
    process.exit(1);
  }

  if (!stdout) {
    return "";
  }

  return stdout.trim();
}

type Forms = Record<string, string>;

const makeForms = async (
  dhatuId: string,
  gana: string,
  prayoga: string,
  padi: string,
  lakara: string
): Promise<Forms | null> => {
  const formsInput = Object.values(PV_NUM_LIST)
    .map(
      (pv) =>
        `^${dhatuId}<verb><${prayoga}><${lakara}><${pv}><${padi}><${gana}>$`
    )
    .join("\n");

  const formsOutput = await getForms(formsInput);

  const pvKeys = ["pe", "pd", "pb", "me", "md", "mb", "ue", "ud", "ub"];

  const formsList = formsOutput.split("\n");

  if (formsList.every((form) => form.startsWith("#"))) {
    return null;
  }

  const forms: Forms = {};

  for (const [i, form] of formsList.entries()) {
    const validForm = form.startsWith("#") ? "-" : form;

    forms[pvKeys[i]] = translitToDev(validForm);
  }

  return forms;
};

const makeLakaras = async (dhatuId: string, gana: string, prayoga: string) =>
  await Promise.all(
    LAKARAS_WX_LIST.map(async (lakara, i) => ({
      lakaraName: LAKARAS_DEV_LIST[i],
      parasmaiForms: await makeForms(
        dhatuId,
        gana,
        prayoga,
        PADI_SHORT.PARASMAIPADI,
        lakara
      ),
      aatmaneForms: await makeForms(
        dhatuId,
        gana,
        prayoga,
        PADI_SHORT.ATMANEPADI,
        lakara
      ),
    }))
  );

export const getFormsDataLocal = async (
  dhatuDetails: DhatuDetails,
  prayoga: string
): Promise<LakaraDetails[]> => {
  const { dhatuId, gana } = dhatuDetails;

  const ganaInWX = translitToWX(gana);
  const ganaWithoutH = ganaInWX.slice(0, -1);

  return await makeLakaras(dhatuId, ganaWithoutH, prayoga);
};
