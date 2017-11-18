import { RuleTester } from 'eslint';
import rule from '../../../src/rules/disable-typeof-checks';

const NUMBER_ERROR_MESSAGE = 'Using number typeof expressions are disabled.';
const STRING_ERROR_MESSAGE = 'Using string typeof expressions are disabled.';
const FUNCTION_ERROR_MESSAGE =
  'Using function typeof expressions are disabled.';

const ruleTester = new RuleTester();

ruleTester.run('disable-typeof', rule, {
  valid: [
    {
      parser: 'babel-eslint',
      code: `if (typeof t === 'string') {}`,
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
  ],

  invalid: [
    {
      parser: 'babel-eslint',
      code: `const test = typeof t === 'number';`,
      options: [{ types: ['number'] }],
      errors: [NUMBER_ERROR_MESSAGE],
    },

    {
      parser: 'babel-eslint',
      code: `if (typeof t === 'number') {}`,
      options: [{ types: ['number'] }],
      errors: [NUMBER_ERROR_MESSAGE],
    },

    {
      parser: 'babel-eslint',
      code: `if (typeof t === 'number' || typeof t === 'string') {}`,
      options: [{ types: ['string'] }],
      errors: [STRING_ERROR_MESSAGE],
    },

    {
      parser: 'babel-eslint',
      code: `if (typeof t === 'number' || typeof t === 'string' || 'string' === typeof t) {}`,
      options: [{ types: ['number', 'string'] }],
      errors: [
        NUMBER_ERROR_MESSAGE,
        STRING_ERROR_MESSAGE,
        STRING_ERROR_MESSAGE,
      ],
    },

    {
      parser: 'babel-eslint',
      code: `if (typeof t === 'string') {}`,
      options: [{ types: ['number', 'string'] }],
      errors: [STRING_ERROR_MESSAGE],
    },

    {
      parser: 'babel-eslint',
      code: `
        const t = typeof 5;
        if (t === 'number') {}
      `,
      options: [{ types: ['number'] }],
      errors: [NUMBER_ERROR_MESSAGE],
    },

    {
      parser: 'babel-eslint',
      code: `
        const t = typeof 5;
        if (t === 'number' || typeof '' === 'string') {}
      `,
      options: [{ types: ['number', 'string'] }],
      errors: [NUMBER_ERROR_MESSAGE, STRING_ERROR_MESSAGE],
    },

    {
      parser: 'babel-eslint',
      code: `
        const t = typeof 5;
        if ('number' === t) {}
      `,
      options: [{ types: ['number'] }],
      errors: [NUMBER_ERROR_MESSAGE],
    },

    {
      parser: 'babel-eslint',
      code: `
        const t = typeof 5;
        const test = typeof '' === 'string';
        if ('number' === t || test) {}
      `,
      options: [{ types: ['number', 'string'] }],
      errors: [STRING_ERROR_MESSAGE, NUMBER_ERROR_MESSAGE],
    },

    {
      parser: 'babel-eslint',
      code: `
        function test() {
          if (typeof test === 'function') {}
        }
      `,
      options: [{ types: ['object', 'string', 'number', 'function'] }],
      errors: [FUNCTION_ERROR_MESSAGE],
    },

    {
      parser: 'babel-eslint',
      code: `
        function test() {
          if (true) {}
        }

        if (typeof test === 'function') {}
      `,
      options: [{ types: ['object', 'string', 'number', 'function'] }],
      errors: [FUNCTION_ERROR_MESSAGE],
    },

    {
      parser: 'babel-eslint',
      code: `
        const obj = { a: '' };
        const t = typeof obj.a;
        if (t === 'number') {}
      `,
      options: [{ types: ['number'] }],
      errors: [NUMBER_ERROR_MESSAGE],
    },

    {
      parser: 'babel-eslint',
      code: `
        const obj = { a: '' };
        const t = typeof obj['a'];
        if (t === 'number') {}
      `,
      options: [{ types: ['number'] }],
      errors: [NUMBER_ERROR_MESSAGE],
    },

    {
      parser: 'babel-eslint',
      code: `
        const obj = { a: '' };
        if (typeof obj['a'] === 'number') {}
      `,
      options: [{ types: ['number'] }],
      errors: [NUMBER_ERROR_MESSAGE],
    },

    {
      parser: 'babel-eslint',
      code: `
        const obj = { a: '' };
        if ('number' === typeof obj['a']) {}
      `,
      options: [{ types: ['number'] }],
      errors: [NUMBER_ERROR_MESSAGE],
    },
  ],
});
