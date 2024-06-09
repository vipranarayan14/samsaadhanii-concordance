import { ENDPOINTS } from "./endpoints";

export function getGraphSrc(graphURL: string) {
  return `${ENDPOINTS.GRAPH}${graphURL}`;
}
