const DEFAULT_ERROR_MESSAGE = 'Using generator functions are disabled.';

function handleErrorForContext(context, message = DEFAULT_ERROR_MESSAGE) {
  return function handleErrorForGeneratorNode(node) {
    if (node.generator) {
      context.report({
        node,
        message,
      });
    }
  };
}

export default {
  meta: {
    docs: {
      description: 'Disables generator functions',
      category: 'Possible Errors',
      recommended: false,
    },
  },

  create(context) {
    return {
      FunctionExpression: handleErrorForContext(context),
      AsyncFunctionExpression: handleErrorForContext(context),
      FunctionDeclaration: handleErrorForContext(context),
    };
  },
};
