import { getConfigFromContext } from '../utils/config-util';

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

export default {
  meta: {
    docs: {
      description: 'Disables async / await',
      category: 'Possible Errors',
      recommended: false,
    },
  },

  create(context) {
    const { message } = getConfigFromContext(context);

    return {
      ArrowFunctionExpression: handleErrorForContext(context, message),
      FunctionExpression: handleErrorForContext(context, message),
      AsyncFunctionExpression: handleErrorForContext(context, message),
      FunctionDeclaration: handleErrorForContext(context, message),
    };
  },
};
