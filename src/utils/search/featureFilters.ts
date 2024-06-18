type Filters = Record<string, (dhatu_wx: string) => boolean>;

export const upadeshaFilters: Filters = {
  षोपदेशः: (dhatu_wx) => /^R/.test(dhatu_wx),
  णोपदेशः: (dhatu_wx) => /^N/.test(dhatu_wx),
};

export const adiFilters: Filters = {
  अजादिः: (dhatu_wx) => /^[aAiIuUqQeEoO]/.test(dhatu_wx),
  इजादिः: (dhatu_wx) => /^[iIuUqQeEoO]/.test(dhatu_wx),
  झलादिः: (dhatu_wx) => /^[kKgfcCjFtTdDwWxXpPbBSRsh]/.test(dhatu_wx),
  हलादिः: (dhatu_wx) => /^[kKgGfcCjJFtTdDNwWxXnpPbBmyvrlSRsh]/.test(dhatu_wx),
  अकारादिः: (dhatu_wx) => /^a/.test(dhatu_wx),
  आकारादिः: (dhatu_wx) => /^A/.test(dhatu_wx),
  इकारादिः: (dhatu_wx) => /^i/.test(dhatu_wx),
  ईकारादिः: (dhatu_wx) => /^I/.test(dhatu_wx),
  उकारादिः: (dhatu_wx) => /^u/.test(dhatu_wx),
  ऊकारादिः: (dhatu_wx) => /^U/.test(dhatu_wx),
  ऋकारादिः: (dhatu_wx) => /^q/.test(dhatu_wx),
  ॠकारादिः: (dhatu_wx) => /^Q/.test(dhatu_wx),
  एकारादिः: (dhatu_wx) => /^e/.test(dhatu_wx),
  ऐकारादिः: (dhatu_wx) => /^E/.test(dhatu_wx),
  ओकारादिः: (dhatu_wx) => /^o/.test(dhatu_wx),
  औकारादिः: (dhatu_wx) => /^O/.test(dhatu_wx),
  ककारादिः: (dhatu_wx) => /^k/.test(dhatu_wx),
  खकारादिः: (dhatu_wx) => /^K/.test(dhatu_wx),
  गकारादिः: (dhatu_wx) => /^g/.test(dhatu_wx),
  घकारादिः: (dhatu_wx) => /^G/.test(dhatu_wx),
  ङकारादिः: (dhatu_wx) => /^f/.test(dhatu_wx),
  चकारादिः: (dhatu_wx) => /^c/.test(dhatu_wx),
  छकारादिः: (dhatu_wx) => /^C/.test(dhatu_wx),
  जकारादिः: (dhatu_wx) => /^j/.test(dhatu_wx),
  झकारादिः: (dhatu_wx) => /^J/.test(dhatu_wx),
  ञकारादिः: (dhatu_wx) => /^F/.test(dhatu_wx),
  टकारादिः: (dhatu_wx) => /^t/.test(dhatu_wx),
  ठकारादिः: (dhatu_wx) => /^T/.test(dhatu_wx),
  डकारादिः: (dhatu_wx) => /^d/.test(dhatu_wx),
  ढकारादिः: (dhatu_wx) => /^D/.test(dhatu_wx),
  णकारादिः: (dhatu_wx) => /^N/.test(dhatu_wx),
  तकारादिः: (dhatu_wx) => /^w/.test(dhatu_wx),
  थकारादिः: (dhatu_wx) => /^W/.test(dhatu_wx),
  दकारादिः: (dhatu_wx) => /^x/.test(dhatu_wx),
  धकारादिः: (dhatu_wx) => /^X/.test(dhatu_wx),
  नकारादिः: (dhatu_wx) => /^n/.test(dhatu_wx),
  पकारादिः: (dhatu_wx) => /^p/.test(dhatu_wx),
  फकारादिः: (dhatu_wx) => /^P/.test(dhatu_wx),
  बकारादिः: (dhatu_wx) => /^b/.test(dhatu_wx),
  भकारादिः: (dhatu_wx) => /^B/.test(dhatu_wx),
  मकारादिः: (dhatu_wx) => /^m/.test(dhatu_wx),
  यकारादिः: (dhatu_wx) => /^y/.test(dhatu_wx),
  रेफादिः: (dhatu_wx) => /^r/.test(dhatu_wx),
  लकारादिः: (dhatu_wx) => /^l/.test(dhatu_wx),
  वकारादिः: (dhatu_wx) => /^v/.test(dhatu_wx),
  शकारादिः: (dhatu_wx) => /^S/.test(dhatu_wx),
  षकारादिः: (dhatu_wx) => /^R/.test(dhatu_wx),
  सकारादिः: (dhatu_wx) => /^s/.test(dhatu_wx),
  हकारादिः: (dhatu_wx) => /^h/.test(dhatu_wx),
};

