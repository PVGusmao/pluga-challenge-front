import '@testing-library/jest-dom';

// Mock simples para o componente <Image> do Next.js
jest.mock('next/image', () => ({
  __esModule: true,
  default: () => null,
}));