import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsparser from '@typescript-eslint/parser'
import vueParser from 'vue-eslint-parser'

export default [
  {
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-alert': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-undef': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
]

export default [
  js.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  {
    files: ['**/*.{js,mjs,cjs,ts,vue}'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      parser: vueParser,
      parserOptions: {
        parser: tsparser,
        ecmaVersion: 2021,
        sourceType: 'module'
      },
      globals: {
        browser: true,
        node: true,
        es2021: true
      }
    },
    plugins: {
      '@typescript-eslint': tseslint,
      vue: pluginVue
    },
    rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/require-default-prop': 'off',
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    'no-unused-vars': ['error', { 
    varsIgnorePattern: '^_',
    argsIgnorePattern: '^_',
    ignoreRestSiblings: true 
  }]
}
  },
  {
    ignores: ['dist/**', 'node_modules/**', '*.config.js', '*.config.ts']
  }
]