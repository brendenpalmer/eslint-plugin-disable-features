import {
  getBinaryExpressionNodes,
  isTypeOfNode,
  reportErrorForNode,
  findResolvedIdentifierByName,
} from '../utils/disable-typeof-checks-util';

function handleErrorForBinaryExpression(context, types = []) {
  const set = new Set(types);

  return function handleErrorForNode(node) {
    const scope = context.getScope();
    const { literal, comparator } = getBinaryExpressionNodes(node);

    if (!literal || !comparator || !set.has(literal.value)) {
      return;
    }

    if (isTypeOfNode(comparator)) {
      reportErrorForNode(context, comparator, literal);
    } else if (comparator.type === 'Identifier') {
      const { identifiers = [] } = findResolvedIdentifierByName(
        comparator.name,
        scope
      );

      if (identifiers.length !== 1) {
        return;
      }

      const identifier = identifiers[0];

      const { parent = null } = identifier;

      if (
        parent &&
        parent.type === 'VariableDeclarator' &&
        isTypeOfNode(parent.init)
      ) {
        reportErrorForNode(context, comparator, literal);
      }
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
