# Disables instanceof checks (disable-instanceof-checks)

## Rule Details

Examples of **incorrect** code for this rule (if disabling `Number`):

```js
const test = 5;

if (test instanceof Number) {
}
```

Examples of **correct** code for this rule (if disabling `Number`):

```js
const test = 'test';

if (test instanceof String) {
}
```

## When Not To Use It

If you want to allow all instanceof checks in your codebase then do not enable this
rule.

## `.eslintrc.js` config example

```js
module.exports = {
  plugins: ['disable-features'],
  rules: {
    'disable-features/disable-instanceof-checks': [
      'error',
      {
        types: ['Number', 'String'],
      },
    ],
  },
};
```

Note that the types to disable are optional and if excluded all instanceof checks
will be disabled.

For instance, the following would disable all instanceof checks:

```js
module.exports = {
  plugins: ['disable-features'],
  rules: {
    'disable-features/disable-instanceof-checks': 'error',
  },
};
```
