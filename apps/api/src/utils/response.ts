export const generatePaginatedResponse = <TData>(
  data: TData[],
  nextCursor: number | null,
  page: number,
) => ({
  data,
  nextCursor,
  page,
  total: data.length,
});
