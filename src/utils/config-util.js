export function getConfigFromContext({ options = [] }) {
  return options && options.length > 0 ? options[0] : {};
}
