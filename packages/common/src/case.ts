/**
 * Converts a string to sentence case.
 * @param str
 * @returns string
 * @example toSentenceCase("helloWorld") // Hello world
 */
export function toSentenceCase(str: string) {
  return str.replace(/([A-Z])/g, " $1").trim();
}
