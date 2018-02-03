module.exports = {
  root: true,
  extends: ['eslint:recommended', 'prettier'],
  parserOptions: { ecmaVersion: 8, sourceType: 'module' },
  env: {
    node: true,
    es6: true,
  },
  rules: {
    'no-prototype-builtins': 'off',
    'no-plusplus': 'off',
  },
};
