import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist']),

  // Shared lint rules for JavaScript and JSX files
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
  },

  // Frontend: browser globals
  {
    files: ['src/**/*.{js,jsx}'],
    languageOptions: {
      globals: globals.browser,
    },
  },

  // Backend: Node.js globals
  {
    files: ['backend/**/*.js'],
    languageOptions: {
      globals: globals.node,
    },
  },
]);