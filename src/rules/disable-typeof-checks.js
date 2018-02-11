import {
  getBinaryExpressionNodes,
  isTypeOfNode,
  reportErrorForNode,
} from '../utils/disable-typeof-checks-util';

function handleErrorForBinaryExpression(context, types = []) {
  const set = new Set(types);
  const disableAll = set.size === 0;

  return function handleErrorForNode(node) {
    const scope = context.getScope();
    const { literal, comparator } = getBinaryExpressionNodes(node, scope);

    if (!literal || !comparator || (!set.has(literal.value) && !disableAll)) {
      return;
    }

    if (isTypeOfNode(comparator)) {
      reportErrorForNode(context, node, literal);
    }
  };
}

export default {
  meta: {
    docs: {
      description: 'Disables certain typeof expressions',
      category: 'Possible Errors',
      recommended: false,
    },
  },

  create(context) {
    const { options = [] } = context;
    const types = options && options.length > 0 ? options[0].types : [];

    return {
      BinaryExpression: handleErrorForBinaryExpression(context, types),
    };
  },
};
