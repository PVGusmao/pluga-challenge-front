import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NotFound from '../not-found';
import React from 'react';

jest.mock('../loader', () => ({
  __esModule: true,
  default: () => <div data-testid="loader" />,
}));

const mockUseMainContext = jest.fn();

jest.mock('@/contexts/main-context', () => ({
  useMainContext: () => mockUseMainContext(),
}));

describe('NotFound', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('exibe loader quando a lista de apps está vazia', () => {
    mockUseMainContext.mockReturnValue({
      search: '',
      apps: [],
    });

    const { getByTestId } = render(<NotFound />);

    expect(getByTestId('loader')).toBeInTheDocument();
  });

  it('exibe mensagem quando nenhum app é encontrado após busca', () => {
    mockUseMainContext.mockReturnValue({
      search: 'teste',
      apps: [{ app_id: '1', name: 'Foo', color: '#fff', icon: '', link: '' }],
    });

    render(<NotFound />);

    expect(screen.getByText(/Nenhum app encontrado/i)).toBeInTheDocument();
    expect(screen.getByText(/teste/i)).toBeInTheDocument();
  });
}); 