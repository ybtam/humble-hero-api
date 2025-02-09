import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import perfectionist from 'eslint-plugin-perfectionist'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {languageOptions: { globals: globals.node }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  perfectionist.configs['recommended-natural'],
  eslintPluginPrettierRecommended,
];
