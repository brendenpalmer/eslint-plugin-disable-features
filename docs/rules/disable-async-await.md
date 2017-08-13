# Disables async / await (disable-async-await)

Depending on which browsers your application supports, it may not make sense to allow async / await in production code due to the additional costs of transpilation, polyfills, execution time, etc.

## Rule Details

Examples of **incorrect** code for this rule:

```js

async function test() {}

```

Examples of **correct** code for this rule:

```js

function test() {}

```

## When Not To Use It

If you want to allow async / await in your codebase then do not enable this rule.
