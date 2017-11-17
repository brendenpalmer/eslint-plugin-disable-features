const rule = require('../../../src/rules/disable-typeof');
const { RuleTester } = require('eslint');

const DEFAULT_ERROR_MESSAGE = 'Using number typeof expressions are disabled.';

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
  ],

  invalid: [
    {
      parser: 'babel-eslint',
      code: `const test = typeof t === 'number';`,
      options: [{ types: ['number'] }],
      errors: [DEFAULT_ERROR_MESSAGE],
    },

    {
      parser: 'babel-eslint',
      code: `if (typeof t === 'number') {}`,
      options: [{ types: ['number'] }],
      errors: [DEFAULT_ERROR_MESSAGE],
    },
  ],
});
