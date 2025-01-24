module.exports = {
  // Lint & format TypeScript and JavaScript files
  "**/*.(ts|tsx|js|jsx)": (filenames) => [
    `eslint --fix ${filenames.join(" ")}`,
    `prettier --write ${filenames.join(" ")}`,
    `tsc --noEmit`,
  ],

  // Format other files
  "**/*.(md|json|css|scss|less)": (filenames) =>
    `prettier --write ${filenames.join(" ")}`,
};
