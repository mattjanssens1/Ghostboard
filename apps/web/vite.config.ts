import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
 resolve: {
  alias: {
   "@ghostboard/board-model": fileURLToPath(new URL("../../packages/board-model/src/index.ts", import.meta.url)),
   "@ghostboard/shared": fileURLToPath(new URL("../../packages/shared/src/index.ts", import.meta.url))
  }
 }
});
