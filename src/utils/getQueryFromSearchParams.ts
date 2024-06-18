"use client";
import type { Query } from "@/utils/types";

export function getQueryFromSearchParams(searchParams: URLSearchParams) {
  const query: Query = {};

  for (const [key, value] of searchParams.entries()) {
    if (!value) {
      continue;
    }

    if (!Object.keys(query).includes(key)) {
      query[key] = value;
      continue;
    }

    const firstValue = query[key];

    if (Array.isArray(firstValue)) {
      query[key] = firstValue.concat(value);
      continue;
    }

    query[key] = [firstValue, value];
  }

  return query;
}
