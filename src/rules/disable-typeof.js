function getErrorMessage(type) {
  return `Using ${type} typeof expressions are disabled.`;
}

function handleErrorForContext(context, types = []) {
  const map = {};
  types.forEach(type => {
    map[type] = true;
  });

  return function handleErrorForGeneratorNode(node) {
    const { parent = null, operator = null } = node;
    const { type = null, right = null } = parent;

    if (
      operator === 'typeof' &&
      parent &&
      type === 'BinaryExpression' &&
      right.value &&
      map.hasOwnProperty(right.value)
    ) {
      context.report({
        node,
        message: getErrorMessage(right.value),
      });
    }
  };
}

module.exports = {
  meta: {
    docs: {
      description: 'Disables certain typeof expressions',
      category: 'Possible Errors',
      recommended: false,
    },
  },

  create: function create(context) {
    const { options = [] } = context;
    const types = options && options.length > 0 ? options[0].types : [];

    return {
      UnaryExpression: handleErrorForContext(context, types),
    };
  },
};
