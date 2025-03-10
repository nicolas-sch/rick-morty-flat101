// jest.config.js
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './', // Diretório do projeto (caso esteja diferente da raiz)
});

const customJestConfig = {
  testEnvironment: 'jest-environment-jsdom', // Ambiente de testes
};

module.exports = createJestConfig(customJestConfig);
