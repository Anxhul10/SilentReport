// @ts-check

import eslint from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import tseslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default defineConfig(
  globalIgnores(['node_modules/', 'dist/*']),
  eslint.configs.recommended,
  tseslint.configs.recommended,
  eslintPluginPrettierRecommended
);
