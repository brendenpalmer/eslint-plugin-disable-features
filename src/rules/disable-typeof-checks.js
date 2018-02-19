import { getConfigFromContext } from '../utils/config-util';
import {
  isTypeOfNode,
  reportErrorForNode,
  getBinaryExpressionNodes,
} from '../utils/disable-typeof-checks-util';

function handleErrorForBinaryExpression(context, types = [], message) {
  const set = new Set(types);
  const disableAll = set.size === 0;

  return function handleErrorForNode(node) {
    const scope = context.getScope();
    const { literal, comparator } = getBinaryExpressionNodes(node, scope);

    if (!literal || !comparator || (!set.has(literal.value) && !disableAll)) {
      return;
    }

    if (isTypeOfNode(comparator)) {
      reportErrorForNode(context, node, literal, message);
    }
  };
}

export default {
  meta: {
    docs: {
      description: 'Disables certain typeof checks',
      category: 'Possible Errors',
      recommended: false,
    },
  },

  create(context) {
    const { types = [], message } = getConfigFromContext(context);

    return {
      BinaryExpression: handleErrorForBinaryExpression(context, types, message),
    };
  },
};
