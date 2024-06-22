import { DhatuDetails } from "@/utils/types";
import { translitToWX } from "@/utils/utils";

export type FilterOption = {
  name: string;
  label: string;
  test: (DhatuDetails: DhatuDetails) => boolean;
};

type Filter = {
  name: string;
  label: string;
  options: FilterOption[];
};

const ganaOptions = [
  "भ्वादिः",
  "अदादिः",
  "जुहोत्यादिः",
  "दिवादिः",
  "स्वादिः",
  "तुदादिः",
  "रुधादिः",
  "तनादिः",
  "क्र्यादिः",
  "चुरादिः",
];

const padiOptions = ["परस्मैपदी", "आत्मनेपदी", "उभयपदी"];

const itOptions = ["सेट्", "अनिट्", "-"];

const checkVrittiPropExists = (vrittiProp: string) => {
  return (dhatuDetails: DhatuDetails) => {
    return dhatuDetails[vrittiProp as keyof DhatuDetails] !== "-";
  };
};

const makePropFilterOptions = (
  prop: keyof DhatuDetails,
  propValues: string[]
) =>
  propValues.map((propValue) => ({
    name: translitToWX(propValue),
    label: propValue,
    test: (dhatuDetails: DhatuDetails) => dhatuDetails[prop] === propValue,
  }));

const vrittiFilter: Filter = {
  name: "vritti",
  label: "वृत्तिः",
  options: [
    {
      name: "mA",
      label: "माधवीयधातुवृत्तिः",
      test: checkVrittiPropExists("madhaviyaId"),
    },
    {
      name: "kRi",
      label: "क्षीरतरङ्गिणी",
      test: checkVrittiPropExists("kshirataranginiId"),
    },
    {
      name: "XA",
      label: "धातुप्रदीपः",
      test: checkVrittiPropExists("dhatupradipaId"),
    },
  ],
};

const propFilters: Filter[] = [
  {
    name: "gana",
    label: "गणः",
    options: makePropFilterOptions("gana", ganaOptions),
  },
  {
    name: "padi",
    label: "पदि",
    options: makePropFilterOptions("padi", padiOptions),
  },
  { name: "it", label: "इट्", options: makePropFilterOptions("it", itOptions) },
];

const upadeshaFilter: Filter = {
  name: "upadesha",
  label: "उपदेशः",
  options: [
    {
      name: "RopaxeSaH",
      label: "षोपदेशः",
      test: (dd) => /^R/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "NopaxeSaH",
      label: "णोपदेशः",
      test: (dd) => /^N/.test(translitToWX(dd.dhatu)),
    },
  ],
};

const svaraFilter: Filter = {
  name: "svara",
  label: "स्वरः",
  options: [
    {
      name: "uxAwwaH",
      label: "उदात्तः",
      test: (dd) => /\|/.test(translitToWX(dd.muladhatu)),
    },
    {
      name: "anuxAwwaH",
      label: "अनुदात्तः",
      test: (dd) => /_/.test(translitToWX(dd.muladhatu)),
    },
  ],
};

