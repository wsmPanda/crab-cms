// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    'prefer-promise-reject-errors': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-multiple-empty-lines': 0,
    'space-before-function-paren': 0,
    'no-trailing-spaces': 0,
    'comma-spacing': 0,
    'spaced-comment': 0,
    'indent': [0, 1],
    'no-unused-vars': 1,
    'semi': 0,
    'comma-dangle': 0,
    'padded-blocks': 1,
    'key-spacing': 0,
    'padded-blocks': 1,
    'space-before-blocks': 1,
    'no-unreachable': 1,
    'camelcase': 0,
    'no-useless-escape': 0,
    'no-template-curly-in-string': 0,
    'no-eval': 0,
    'quotes': 0,
    'no-extend-native': 0,
    'space-infix-ops': 1,
    'keyword-spacing': 1,
    'arrow-spacing': 1,
    'one-var': 0,
    'no-duplicate-imports': 0,
    'standard/computed-property-even-spacing': 0,
    'no-proto': 0,
    'no-useless-call': 0,
    'no-unneeded-ternary': 0,
    'object-property-newline': 1
  }
}
