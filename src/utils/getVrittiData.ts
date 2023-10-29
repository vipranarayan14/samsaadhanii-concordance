import sanitize from "sanitize-html";

import { ENDPOINTS } from "@/utils/endpoints";

export async function getVrittiData(vrittiCode: string, vrittiId: string) {
  const vrittiURL = `${ENDPOINTS.VRITTI}/${vrittiCode}${vrittiId}.html`;

  // console.log(vrittiURL); FIXME: why logged multiple times?

  const result = await fetch(vrittiURL);

  const content = await result.text();

  const sanitized = sanitize(content, {
    allowedAttributes: { "*": ["style"] },
  });

  return sanitized;
}
