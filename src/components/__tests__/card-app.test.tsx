import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CardApp from '../card-app';
import { App } from '@/contexts/main-context';

const app: App = {
  app_id: '1',
  color: '#fff',
  icon: '/icon.svg',
  link: 'https://example.com',
  name: 'Foo',
};

const mockSetSelectedApp = jest.fn();
const mockSetLastSelectedApps = jest.fn();
if (!('showModal' in HTMLDialogElement.prototype)) {
  Object.defineProperty(HTMLDialogElement.prototype, 'showModal', {
    configurable: true,
    writable: true,
    value: () => {},
  });
}

const showModalSpy = jest.spyOn(HTMLDialogElement.prototype, 'showModal').mockImplementation(() => {});

const mockModalRef = { current: null } as unknown as React.RefObject<HTMLDialogElement>;

jest.mock('@/contexts/main-context', () => {
  return {
    useMainContext: () => ({
      setSelectedApp: mockSetSelectedApp,
      setLastSelectedApps: mockSetLastSelectedApps,
      modalRef: mockModalRef,
      lastSelectedApps: [],
    }),
  };
});

describe('CardApp', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza o nome do app', () => {
    render(<CardApp app={app} />);

    expect(screen.getByText(app.name)).toBeInTheDocument();
  });

  it('ao clicar, define o app selecionado e abre o modal', () => {
    render(<CardApp app={app} />);

    fireEvent.click(screen.getByText(app.name));

    expect(mockSetSelectedApp).toHaveBeenCalledWith(app);
    expect(showModalSpy).toHaveBeenCalled();
  });
});

afterAll(() => {
  showModalSpy.mockRestore();
}); 