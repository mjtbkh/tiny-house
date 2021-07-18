module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['prettier', 'airbnb-typescript'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['prettier', '@typescript-eslint'],
  rules: {
    'prettier/prettier': 'error',
    semi: ['error', 'never'],
    'comma-dangle': ['error', 'never'],
    '@typescript-eslint/semi': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/comma-dangle': 'off',
    'no-unexpected-multiline': 'error',
    'import/extensions': 'off',
  },
}
