import { RuleTester } from 'eslint';
import { getErrorMessage } from '../../src/utils/disable-instanceof-checks-util';
import rule from '../../src/rules/disable-instanceof-checks';

const NUMBER_ERROR_MESSAGE = getErrorMessage('Number');
const STRING_ERROR_MESSAGE = getErrorMessage('String');
const FUNCTION_ERROR_MESSAGE = getErrorMessage('Function');

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

ruleTester.run('disable-instanceof-checks', rule, {
  valid: [
    {
      parser: 'babel-eslint',
      code: `if (t instanceof String) {}`,
      options: [{ types: ['Number'] }],
    },

    {
      parser: 'babel-eslint',
      code: `if (!(t instanceof String)) {}`,
      options: [{ types: ['Number'] }],
    },

    {
      parser: 'babel-eslint',
      code: `if (t instanceof Function) {}`,
      options: [{ types: ['Number'] }],
    },

    {
      parser: 'babel-eslint',
      code: `if (t instanceof Object) {}`,
      options: [{ types: ['Number'] }],
    },

    {
      parser: 'babel-eslint',
      code: `const test = t instanceof Function;`,
      options: [{ types: ['Number'] }],
    },

    {
      parser: 'babel-eslint',
      code: `if (t instanceof Number || t instanceof String) {}`,
      options: [{ types: ['Object'] }],
    },

    {
      parser: 'babel-eslint',
      code: `
        function test() {
          if (test) {}
        }
      `,
      options: [{ types: ['Object', 'String', 'Number', 'Function'] }],
    },

    {
      parser: 'babel-eslint',
      code: `
        const obj = { a: '' };
        const t = obj.a;
        if (t instanceof String) {}
      `,
      options: [{ types: ['Number'] }],
    },

    {
      parser: 'babel-eslint',
      code: `
        const obj = { a: '' };
        const t = obj['a'];
        if (t instanceof String) {}
      `,
      options: [{ types: ['Number'] }],
    },

    {
      parser: 'babel-eslint',
      code: `
        const obj = { a: '' };
        if (obj['a'] instanceof Number) {}
      `,
      options: [{ types: ['String'] }],
    },

    {
      parser: 'babel-eslint',
      code: `
        import test from './t';
        const check = test instanceof Number;
      `,
      options: [{ types: ['String'] }],
    },
  ],

  invalid: [
    ...testCodeWithAndWithoutTypes(
      `const test = t instanceof Number;`,
      ['Number'],
      [NUMBER_ERROR_MESSAGE]
    ),

    ...testCodeWithAndWithoutTypes(
      `const test = !(t instanceof Number);`,
      ['Number'],
      [NUMBER_ERROR_MESSAGE]
    ),

    ...testCodeWithAndWithoutTypes(
      `const test = t instanceof Number === true;`,
      ['Number'],
      [NUMBER_ERROR_MESSAGE]
    ),

    ...testCodeWithAndWithoutTypes(
      `const test = t instanceof Number === false;`,
      ['Number'],
      [NUMBER_ERROR_MESSAGE]
    ),

    ...testCodeWithAndWithoutTypes(
      `const test = t instanceof Number == true;`,
      ['Number'],
      [NUMBER_ERROR_MESSAGE]
    ),

    ...testCodeWithAndWithoutTypes(
      `const test = t instanceof Number != true;`,
      ['Number'],
      [NUMBER_ERROR_MESSAGE]
    ),

    ...testCodeWithAndWithoutTypes(
      `
        const num = 'Number';
        const test = num instanceof Number;
      `,
      ['Number'],
      [NUMBER_ERROR_MESSAGE]
    ),

    ...testCodeWithAndWithoutTypes(
      `if (t instanceof Number) {}`,
      ['Number'],
      [NUMBER_ERROR_MESSAGE]
    ),

    ...testCodeWithAndWithoutTypes(
      `if (t instanceof Number || t instanceof String) {}`,
      ['String'],
      [STRING_ERROR_MESSAGE],
      [NUMBER_ERROR_MESSAGE, STRING_ERROR_MESSAGE]
    ),

    ...testCodeWithAndWithoutTypes(
      `if (t instanceof Number || t instanceof String) {}`,
      ['Number', 'String'],
      [NUMBER_ERROR_MESSAGE, STRING_ERROR_MESSAGE]
    ),

    ...testCodeWithAndWithoutTypes(
      `if (t instanceof String) {}`,
      ['String'],
      [STRING_ERROR_MESSAGE]
    ),

    ...testCodeWithAndWithoutTypes(
      `
        const t = 5 instanceof Number;
        if (t) {}
      `,
      ['Number'],
      [NUMBER_ERROR_MESSAGE]
    ),

    ...testCodeWithAndWithoutTypes(
      `const t = 5 instanceof Number ? '' : '';`,
      ['Number'],
      [NUMBER_ERROR_MESSAGE]
    ),

    ...testCodeWithAndWithoutTypes(
      `
        const t = 5;
        const test = t instanceof String;
        if (t || test) {}
      `,
      ['Number', 'String'],
      [STRING_ERROR_MESSAGE]
    ),

    ...testCodeWithAndWithoutTypes(
      `
        function test() {
          if (test instanceof Function) {}
        }
      `,
      ['Object', 'String', 'Number', 'Function'],
      [FUNCTION_ERROR_MESSAGE]
    ),

    ...testCodeWithAndWithoutTypes(
      `
        function test() {
          if (true) {}
        }

        if (test instanceof Function) {}
      `,
      ['Object', 'String', 'Number', 'Function'],
      [FUNCTION_ERROR_MESSAGE]
    ),

    ...testCodeWithAndWithoutTypes(
      `
        const obj = { a: '' };
        const t = obj.a;
        if (t instanceof Number) {}
      `,
      ['Number'],
      [NUMBER_ERROR_MESSAGE]
    ),

    ...testCodeWithAndWithoutTypes(
      `
        const obj = { a: '' };
        const t = obj['a'];
        if (t instanceof Number) {}
      `,
      ['Number'],
      [NUMBER_ERROR_MESSAGE]
    ),

    ...testCodeWithAndWithoutTypes(
      `
        const obj = { a: '' };
        if (obj['a'] instanceof Number) {}
      `,
      ['Number'],
      [NUMBER_ERROR_MESSAGE]
    ),

    ...testCodeWithAndWithoutTypes(
      `
        import test from './t';
        const check = test instanceof Number;
      `,
      ['Number'],
      [NUMBER_ERROR_MESSAGE]
    ),

    ...testCodeWithAndWithoutTypes(
      `
        import test from './t';
        const check = test instanceof Number;
      `,
      ['Number'],
      ['Test error message'],
      [],
      [{ types: ['Number'], message: 'Test error message' }]
    ),
  ],
});
