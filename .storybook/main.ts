// Storybook main configuration
// Configures Storybook to work with TypeScript and React
import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-docs"],

  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  async viteFinal(config) {
    // Ensure PostCSS and Tailwind are processed
    return config;
  }
};

export default config;

