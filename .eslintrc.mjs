import globals from "globals";
import pluginJs from "@eslint/js";
import pluginVue from "eslint-plugin-vue";

export default {
  overrides: [
    // Optional: Define overrides for specific file types
    {
      files: ["**/*.{js,mjs,cjs,vue}"],
      languageOptions: { globals: { ...globals.browser, ...globals.node } },
      extends: [
        "eslint:recommended",
        "plugin:js/recommended", // Use recommended rules from @eslint/js
        "plugin:vue/essential", // Use essential rules from eslint-plugin-vue
      ],
      // Add any additional rules specific to your project here
    },
  ],
  overrideConfig: {
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
  },
  pluginJs: {
    configs: {
      recommended,
    },
  },
  ...pluginVue.configs["flat/essential"],
};
