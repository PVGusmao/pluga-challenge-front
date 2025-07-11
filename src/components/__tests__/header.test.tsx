import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../header';

const mockSetSearch = jest.fn();

jest.mock('@/contexts/main-context', () => {
  return {
    useMainContext: () => ({
      search: '',
      setSearch: mockSetSearch,
    }),
  };
});

describe('Header', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza título e campo de busca', () => {
    render(<Header />);

    expect(screen.getByRole('heading', { name: /Pluga Challenge Front/i })).toBeInTheDocument();
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
  });

  it('ao digitar chama setSearch com texto em minúsculas', () => {
    render(<Header />);

    const input = screen.getByRole('searchbox');

    fireEvent.change(input, { target: { value: 'Foo' } });

    expect(mockSetSearch).toHaveBeenLastCalledWith('foo');
  });
}); 