const cypress = require('eslint-plugin-cypress/flat');
const nx = require('@nx/eslint-plugin');

module.exports = [
  cypress.configs['recommended'],
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    // Override or add rules here
    rules: {},
  },
];
