type NonUndefined<T> = {
  [K in keyof T]: T[K] extends undefined ? never : T[K];
};

export const removeUndefined = <T extends Record<string, any>>(
  obj: T,
): NonUndefined<T> => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value !== undefined),
  ) as NonUndefined<T>;
};
