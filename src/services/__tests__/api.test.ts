import '@testing-library/jest-dom';

describe('api service', () => {
  it('configura a baseURL do axios a partir da variável de ambiente', async () => {
    process.env.NEXT_PUBLIC_PLUGA_API_URL = 'https://example.com';

    jest.resetModules();

    const api = (await import('../api')).default;

    expect(api.defaults.baseURL).toBe('https://example.com');
  });
}); 