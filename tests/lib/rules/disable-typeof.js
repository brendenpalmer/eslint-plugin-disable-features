const rule = require('../../../src/rules/disable-typeof');
const { RuleTester } = require('eslint');

const NUMBER_ERROR_MESSAGE = 'Using number typeof expressions are disabled.';
const STRING_ERROR_MESSAGE = 'Using string typeof expressions are disabled.';

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
      code: `if (typeof t === 'number' || typeof t === 'string') {}`,
      options: [{ types: ['number', 'string'] }],
      errors: [NUMBER_ERROR_MESSAGE, STRING_ERROR_MESSAGE],
    },

    {
      parser: 'babel-eslint',
      code: `if (typeof t === 'string') {}`,
      options: [{ types: ['number', 'string'] }],
      errors: [STRING_ERROR_MESSAGE],
    },
  ],
});
