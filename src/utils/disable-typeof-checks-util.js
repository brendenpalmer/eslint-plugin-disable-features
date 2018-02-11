export function getErrorMessage(type) {
  return `Using ${type} typeof expressions are disabled.`;
}

export function isTypeOfNode(node) {
  if (!node) {
    return false;
  }

  const { operator, type } = node;
  return operator === 'typeof' && type === 'UnaryExpression';
}

export function getBinaryExpressionNodes(node, scope = {}) {
  let literal = null;
  let comparator = null;
  let { left = null, right = null } = node;

  if (left && left.type === 'Identifier') {
    left = getIdentifierInit(left, scope);
  }

  if (right && right.type === 'Identifier') {
    right = getIdentifierInit(right, scope);
  }

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

export function getIdentifierInit(node, scope = {}) {
  if (!node || node.type !== 'Identifier') {
    return;
  }

  const { identifiers = [] } =
    findResolvedIdentifierByName(node.name, scope) || {};

  if (identifiers.length !== 1) {
    return;
  }

  const identifier = identifiers[0];

  const { parent = null } = identifier;

  return parent && parent.init;
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

export function reportErrorForNode(context, node, literal) {
  context.report({
    node,
    message: getErrorMessage(literal.value),
  });
}
