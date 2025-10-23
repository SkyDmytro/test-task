import storybook from 'eslint-plugin-storybook';

import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
      prettierConfig,
    ],
    plugins: {
      react: react,
      '@typescript-eslint': tseslint.plugin,
      'jsx-a11y': jsxA11y,
      prettier: prettierPlugin,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: tseslint.parser,
      parserOptions: {
        project: ['./tsconfig.json', './tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      'prettier/prettier': 'error',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react-hooks/exhaustive-deps': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ['**/*.stories.{ts,tsx}', '.storybook/*.ts', '.storybook/*.js'], // Include Storybook config files
    extends: [],
    plugins: {
      storybook: storybook,
      '@typescript-eslint': tseslint.plugin, // Need to include this for Storybook files too
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: tseslint.parser,
      parserOptions: {
        project: ['./.storybook/tsconfig.json'], // Use specific tsconfig for Storybook
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      ...storybook.configs.recommended.rules,
      // Add any specific Storybook rules here if needed
    },
  },
]);
