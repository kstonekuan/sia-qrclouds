module.exports = {
    'extends': 'airbnb',
    'parser': 'babel-eslint',
    'plugins': [
      'react',
    ],
    'env': {
      'jest': true,
    },
    'rules': {
      'brace-style': ["error", "1tbs"],
      'class-methods-use-this': 1,
      'comma-dangle': 0,
      'consistent-return': 0,
      'default-case': 0,
      'global-require' : 0,
      'import/no-unresolved': 1,
      'linebreak-style' : 0,
      'max-len' : 0,
      'no-console': 0,
      'no-unused-vars' : 1,
      'no-use-before-define': 0,
      'object-curly-newline' : 0,
      'object-shorthand' : 0,
      'react/destructuring-assignment': 1,
      'react/jsx-filename-extension': 0,
      'react/prefer-stateless-function': 0,
      'react/prop-types': 0,
      'react/sort-comp': 0,
    },
    'globals': {
      "fetch": false
    }
  }