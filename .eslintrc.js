module.exports = {
  'env': {
    'browser': true,
    'es6': true
  },
  'extends': 'eslint:recommended',
  'parser': '@babel/eslint-parser',
  'parserOptions': {
    'sourceType': 'module'
  },
  'rules': {
    'indent': [
      'error', 2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ]
  },
  'globals': {
    'module': true
  }
};
