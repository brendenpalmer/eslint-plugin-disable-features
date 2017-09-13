'use strict';

const rule = require('../../../lib/rules/disable-async-await');
const {
  RuleTester
} = require('eslint');
const DEFAULT_ERROR_MESSAGE = 'Using async / await is disabled.';

const ruleTester = new RuleTester();

ruleTester.run('disable-async-await', rule, {
  valid: [{
      parser: 'babel-eslint',
      code: 'function test() {}'
    },

    {
      parser: 'babel-eslint',
      code: 'const test = function() {};'
    },

    {
      code: '() => {}',
      parser: 'babel-eslint'
    },

    {
      code: 'const test = () => {};',
      parser: 'babel-eslint'
    },

    {
      parser: 'babel-eslint',
      code: `
        const test = {
          test() {}
        };
      `
    }
  ],

  invalid: [{
      code: 'async function test() {}',
      parser: 'babel-eslint',
      errors: [DEFAULT_ERROR_MESSAGE]
    },

    {
      code: 'const test = async function() {};',
      parser: 'babel-eslint',
      errors: [DEFAULT_ERROR_MESSAGE]
    },

    {
      code: 'async () => {}',
      parser: 'babel-eslint',
      errors: [DEFAULT_ERROR_MESSAGE]
    },

    {
      code: 'const test = async () => {};',
      parser: 'babel-eslint',
      errors: [DEFAULT_ERROR_MESSAGE]
    },

    {
      code: `
        const test = {
          async test() {}
        };
      `,
      parser: 'babel-eslint',
      errors: [DEFAULT_ERROR_MESSAGE]
    }
  ]
});
