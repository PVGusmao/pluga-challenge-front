import '@testing-library/jest-dom';

describe('api service', () => {
  it('configura a baseURL do axios a partir da variável de ambiente', async () => {

    jest.resetModules();

    const api = (await import('../api')).default;

    expect(api.defaults.baseURL).toBe('https://pluga.co/ferramentas_search.json');
  });
}); 