export function getErrorMessage(type) {
  return `Using ${type} instanceof expressions are disabled.`;
}

export function isInstanceOfNode(node) {
  if (!node) {
    return false;
  }

  const { operator, type } = node;
  return operator === 'instanceof' && type === 'BinaryExpression';
}

export function reportErrorForNode(context, node, type, message) {
  context.report({
    node,
    message: message || getErrorMessage(type.name),
  });
}
