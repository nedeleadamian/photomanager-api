const IMPORT_PLUGINS = ['import'];

const IMPORT_RULES = {
  'import/prefer-default-export': 'off',
  'import/no-cycle': 'off',
  'import/no-unused-modules': ['error'],
  'import/no-unresolved': 'off',
  'import/order': [
    'error',
    {
      pathGroups: [
        {
          pattern: '@nestjs/**',
          group: 'builtin',
          position: 'before',
        },
        {
          pattern: '@*/**',
          group: 'builtin',
          position: 'before',
        },
        {
          pattern: 'nestjs-**',
          group: 'builtin',
          position: 'before',
        },
      ],
      pathGroupsExcludedImportTypes: ['builtin'],
      groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
      warnOnUnassignedImports: true,
    },
  ],
};

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    sourceType: 'module',
  },
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  plugins: ['@typescript-eslint/eslint-plugin', ...IMPORT_PLUGINS],
  root: true,
  env: {
    node: true,
    es6: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: Object.assign(
      {
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/require-await': 'error',
        quotes: [
          'error',
          'single',
          {
            allowTemplateLiterals: true,
            avoidEscape: true,
          },
        ],
      },
      IMPORT_RULES,
  ),
};
