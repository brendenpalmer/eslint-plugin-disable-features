'use strict';

/* eslint-disable no-path-concat */
var requireIndex = require('requireindex');

module.exports = {
  rules: requireIndex(`${__dirname}/rules`)
};