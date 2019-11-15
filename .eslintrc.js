module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'error', // problemas no prettier retorna erro
    'class-methods-use-this': 'off', //desobriga uso do this nas classes
    'no-param-reassign': 'off', // receber parâmetro e permitir altera-lo
    camelcase: 'off', //desabiliar camelcase nas variáveis
    'no-unused-vars': ['error', { argsIgnorePattern: 'next' }], // não reclama quanod a variavel dos middleware s não se chamar next
  },
};
