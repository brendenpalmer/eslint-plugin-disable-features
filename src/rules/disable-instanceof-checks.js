import { getConfigFromContext } from '../utils/config-util';

import {
  isInstanceOfNode,
  reportErrorForNode,
} from '../utils/disable-instanceof-checks-util';

function handleErrorForBinaryExpression(context, types = [], message) {
  const set = new Set(types);
  const disableAll = set.size === 0;

  return function handleErrorForNode(node) {
    const { left, right } = node;

    if (!left || !right || (!set.has(right.name) && !disableAll)) {
      return;
    }

    if (isInstanceOfNode(node)) {
      reportErrorForNode(context, node, right, message);
    }
  };
}

export default {
  meta: {
    docs: {
      description: 'Disables certain instanceof checks',
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
