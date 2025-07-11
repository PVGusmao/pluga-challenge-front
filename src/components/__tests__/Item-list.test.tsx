import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ItemList from '../Item-list';

// Fazemos um mock do hook de contexto para controlar os dados no teste
jest.mock('@/contexts/main-context', () => ({
  useMainContext: () => ({
    pagedFilteredApps: [], // força lista vazia
    apps: [{ app_id: '1', name: 'Foo', color: '#fff', icon: '', link: '' }], // indica que já carregou dados
    search: 'Foo',
  }),
}));

describe('ItemList', () => {
  it('exibe mensagem de "Nenhum app encontrado" quando a lista está vazia após filtro', () => {
    render(<ItemList />);

    // O componente NotFound deve renderizar este texto
    expect(screen.getByText(/Nenhum app encontrado/i)).toBeInTheDocument();
  });
}); 