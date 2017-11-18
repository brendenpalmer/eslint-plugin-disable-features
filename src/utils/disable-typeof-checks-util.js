export function getErrorMessage(type) {
  return `Using ${type} typeof expressions are disabled.`;
}

export function isTypeOfNode(node) {
  const { operator, type } = node;
  return operator === 'typeof' && type === 'UnaryExpression';
}

export function getBinaryExpressionNodes(node) {
  let literal = null;
  let comparator = null;
  const { left = null, right = null } = node;

  if (left && left.type === 'Literal') {
    literal = left;
    comparator = right;
  } else if (right && right.type === 'Literal') {
    literal = right;
    comparator = left;
  }

  return {
    literal,
    comparator,
  };
}

export function findResolvedIdentifierByName(identifierName, scope = {}) {
  const { references = [] } = scope;

  for (let i = 0; i < references.length; i++) {
    const reference = references[i];
    const {
      resolved = null,
      identifier = {},
      identifier: { type, name },
    } = reference;

    if (
      reference &&
      resolved &&
      identifier &&
      type === 'Identifier' &&
      name &&
      name === identifierName
    ) {
      return resolved;
    }
  }

  return null;
}

export function reportErrorForNode(context, comparator, literal) {
  context.report({
    node: comparator,
    message: getErrorMessage(literal.value),
  });
}
