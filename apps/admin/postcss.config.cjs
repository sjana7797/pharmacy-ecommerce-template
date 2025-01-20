const config = require("@repo/ui/postcss.config.cjs");

module.exports = {
  plugins: [...config.plugins, require("tailwindcss/nesting")],
};
