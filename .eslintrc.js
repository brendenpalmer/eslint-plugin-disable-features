module.exports = {
  root: true,
  extends: ['airbnb/base', 'prettier'],
  parserOptions: { ecmaVersion: 8 },
  rules: {
    'no-prototype-builtins': 'off',
    'no-plusplus': 'off',
  },
};
