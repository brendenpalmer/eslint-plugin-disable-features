import { RuleTester } from 'eslint';
import { getErrorMessage } from '../../src/utils/disable-typeof-checks-util';
import rule from '../../src/rules/disable-typeof-checks';

const NUMBER_ERROR_MESSAGE = getErrorMessage('number');
const STRING_ERROR_MESSAGE = getErrorMessage('string');
const FUNCTION_ERROR_MESSAGE = getErrorMessage('function');

const ruleTester = new RuleTester();

function testCodeWithAndWithoutTypes(
  code,
  types,
  errors = [],
  allErrors = [],
  options = [{ types }]
) {
  return [
    {
      parser: 'babel-eslint',
      code,
      options,
      errors,
    },

    {
      parser: 'babel-eslint',
      code,
      options: [{ message: options[0].message }],
      errors: allErrors.length ? allErrors : errors,
    },
  ];
}

ruleTester.run('disable-typeof', rule, {
  valid: [
    {
      parser: 'babel-eslint',
      code: `if (typeof t === 'string') {}`,
      options: [{ types: ['number'] }],
    },

    {
      parser: 'babel-eslint',
      code: `if (typeof t !== 'string') {}`,
      options: [{ types: ['number'] }],
    },

    {
      parser: 'babel-eslint',
      code: `if (typeof t == 'string') {}`,
      options: [{ types: ['number'] }],
    },

    {
      parser: 'babel-eslint',
      code: `if (typeof t != 'string') {}`,
      options: [{ types: ['number'] }],
    },

    {
      parser: 'babel-eslint',
      code: `if (typeof t === 'function') {}`,
      options: [{ types: ['number'] }],
    },

    {
      parser: 'babel-eslint',
      code: `if (typeof t === 'object') {}`,
      options: [{ types: ['number'] }],
    },

    {
      parser: 'babel-eslint',
      code: `const test = typeof t === 'function';`,
      options: [{ types: ['number'] }],
    },

    {
      parser: 'babel-eslint',
      code: `if (typeof t === 'number' || typeof t === 'string') {}`,
      options: [{ types: ['object'] }],
    },

    {
      parser: 'babel-eslint',
      code: `
        const t = typeof '';
        if (t === 'string') {}
      `,
      options: [{ types: ['number'] }],
    },

    {
      parser: 'babel-eslint',
      code: `if (typeof t === 'number' || typeof t === 'string' || 'string' === typeof t) {}`,
      options: [{ types: ['object'] }],
    },

    {
      parser: 'babel-eslint',
      code: `
        function test() {
          if (test) {}
        }
      `,
      options: [{ types: ['object', 'string', 'number', 'function'] }],
    },

    {
      parser: 'babel-eslint',
      code: `
        const obj = { a: '' };
        const t = typeof obj.a;
        if (t === 'string') {}
      `,
      options: [{ types: ['number'] }],
    },

    {
      parser: 'babel-eslint',
      code: `
        const obj = { a: '' };
        const t = typeof obj['a'];
        if (t === 'string') {}
      `,
      options: [{ types: ['number'] }],
    },

    {
      parser: 'babel-eslint',
      code: `
        const obj = { a: '' };
        if (typeof obj['a'] === 'number') {}
      `,
      options: [{ types: ['string'] }],
    },

    {
      parser: 'babel-eslint',
      code: `
        const obj = { a: '' };
        if ('number' === typeof obj['a']) {}
      `,
      options: [{ types: ['string'] }],
    },

    {
      parser: 'babel-eslint',
      code: `
        import test from './t';
        const check = typeof test === 'number';
      `,
      options: [{ types: ['string'] }],
    },
  ],

  invalid: [
    ...testCodeWithAndWithoutTypes(
      `const test = typeof t === 'number';`,
      ['number'],
      [NUMBER_ERROR_MESSAGE]
    ),

    ...testCodeWithAndWithoutTypes(
      `const test = typeof t !== 'number';`,
      ['number'],
      [NUMBER_ERROR_MESSAGE]
    ),

    ...testCodeWithAndWithoutTypes(
      `const test = typeof t == 'number';`,
      ['number'],
      [NUMBER_ERROR_MESSAGE]
    ),

    ...testCodeWithAndWithoutTypes(
      `const test = typeof t != 'number';`,
      ['number'],
      [NUMBER_ERROR_MESSAGE]
    ),

    ...testCodeWithAndWithoutTypes(
      `
        const num = 'number';
        const test = typeof t === num;
      `,
      ['number'],
      [NUMBER_ERROR_MESSAGE]
    ),

    ...testCodeWithAndWithoutTypes(
      `if (typeof t === 'number') {}`,
      ['number'],
      [NUMBER_ERROR_MESSAGE]
    ),

    ...testCodeWithAndWithoutTypes(
      `if (typeof t === 'number' || typeof t === 'string') {}`,
      ['string'],
      [STRING_ERROR_MESSAGE],
      [NUMBER_ERROR_MESSAGE, STRING_ERROR_MESSAGE]
    ),

    ...testCodeWithAndWithoutTypes(
      `if (typeof t === 'number' || typeof t === 'string' || 'string' === typeof t) {}`,
      ['number', 'string'],
      [NUMBER_ERROR_MESSAGE, STRING_ERROR_MESSAGE, STRING_ERROR_MESSAGE]
    ),

    ...testCodeWithAndWithoutTypes(
      `if (typeof t === 'string') {}`,
      ['number', 'string'],
      [STRING_ERROR_MESSAGE]
    ),

    ...testCodeWithAndWithoutTypes(
      `
        const t = typeof 5;
        if (t === 'number') {}
      `,
      ['number'],
      [NUMBER_ERROR_MESSAGE]
    ),

    ...testCodeWithAndWithoutTypes(
      `
        const t = typeof 5;
        if (t === 'number' || typeof '' === 'string') {}
      `,
      ['number', 'string'],
      [NUMBER_ERROR_MESSAGE, STRING_ERROR_MESSAGE]
    ),

    ...testCodeWithAndWithoutTypes(
      `
        const t = typeof 5;
        if ('number' === t) {}
      `,
      ['number'],
      [NUMBER_ERROR_MESSAGE]
    ),

    ...testCodeWithAndWithoutTypes(
      `const t = typeof 5 === 'number' ? '' : '';`,
      ['number'],
      [NUMBER_ERROR_MESSAGE]
    ),

    ...testCodeWithAndWithoutTypes(
      `
        const t = typeof 5;
        const test = typeof '' === 'string';
        if ('number' === t || test) {}
      `,
      ['number', 'string'],
      [NUMBER_ERROR_MESSAGE, STRING_ERROR_MESSAGE]
    ),

    ...testCodeWithAndWithoutTypes(
      `
        function test() {
          if (typeof test === 'function') {}
        }
      `,
      ['object', 'string', 'number', 'function'],
      [FUNCTION_ERROR_MESSAGE]
    ),

    ...testCodeWithAndWithoutTypes(
      `
        function test() {
          if (true) {}
        }

        if (typeof test === 'function') {}
      `,
      ['object', 'string', 'number', 'function'],
      [FUNCTION_ERROR_MESSAGE]
    ),

    ...testCodeWithAndWithoutTypes(
      `
        const obj = { a: '' };
        const t = typeof obj.a;
        if (t === 'number') {}
      `,
      ['number'],
      [NUMBER_ERROR_MESSAGE]
    ),

    ...testCodeWithAndWithoutTypes(
      `
        const obj = { a: '' };
        const t = typeof obj['a'];
        if (t === 'number') {}
      `,
      ['number'],
      [NUMBER_ERROR_MESSAGE]
    ),

    ...testCodeWithAndWithoutTypes(
      `
        const obj = { a: '' };
        if (typeof obj['a'] === 'number') {}
      `,
      ['number'],
      [NUMBER_ERROR_MESSAGE]
    ),

    ...testCodeWithAndWithoutTypes(
      `
        const obj = { a: '' };
        if ('number' === typeof obj['a']) {}
      `,
      ['number'],
      [NUMBER_ERROR_MESSAGE]
    ),

    ...testCodeWithAndWithoutTypes(
      `
        function test() {
          const check = typeof test;

          return () => {
            return check === "number";
          };
        }
      `,
      ['number'],
      [NUMBER_ERROR_MESSAGE]
    ),

    ...testCodeWithAndWithoutTypes(
      `
        import test from './t';
        const check = typeof test === 'number';
      `,
      ['number'],
      [NUMBER_ERROR_MESSAGE]
    ),

    ...testCodeWithAndWithoutTypes(
      `
        import test from './t';
        const check = typeof test === 'number';
      `,
      ['number'],
      ['Test error message'],
      [],
      [{ types: ['number'], message: 'Test error message' }]
    ),
  ],
});
