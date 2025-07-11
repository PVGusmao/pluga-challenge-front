module.exports = {
  // Usa ts-jest para compilar TypeScript nos testes
  preset: 'ts-jest',

  // Ambiente que provê DOM (necessário para testar componentes React)
  testEnvironment: 'jest-environment-jsdom',

  // Faz o mapeamento dos aliases usados no tsconfig
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    // Mapeia importações de estilos para um proxy
    '\\.(css|scss)$': 'identity-obj-proxy',
    // Mapeia arquivos estáticos para um mock genérico
    '\\.(svg|png|jpg|jpeg|gif|ico)$': '<rootDir>/__mocks__/fileMock.js',
  },

  // Arquivo executado depois que o ambiente de testes é montado
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  // Garante transformação de arquivos TypeScript/TSX
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },

  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.jest.json',
    },
  },
}; 