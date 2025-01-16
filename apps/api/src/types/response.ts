export type GetAllResponse<T> = {
  data: T[];
  nextCursor: number | null;
  page: number;
  total: number;
};
