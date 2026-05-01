import { defineConfig, globalIgnores } from 'eslint/config';
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import tanstackQuery from '@tanstack/eslint-plugin-query';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

export default defineConfig([
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
  js.configs.recommended,
  ...tseslint.configs.strict,
  ...nextVitals,
  ...nextTs,
  eslintConfigPrettier,

  // Global language options
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    settings: {
      'import/resolver': {
        typescript: true,
      },
    },
  },

  // TypeScript + import + style rules
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    rules: {
      /* TypeScript */
      '@typescript-eslint/no-unused-vars': [
        'error',
        { varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'variable',
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        },
        {
          selector: 'function',
          format: ['camelCase', 'PascalCase'],
        },
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
      ],

      /* import */
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          pathGroups: [
            {
              pattern: '@/**',
              group: 'internal',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          alphabetize: { order: 'asc', caseInsensitive: true },
          'newlines-between': 'never',
        },
      ],
      'import/no-unresolved': 'off',
      'import/no-duplicates': 'error',
      'import/newline-after-import': 'warn',

      /* style */
      curly: ['error', 'all'],
      'prefer-destructuring': [
        'warn',
        {
          VariableDeclarator: {
            object: true,
            array: false,
          },
        },
      ],
      eqeqeq: 'error',
      'no-var': 'error',
      'no-console': 'warn',
      'no-debugger': 'warn',
    },
  },

  // React + hooks + a11y rules
  {
    files: ['**/*.{tsx,jsx}'],
    rules: {
      /* React */
      'react/jsx-pascal-case': 'error',
      'react/self-closing-comp': 'warn',
      'react/no-unknown-property': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react/prop-types': 'off',
      'react/jsx-key': 'error',
      'react/jsx-no-useless-fragment': 'warn',
      'react/jsx-no-constructed-context-values': 'warn',
      'react/jsx-boolean-value': ['warn', 'never'],

      /* Hooks */
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      /* Accessibility */
      'jsx-a11y/alt-text': ['warn', { elements: ['img'] }],
      'jsx-a11y/aria-props': 'warn',
      'jsx-a11y/aria-proptypes': 'warn',
      'jsx-a11y/aria-unsupported-elements': 'warn',
      'jsx-a11y/role-has-required-aria-props': 'warn',
      'jsx-a11y/role-supports-aria-props': 'warn',
    },
  },

  // TanStack Query
  ...tanstackQuery.configs['flat/recommended'],
]);
