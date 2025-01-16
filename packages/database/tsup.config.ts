import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/schema.ts"],
  splitting: false,
  clean: true,
  dts: true,
  format: ["cjs", "esm"],
  minify: true,
  treeshake: true,
  outDir: "dist",
});
