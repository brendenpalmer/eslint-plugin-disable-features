import { RuleTester } from 'eslint';
import rule from '../../src/rules/disable-generator-functions';

const DEFAULT_ERROR_MESSAGE = 'Using generator functions are disabled.';

const ruleTester = new RuleTester();

ruleTester.run('disable-generator-functions', rule, {
  valid: [
    {
      parser: 'babel-eslint',
      code: 'function test() {}',
    },

    {
      parser: 'babel-eslint',
      code: 'const test = function() {};',
    },

    {
      parser: 'babel-eslint',
      code: `
        const test = {
          test() {}
        };
      `,
    },
  ],

  invalid: [
    {
      code: 'function* test() {}',
      parser: 'babel-eslint',
      errors: [DEFAULT_ERROR_MESSAGE],
    },

    {
      code: 'async function* test() {}',
      parser: 'babel-eslint',
      errors: [DEFAULT_ERROR_MESSAGE],
    },

    {
      code: 'const test = function*() {};',
      parser: 'babel-eslint',
      errors: [DEFAULT_ERROR_MESSAGE],
    },

    {
      code: `
        const test = {
          *test() {}
        };
      `,
      parser: 'babel-eslint',
      errors: [DEFAULT_ERROR_MESSAGE],
    },

    {
      code: `
        const test = {
          async *test() {}
        };
      `,
      parser: 'babel-eslint',
      errors: [DEFAULT_ERROR_MESSAGE],
    },
  ],
});
