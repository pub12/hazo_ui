// Build configuration for hazo_ui component library
// Uses tsup for fast, tree-shakeable builds with ESM and CJS support
import { defineConfig } from "tsup";
import { copyFileSync, readFileSync, writeFileSync } from "fs";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  external: ["react", "react-dom"],
  outDir: "dist",
  banner: {
    js: '"use client";',
  },
  onSuccess: async () => {
    // Copy CSS file to dist folder
    copyFileSync("src/styles/hazo-ui.css", "dist/styles.css");
    console.log("✓ Copied styles.css to dist/");

    // Manually prepend "use client" directive to ESM and CJS outputs
    // tsup's banner is ignored when bundling, so we add it post-build
    const files = ["dist/index.js", "dist/index.cjs"];
    for (const file of files) {
      const content = readFileSync(file, "utf-8");
      if (!content.startsWith('"use client"')) {
        writeFileSync(file, '"use client";\n' + content);
        console.log(`✓ Added "use client" directive to ${file}`);
      }
    }
  },
});

