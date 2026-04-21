import { defineConfig } from "cypress";

export default defineConfig({
  experimentalStudio: true,
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },

  
});
