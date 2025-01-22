import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/server.ts"],
  noExternal: ["@repo"],
  splitting: false,
  clean: true,
  dts: true,
  bundle: true,
  sourcemap: true,
  minify: true,
  treeshake: true,
  outDir: "dist",
});