export const antaFilters: Filters = {
  अजन्तः: (dhatu_wx) => /[aAiIuUqQeEoO]$/.test(dhatu_wx),
  इजन्तः: (dhatu_wx) => /[iIuUqQeEoO]$/.test(dhatu_wx),
  झलन्तः: (dhatu_wx) => /[kKgfcCjFtTdDwWxXpPbBSRsh]$/.test(dhatu_wx),
  हलन्तः: (dhatu_wx) => /[kKgGfcCjJFtTdDNwWxXnpPbBmyvrlSRsh]$/.test(dhatu_wx),
  अकारान्तः: (dhatu_wx) => /a$/.test(dhatu_wx),
  आकारान्तः: (dhatu_wx) => /A$/.test(dhatu_wx),
  इकारान्तः: (dhatu_wx) => /i$/.test(dhatu_wx),
  ईकारान्तः: (dhatu_wx) => /I$/.test(dhatu_wx),
  उकारान्तः: (dhatu_wx) => /u$/.test(dhatu_wx),
  ऊकारान्तः: (dhatu_wx) => /U$/.test(dhatu_wx),
  ऋकारान्तः: (dhatu_wx) => /q$/.test(dhatu_wx),
  ॠकारान्तः: (dhatu_wx) => /Q$/.test(dhatu_wx),
  एकारान्तः: (dhatu_wx) => /e$/.test(dhatu_wx),
  ऐकारान्तः: (dhatu_wx) => /E$/.test(dhatu_wx),
  ओकारान्तः: (dhatu_wx) => /o$/.test(dhatu_wx),
  औकारान्तः: (dhatu_wx) => /O$/.test(dhatu_wx),
  ककारान्तः: (dhatu_wx) => /k$/.test(dhatu_wx),
  खकारान्तः: (dhatu_wx) => /K$/.test(dhatu_wx),
  गकारान्तः: (dhatu_wx) => /g$/.test(dhatu_wx),
  घकारान्तः: (dhatu_wx) => /G$/.test(dhatu_wx),
  ङकारान्तः: (dhatu_wx) => /f$/.test(dhatu_wx),
  चकारान्तः: (dhatu_wx) => /c$/.test(dhatu_wx),
  छकारान्तः: (dhatu_wx) => /C$/.test(dhatu_wx),
  जकारान्तः: (dhatu_wx) => /j$/.test(dhatu_wx),
  झकारान्तः: (dhatu_wx) => /J$/.test(dhatu_wx),
  ञकारान्तः: (dhatu_wx) => /F$/.test(dhatu_wx),
  टकारान्तः: (dhatu_wx) => /t$/.test(dhatu_wx),
  ठकारान्तः: (dhatu_wx) => /T$/.test(dhatu_wx),
  डकारान्तः: (dhatu_wx) => /d$/.test(dhatu_wx),
  ढकारान्तः: (dhatu_wx) => /D$/.test(dhatu_wx),
  णकारान्तः: (dhatu_wx) => /N$/.test(dhatu_wx),
  तकारान्तः: (dhatu_wx) => /w$/.test(dhatu_wx),
  थकारान्तः: (dhatu_wx) => /W$/.test(dhatu_wx),
  दकारान्तः: (dhatu_wx) => /x$/.test(dhatu_wx),
  धकारान्तः: (dhatu_wx) => /X$/.test(dhatu_wx),
  नकारान्तः: (dhatu_wx) => /n$/.test(dhatu_wx),
  पकारान्तः: (dhatu_wx) => /p$/.test(dhatu_wx),
  फकारान्तः: (dhatu_wx) => /P$/.test(dhatu_wx),
  बकारान्तः: (dhatu_wx) => /b$/.test(dhatu_wx),
  भकारान्तः: (dhatu_wx) => /B$/.test(dhatu_wx),
  मकारान्तः: (dhatu_wx) => /m$/.test(dhatu_wx),
  यकारान्तः: (dhatu_wx) => /y$/.test(dhatu_wx),
  रेफान्तः: (dhatu_wx) => /r$/.test(dhatu_wx),
  लकारान्तः: (dhatu_wx) => /l$/.test(dhatu_wx),
  वकारान्तः: (dhatu_wx) => /v$/.test(dhatu_wx),
  शकारान्तः: (dhatu_wx) => /S$/.test(dhatu_wx),
  षकारान्तः: (dhatu_wx) => /R$/.test(dhatu_wx),
  सकारान्तः: (dhatu_wx) => /s$/.test(dhatu_wx),
  हकारान्तः: (dhatu_wx) => /h$/.test(dhatu_wx),
};

export const featureFilters: Filters = {
  ...upadeshaFilters,
  ...adiFilters,
  ...antaFilters,
};