const anubandhaFilter: Filter = {
  name: "anubandha",
  label: "अनुबन्धः",
  options: [
    {
      name: "ugiw",
      label: "उगित्",
      test: (dd) => /[uUqQL]z/.test(translitToWX(dd.muladhatu)),
    },
    {
      name: "tviw",
      label: "ट्वित्",
      test: (dd) => /^tu/.test(translitToWX(dd.muladhatu)),
    },
    {
      name: "dwiw",
      label: "ड्वित्",
      test: (dd) => /^du/.test(translitToWX(dd.muladhatu)),
    },
    {
      name: "FIw",
      label: "ञीत्",
      test: (dd) => /^Fi/.test(translitToWX(dd.muladhatu)),
    },
    {
      name: "iriw",
      label: "इरित्",
      // eg. buXiz|r
      test: (dd) => /iz\|?r/.test(translitToWX(dd.muladhatu)),
    },
    // // NOTE: Should we have this filter? Or have a GatAxi antargana filter?
    // //  AFAIK, there is no actual miw dhatus in dhatupatha.
    // {
    //   name: "miw",
    //   label: "मित्",
    //   test: (dd) => /^/.test(translitToWX(dd.muladhatu)),
    // },
    {
      name: "axiw",
      label: "अदित्",
      test: (dd) => /az/.test(translitToWX(dd.muladhatu)),
    },
    {
      name: "Axiw",
      label: "आदित्",
      test: (dd) => /Az/.test(translitToWX(dd.muladhatu)),
    },
    {
      name: "ixiw",
      label: "इदित्",
      test: (dd) => /iz/.test(translitToWX(dd.muladhatu)),
    },
    {
      name: "Ixiw",
      label: "ईदित्",
      test: (dd) => /Iz/.test(translitToWX(dd.muladhatu)),
    },
    {
      name: "uxiw",
      label: "उदित्",
      test: (dd) => /uz/.test(translitToWX(dd.muladhatu)),
    },
    {
      name: "Uxiw",
      label: "ऊदित्",
      test: (dd) => /Uz/.test(translitToWX(dd.muladhatu)),
    },
    {
      name: "qxiw",
      label: "ऋदित्",
      test: (dd) => /qz/.test(translitToWX(dd.muladhatu)),
    },
    {
      name: "Lqiw",
      label: "ऌदित्",
      test: (dd) => /Lz/.test(translitToWX(dd.muladhatu)),
    },
    {
      name: "exiw",
      label: "एदित्",
      test: (dd) => /ez/.test(translitToWX(dd.muladhatu)),
    },
    {
      name: "oxiw",
      label: "ओदित्",
      test: (dd) => /oz/.test(translitToWX(dd.muladhatu)),
    },
    {
      name: "kiw",
      label: "कित्",
      test: (dd) => /k$/.test(translitToWX(dd.muladhatu)),
    },
    {
      name: "diw",
      label: "ङित्",
      test: (dd) => /f$/.test(translitToWX(dd.muladhatu)),
    },
    {
      name: "Fiw",
      label: "ञित्",
      test: (dd) => /F$/.test(translitToWX(dd.muladhatu)),
    },
    {
      name: "tiw",
      label: "टित्",
      test: (dd) => /t$/.test(translitToWX(dd.muladhatu)),
    },
    {
      name: "Niw",
      label: "णित्",
      test: (dd) => /N$/.test(translitToWX(dd.muladhatu)),
    },
    {
      name: "piw",
      label: "पित्",
      test: (dd) => /p$/.test(translitToWX(dd.muladhatu)),
    },
    {
      name: "Riw",
      label: "षित्",
      test: (dd) => /R$/.test(translitToWX(dd.muladhatu)),
    },
  ],
};

const adiFilter: Filter = {
  name: "adi",
  label: "आदिवर्णः",
  options: [
    {
      name: "ac",
      label: "अच्",
      test: (dd) => /^[aAiIuUqQeEoO]/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "ic",
      label: "इच्",
      test: (dd) => /^[iIuUqQeEoO]/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "Jal",
      label: "झल्",
      test: (dd) => /^[kKgfcCjFtTdDwWxXpPbBSRsh]/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "hal",
      label: "हल्",
      test: (dd) =>
        /^[kKgGfcCjJFtTdDNwWxXnpPbBmyvrlSRsh]/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "a",
      label: "अ",
      test: (dd) => /^a/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "A",
      label: "आ",
      test: (dd) => /^A/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "i",
      label: "इ",
      test: (dd) => /^i/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "I",
      label: "ई",
      test: (dd) => /^I/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "u",
      label: "उ",
      test: (dd) => /^u/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "U",
      label: "ऊ",
      test: (dd) => /^U/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "q",
      label: "ऋ",
      test: (dd) => /^q/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "Q",
      label: "ॠ",
      test: (dd) => /^Q/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "e",
      label: "ए",
      test: (dd) => /^e/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "E",
      label: "ऐ",
      test: (dd) => /^E/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "o",
      label: "ओ",
      test: (dd) => /^o/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "O",
      label: "औ",
      test: (dd) => /^O/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "k",
      label: "क्",
      test: (dd) => /^k/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "K",
      label: "ख्",
      test: (dd) => /^K/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "g",
      label: "ग्",
      test: (dd) => /^g/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "G",
      label: "घ्",
      test: (dd) => /^G/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "f",
      label: "ङ्",
      test: (dd) => /^f/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "c",
      label: "च्",
      test: (dd) => /^c/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "C",
      label: "छ्",
      test: (dd) => /^C/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "j",
      label: "ज्",
      test: (dd) => /^j/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "J",
      label: "झ्",
      test: (dd) => /^J/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "F",
      label: "ञ्",
      test: (dd) => /^F/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "t",
      label: "ट्",
      test: (dd) => /^t/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "T",
      label: "ठ्",
      test: (dd) => /^T/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "d",
      label: "ड्",
      test: (dd) => /^d/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "D",
      label: "ढ्",
      test: (dd) => /^D/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "N",
      label: "ण्",
      test: (dd) => /^N/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "w",
      label: "त्",
      test: (dd) => /^w/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "W",
      label: "थ्",
      test: (dd) => /^W/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "x",
      label: "द्",
      test: (dd) => /^x/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "X",
      label: "ध्",
      test: (dd) => /^X/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "n",
      label: "न्",
      test: (dd) => /^n/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "p",
      label: "प्",
      test: (dd) => /^p/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "P",
      label: "फ्",
      test: (dd) => /^P/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "b",
      label: "ब्",
      test: (dd) => /^b/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "B",
      label: "भ्",
      test: (dd) => /^B/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "m",
      label: "म्",
      test: (dd) => /^m/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "y",
      label: "य्",
      test: (dd) => /^y/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "r",
      label: "र्",
      test: (dd) => /^r/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "l",
      label: "ल्",
      test: (dd) => /^l/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "v",
      label: "व्",
      test: (dd) => /^v/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "S",
      label: "श्",
      test: (dd) => /^S/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "R",
      label: "ष्",
      test: (dd) => /^R/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "s",
      label: "स्",
      test: (dd) => /^s/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "h",
      label: "ह्",
      test: (dd) => /^h/.test(translitToWX(dd.dhatu)),
    },
  ],
};

