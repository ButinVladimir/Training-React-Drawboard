module.exports = {
  'env': {
      'browser': true,
      'node': true,
      'jest/globals': true
    },
  "extends": ["airbnb-base", 'plugin:jest/recommended'],
  'plugins': ['jest'],
  'rules': {
    'linebreak-style': ['error', 'windows'],
    'no-console': 'off'
  }
};