import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ModalApp from '../modal-app';
import { App } from '@/contexts/main-context';

const selectedApp: App = {
  app_id: '1',
  color: '#fff',
  icon: '/icon.svg',
  link: 'https://example.com',
  name: 'App Selecionado',
};

const lastApps: App[] = [
  selectedApp,
  {
    app_id: '2',
    color: '#eee',
    icon: '/icon2.svg',
    link: 'https://example.com',
    name: 'Outro App',
  },
];

const mockHandleSelectedApp = jest.fn();
const mockModalRef = { current: null } as unknown as React.RefObject<HTMLDialogElement>;

jest.mock('@/contexts/main-context', () => {
  return {
    useMainContext: () => ({
      selectedApp,
    }),
  };
});

describe('ModalApp', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('exibe informações do app selecionado', () => {
    render(
      <ModalApp
        handleSelectedApp={mockHandleSelectedApp}
        modalRef={mockModalRef}
        lastSelectedApps={lastApps}
      />
    );

    expect(screen.getAllByText(selectedApp.name).length).toBeGreaterThan(0);
  });

  it('lista as últimas ferramentas visualizadas', () => {
    render(
      <ModalApp
        handleSelectedApp={mockHandleSelectedApp}
        modalRef={mockModalRef}
        lastSelectedApps={lastApps}
      />
    );

    lastApps.forEach((app) => {
      expect(screen.getAllByText(app.name).length).toBeGreaterThan(0);
    });
  });

  it('ao clicar em uma ferramenta recente, chama handleSelectedApp', () => {
    render(
      <ModalApp
        handleSelectedApp={mockHandleSelectedApp}
        modalRef={mockModalRef}
        lastSelectedApps={lastApps}
      />
    );

    fireEvent.click(screen.getByText(lastApps[1].name));

    expect(mockHandleSelectedApp).toHaveBeenCalledWith(lastApps[1]);
  });
}); 