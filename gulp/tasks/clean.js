const del = require('del');

export function clean() {
  return del(['lib']);
}
