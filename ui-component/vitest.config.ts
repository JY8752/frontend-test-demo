import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [vue()],
	test: {
		environmentMatchGlobs: [["src/components/**/*.test.ts", "happy-dom"]],
		setupFiles: ["vitest.setup.ts"],
		globals: true
	},
});
