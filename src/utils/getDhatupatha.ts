import useSWR from "swr";

import { DhatuDetails } from "./types";
import { fetcher } from "./utils";

const dhatupathaPath = "/dhatupatha.json";

type Response = {
  dhatupatha: DhatuDetails[];
  isLoading: boolean;
  isError: boolean;
};

export function getDhatupatha(): Response {
  const { data, error, isLoading } = useSWR(dhatupathaPath, fetcher);

  return {
    dhatupatha: data,
    isLoading,
    isError: error,
  };
}
