import type { Query } from "@/utils/types";

export const createURLSearchString = (
  query: Query,
  searchParams: URLSearchParams
) => {
  // const params = new URLSearchParams(searchParams);
  const params = new URLSearchParams("");

  for (const [name, value] of Object.entries(query)) {
    if (value) {
      if (Array.isArray(value)) {
        params.delete(name);

        for (const item of value) {
          params.append(name, item);
        }
      } else {
        params.set(name, value);
      }
    } else {
      params.delete(name);
    }
  }

  return params.toString();
};
