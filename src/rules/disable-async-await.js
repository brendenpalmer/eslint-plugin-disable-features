const DEFAULT_ERROR_MESSAGE = 'Using async / await is disabled.';

function handleErrorForContext(context, message = DEFAULT_ERROR_MESSAGE) {
  return function handleErrorForAsyncNode(node) {
    if (node.async) {
      context.report({
        node,
        message,
      });
    }
  };
}

module.exports = {
  meta: {
    docs: {
      description: 'Disables async / await',
      category: 'Possible Errors',
      recommended: false,
    },
  },

  create(context) {
    return {
      ArrowFunctionExpression: handleErrorForContext(context),
      FunctionExpression: handleErrorForContext(context),
      AsyncFunctionExpression: handleErrorForContext(context),
      FunctionDeclaration: handleErrorForContext(context),
    };
  },
};
