export type StrictOmit<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: T[P];
};

export type StrictPick<T, K extends keyof T> = Pick<T, K> & {
  [P in Exclude<keyof T, K>]?: never;
};

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};