const antaFilter: Filter = {
  name: "anta",
  label: "अन्त्यवर्णः",
  options: [
    {
      name: "ac",
      label: "अज्",
      test: (dd) => /[aAiIuUqQeEoO]$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "ic",
      label: "इज्",
      test: (dd) => /[iIuUqQeEoO]$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "Jal",
      label: "झल्",
      test: (dd) => /[kKgfcCjFtTdDwWxXpPbBSRsh]$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "hal",
      label: "हल्",
      test: (dd) =>
        /[kKgGfcCjJFtTdDNwWxXnpPbBmyvrlSRsh]$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "a",
      label: "अ",
      test: (dd) => /a$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "A",
      label: "आ",
      test: (dd) => /A$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "i",
      label: "इ",
      test: (dd) => /i$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "I",
      label: "ई",
      test: (dd) => /I$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "u",
      label: "उ",
      test: (dd) => /u$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "U",
      label: "ऊ",
      test: (dd) => /U$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "q",
      label: "ऋ",
      test: (dd) => /q$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "Q",
      label: "ॠ",
      test: (dd) => /Q$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "e",
      label: "ए",
      test: (dd) => /e$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "E",
      label: "ऐ",
      test: (dd) => /E$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "o",
      label: "ओ",
      test: (dd) => /o$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "O",
      label: "औ",
      test: (dd) => /O$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "k",
      label: "क्",
      test: (dd) => /k$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "K",
      label: "ख्",
      test: (dd) => /K$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "g",
      label: "ग्",
      test: (dd) => /g$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "G",
      label: "घ्",
      test: (dd) => /G$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "f",
      label: "ङ्",
      test: (dd) => /f$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "c",
      label: "च्",
      test: (dd) => /c$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "C",
      label: "छ्",
      test: (dd) => /C$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "j",
      label: "ज्",
      test: (dd) => /j$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "J",
      label: "झ्",
      test: (dd) => /J$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "F",
      label: "ञ्",
      test: (dd) => /F$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "t",
      label: "ट्",
      test: (dd) => /t$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "T",
      label: "ठ्",
      test: (dd) => /T$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "d",
      label: "ड्",
      test: (dd) => /d$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "D",
      label: "ढ्",
      test: (dd) => /D$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "N",
      label: "ण्",
      test: (dd) => /N$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "w",
      label: "त्",
      test: (dd) => /w$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "W",
      label: "थ्",
      test: (dd) => /W$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "x",
      label: "द्",
      test: (dd) => /x$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "X",
      label: "ध्",
      test: (dd) => /X$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "n",
      label: "न्",
      test: (dd) => /n$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "p",
      label: "प्",
      test: (dd) => /p$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "P",
      label: "फ्",
      test: (dd) => /P$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "b",
      label: "ब्",
      test: (dd) => /b$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "B",
      label: "भ्",
      test: (dd) => /B$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "m",
      label: "म्",
      test: (dd) => /m$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "y",
      label: "य्",
      test: (dd) => /y$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "r",
      label: "र्",
      test: (dd) => /r$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "l",
      label: "ल्",
      test: (dd) => /l$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "v",
      label: "व्",
      test: (dd) => /v$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "S",
      label: "श्",
      test: (dd) => /S$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "R",
      label: "ष्",
      test: (dd) => /R$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "s",
      label: "स्",
      test: (dd) => /s$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "h",
      label: "ह्",
      test: (dd) => /h$/.test(translitToWX(dd.dhatu)),
    },
  ],
};

