import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pagination from '../pagination';
import { App } from '@/contexts/main-context';

const apps: App[] = Array.from({ length: 24 }, (_, i) => ({
  app_id: `${i}`,
  color: '#fff',
  icon: '/icon.svg',
  link: '#',
  name: `App ${i}`,
}));

const mockSetPage = jest.fn();

jest.mock('@/contexts/main-context', () => {
  return {
    useMainContext: () => ({
      page: 1,
      setPage: mockSetPage,
      apps,
    }),
  };
});

describe('Pagination', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza botões de página', () => {
    render(<Pagination />);

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('ao clicar em uma página chama setPage corretamente', () => {
    render(<Pagination />);

    fireEvent.click(screen.getByText('2'));

    expect(mockSetPage).toHaveBeenCalledWith(2);
  });
}); 