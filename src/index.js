/* eslint-disable no-path-concat */
const requireIndex = require('requireindex');

module.exports = {
  rules: requireIndex(`${__dirname}/rules`),
};