const upadhaFilter: Filter = {
  name: "upadha",
  label: "उपधावर्णः",
  options: [
    {
      name: "a",
      label: "अ",
      test: (dd) => /a.$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "A",
      label: "आ",
      test: (dd) => /A.$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "i",
      label: "इ",
      test: (dd) => /i.$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "I",
      label: "ई",
      test: (dd) => /I.$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "u",
      label: "उ",
      test: (dd) => /u.$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "U",
      label: "ऊ",
      test: (dd) => /U.$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "q",
      label: "ऋ",
      test: (dd) => /q.$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "Q",
      label: "ॠ",
      test: (dd) => /Q.$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "e",
      label: "ए",
      test: (dd) => /e.$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "E",
      label: "ऐ",
      test: (dd) => /E.$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "o",
      label: "ओ",
      test: (dd) => /o.$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "O",
      label: "औ",
      test: (dd) => /O.$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "k",
      label: "क्",
      test: (dd) => /k.$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "K",
      label: "ख्",
      test: (dd) => /K.$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "g",
      label: "ग्",
      test: (dd) => /g.$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "G",
      label: "घ्",
      test: (dd) => /G.$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "f",
      label: "ङ्",
      test: (dd) => /f.$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "c",
      label: "च्",
      test: (dd) => /c.$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "C",
      label: "छ्",
      test: (dd) => /C.$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "j",
      label: "ज्",
      test: (dd) => /j.$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "J",
      label: "झ्",
      test: (dd) => /J.$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "F",
      label: "ञ्",
      test: (dd) => /F.$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "t",
      label: "ट्",
      test: (dd) => /t.$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "T",
      label: "ठ्",
      test: (dd) => /T.$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "d",
      label: "ड्",
      test: (dd) => /d.$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "D",
      label: "ढ्",
      test: (dd) => /D.$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "N",
      label: "ण्",
      test: (dd) => /N.$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "w",
      label: "त्",
      test: (dd) => /w.$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "W",
      label: "थ्",
      test: (dd) => /W.$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "x",
      label: "द्",
      test: (dd) => /x.$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "X",
      label: "ध्",
      test: (dd) => /X.$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "n",
      label: "न्",
      test: (dd) => /n.$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "p",
      label: "प्",
      test: (dd) => /p.$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "P",
      label: "फ्",
      test: (dd) => /P.$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "b",
      label: "ब्",
      test: (dd) => /b.$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "B",
      label: "भ्",
      test: (dd) => /B.$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "m",
      label: "म्",
      test: (dd) => /m.$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "y",
      label: "य्",
      test: (dd) => /y.$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "r",
      label: "र्",
      test: (dd) => /r.$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "l",
      label: "ल्",
      test: (dd) => /l.$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "v",
      label: "व्",
      test: (dd) => /v.$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "S",
      label: "श्",
      test: (dd) => /S.$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "R",
      label: "ष्",
      test: (dd) => /R.$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "s",
      label: "स्",
      test: (dd) => /s.$/.test(translitToWX(dd.dhatu)),
    },
    {
      name: "h",
      label: "ह्",
      test: (dd) => /h.$/.test(translitToWX(dd.dhatu)),
    },
  ],
};

export const viewFilters: Filter[] = [
  vrittiFilter,
  ...propFilters,
  upadeshaFilter,
  svaraFilter,
  anubandhaFilter,
  adiFilter,
  antaFilter,
  upadhaFilter,
];
