import util from "node:util";
import childProcess from "node:child_process";

import { LakaraDetails } from "@/utils/restructureFormsData";
import { product, chunk, translitToDev, translitToWX } from "@/utils/utils";
import {
  LAKARAS_DEV_LIST,
  LAKARAS,
  PV_CHARS_LIST,
  PADIS,
  PURUSHAS,
  VACANAS,
} from "@/utils/consts";

import type { DhatuDetails } from "@/utils/types";

const exec = util.promisify(childProcess.exec);

const verbsGenBinFilePath = "src/assets/verbs_generator.bin";

async function getForms(query: string): Promise<string[]> {
  const cmd = `echo '${query}' | lt-proc -gc ${verbsGenBinFilePath}`;

  const { stdout, stderr } = await exec(cmd);

  if (stderr) {
    console.error("stderr:", stderr);
    process.exit(1);
  }

  if (!stdout) {
    return [];
  }

  const result = stdout.trim();

  const forms = result.split("\n");

  return forms;
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

const makeAnalysis = (
  dhatuid: string,
  gana: string,
  prayoga: string,
  lakara: string,
  padi: string,
  purusha: string,
  vacana: string,
  sanadi?: string
): string => {
  let analysis: string;

  if (sanadi) {
    analysis = `^${dhatuid}<sanAxi_prawyayaH:${sanadi}><prayogaH:${prayoga}><lakAraH:${lakara}><puruRaH:${purusha}><vacanam:${vacana}><paxI:${padi}><gaNaH:${gana}>$`;
  } else {
    analysis = `^${dhatuid}<prayogaH:${prayoga}><lakAraH:${lakara}><puruRaH:${purusha}><vacanam:${vacana}><paxI:${padi}><gaNaH:${gana}>$`;
  }

  return analysis;
};

const makeQuery = (
  dhatuId: string,
  gana: string,
  prayoga: string,
  sanadi?: string
): string => {
  const props = [LAKARAS, PADIS, PURUSHAS, VACANAS].map(Object.values<string>);

  const analyses = product(...props).map(([lakara, padi, purusha, vacana]) =>
    makeAnalysis(dhatuId, gana, prayoga, lakara, padi, purusha, vacana, sanadi)
  );

  const query = analyses.join("\n");

  return query;
};

export const getFormsDataLocal = async (
  dhatuDetails: DhatuDetails,
  prayoga: string,
  sanadi?: string
): Promise<LakaraDetails[]> => {
  const { dhatuId, gana } = dhatuDetails;

  const ganaInWX = translitToWX(gana);

  const query = makeQuery(dhatuId, ganaInWX, prayoga, sanadi);

  const forms = await getForms(query);

  const lakaras = chunk(forms, 9);

  const lakarasByPadi = chunk(lakaras, 2);

  const formsData = lakarasByPadi.map((lakaraByPadi, i) => {
    const lakaraName = LAKARAS_DEV_LIST[i];

    const parasmaiForms = formatForms(lakaraByPadi[1]);
    const aatmaneForms = formatForms(lakaraByPadi[0]);

    return {
      lakaraName,
      parasmaiForms,
      aatmaneForms,
    };
  });

  return formsData;
};
