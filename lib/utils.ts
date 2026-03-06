import type { PaginatedResponse } from "./types";

export function paginate<T>(
  items: T[],
  page: number = 1,
  pageSize: number = 20
): PaginatedResponse<T> {
  const total = items.length;
  const totalPages = Math.ceil(total / pageSize);
  const clampedPage = Math.max(1, Math.min(page, totalPages || 1));
  const start = (clampedPage - 1) * pageSize;
  const data = items.slice(start, start + pageSize);
  return {
    data,
    pagination: { page: clampedPage, pageSize, total, totalPages },
  };
}

export function getSearchParams(request: Request) {
  const url = new URL(request.url);
  return url.searchParams;
}

export function parseIntParam(
  params: URLSearchParams,
  key: string,
  defaultValue: number
): number {
  const value = params.get(key);
  if (!value) return defaultValue;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? defaultValue : parsed;
}
