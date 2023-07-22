module.exports = {
  extends: [
    'prettier',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['simple-import-sort', '@typescript-eslint', 'unused-imports'],
  settings: {
    next: {
      rootDir: ['apps/*/', 'packages/*/'],
    },
  },
  ignorePatterns: ['.next/*', 'dist/*', 'out/*'],

  rules: {
    'react/jsx-key': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    '@typescript-eslint/no-var-requires': 'warn',
    'unused-imports/no-unused-imports': 'warn',
    'prefer-const': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
