import { getConfigFromContext } from '../utils/config-util';

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
    const { message } = getConfigFromContext(context);

    return {
      FunctionExpression: handleErrorForContext(context, message),
      AsyncFunctionExpression: handleErrorForContext(context, message),
      FunctionDeclaration: handleErrorForContext(context, message),
    };
  },
};
