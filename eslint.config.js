import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import react from 'eslint-plugin-react'

export default tseslint.config(
  { ignores: ['dist', 'vite.config.ts'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier: eslintPluginPrettier,
      react
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'react/react-in-jsx-scope': 'off',
      'react/jsx-no-target-blank': 'warn',
      'no-console': 'warn',
      'no-debugger': 'warn',
      'prettier/prettier': [
        'warn',
        {
          semi: false,
          singleQuote: true,
          jsxSingleQuote: true,
          trailingComma: 'none',
          printWidth: 120,
          tabWidth: 2,
          endOfLine: 'auto'
        }
      ]
    }
  }
)
