import util from "node:util";
import childProcess from "node:child_process";

import {
  LAKARAS_DEV_LIST,
  LAKARAS_WX_LIST,
  PADI_SHORT,
  PV_CHARS_LIST,
  PV_NUM_LIST,
} from "./consts";

import { LakaraDetails } from "./restructureFormsData";
import { chunk, translitToDev, translitToWX } from "./utils";

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

const formatForms = (forms: string[]): Forms | null => {
  if (forms.every((form) => form.startsWith("#"))) {
    return null;
  }

  return Object.fromEntries(
    forms.map((form, i) => [
      PV_CHARS_LIST[i],
      form.startsWith("#") ? "-" : translitToDev(form),
    ])
  );
};

export const getFormsDataLocal = async (
  dhatuDetails: DhatuDetails,
  prayoga: string
): Promise<LakaraDetails[]> => {
  const { dhatuId, gana } = dhatuDetails;

  const ganaInWX = translitToWX(gana);
  const ganaWithoutH = ganaInWX.slice(0, -1);

  const formsInput = LAKARAS_WX_LIST.flatMap((lakara) =>
    Object.values(PADI_SHORT).flatMap((padi) =>
      PV_NUM_LIST.flatMap(
        (pv) =>
          `^${dhatuId}<verb><${prayoga}><${lakara}><${pv}><${padi}><${ganaWithoutH}>$`
      )
    )
  ).join("\n");

  const formsOutput = await getForms(formsInput);

  const formsList = formsOutput.split("\n");

  const lakaras = chunk(formsList, 9);

  const lakarasByPadi = chunk(lakaras, 2);

  const formsData = lakarasByPadi.map((lakaraByPadi, i) => {
    const lakaraName = LAKARAS_DEV_LIST[i];

    const parasmaiForms = formatForms(lakaraByPadi[0]);
    const aatmaneForms = formatForms(lakaraByPadi[1]);

    return {
      lakaraName,
      parasmaiForms,
      aatmaneForms,
    };
  });

  return formsData;
};
