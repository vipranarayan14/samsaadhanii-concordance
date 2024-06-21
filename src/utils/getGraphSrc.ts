import { ENDPOINTS } from "@/utils/endpoints";

export function getGraphSrc(graphURL: string) {
  return `${ENDPOINTS.GRAPH}${graphURL}`;
}
