module.exports = {
  'parserOptions': {
    'sourceType': 'module',
    "ecmaFeatures": {
      "jsx": true,
      "modules": true
    }
  },
  "plugins": [
    "react"
  ],
  'rules': {
    "react/jsx-uses-vars": [2],
    // need to keep as it's known issue with a dependency of airbnb standards
    'jsx-a11y/href-no-hash': 0,
    'camelcase': 0, // allowing underscore case
    'semi': 0, // allowing lines with or without semi colon at the end
    'arrow-body-style': ['error', 'always'], // because we return BIG BIG promises
    'no-shadow': ['error', {
      'builtinGlobals': true,
      'hoist': 'all'
    }],
    'eol-last': 0,
    'no-param-reassign': 0,
    'no-unused-vars': 'error',
    'no-use-before-define': 0,
    'radix': ['error', 'as-needed'],
    'max-len': ['error', {
      'ignoreComments': true,
      'ignoreTemplateLiterals': true,
      'ignoreUrls': true
    }],
    'require-jsdoc': ['error', {
      'require': {
        'FunctionDeclaration': true,
        'MethodDefinition': true,
        'ClassDeclaration': true,
        'ArrowFunctionExpression': true
      }
    }],
    'valid-jsdoc': 2,
    'comma-dangle': ['error', 'never'],
    'indent': ['error', 2,
      {
        'FunctionExpression': {
          'parameters': 'first'
        },
        'CallExpression': {
          'arguments': 'first'
        },
        'FunctionDeclaration': {
          'parameters': 'first'
        },
        'CallExpression': {
          'arguments': 'first'
        },
        'ObjectExpression': 'first',
        'flatTernaryExpressions': true
      }
    ],
    'one-var': 0,
    'one-var-declaration-per-line': 0
  },

  "extends": "google"
};