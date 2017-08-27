# Disables generator functions (disable-generator-functions)

## Rule Details

Examples of **incorrect** code for this rule:

```js

function* test() {}

```

Examples of **correct** code for this rule:

```js

function test() {}

```

## When Not To Use It

If you want to use generator functions in your codebase then do not enable this rule.
