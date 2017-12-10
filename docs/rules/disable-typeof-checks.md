# Disables typeof checks (disable-typeof-checks)

## Rule Details

Examples of **incorrect** code for this rule (if disabling `number`):

```js
const test = 5;

if (typeof test === 'number') {
}
```

Examples of **correct** code for this rule (if disabling `number`):

```js
const test = 'test';

if (typeof test === 'string') {
}
```

## When Not To Use It

If you want to allow all typeof checks in your codebase then do not enable this
rule.

## `.eslintrc.js` config example

```js
module.exports = {
  plugins: ['disable-features'],
  rules: {
    'disable-features/disable-typeof-checks': [
      'error',
      {
        types: ['number', 'string'],
      },
    ],
  },
};
```

Note that the types to disable are optional and if excluded all typeof checks
will be disabled.

For instance, the following would disable all typeof checks:

```js
module.exports = {
  plugins: ['disable-features'],
  rules: {
    'disable-features/disable-typeof-checks': 'error',
  },
};
```
