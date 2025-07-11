import { renderHook, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useSelectApp } from '../useSelectApp';
import { App } from '@/contexts/main-context';

const mockSetSelectedApp = jest.fn();
const mockSetLastSelectedApps = jest.fn();
const modalRef = {
  current: {
    showModal: jest.fn(),
  } as unknown as HTMLDialogElement,
} as React.RefObject<HTMLDialogElement>;

jest.mock('@/contexts/main-context', () => {
  return {
    __esModule: true,
    useMainContext: () => ({
      setSelectedApp: mockSetSelectedApp,
      setLastSelectedApps: mockSetLastSelectedApps,
      modalRef,
    }),
  };
});

const app: App = {
  app_id: '1',
  color: '#fff',
  icon: '/icon.svg',
  link: 'https://example.com',
  name: 'Foo',
};

describe('useSelectApp', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('atualiza estados e abre o modal', () => {
    const { result } = renderHook(() => useSelectApp());

    act(() => {
      result.current(app);
    });

    expect(mockSetSelectedApp).toHaveBeenCalledWith(app);
    expect(mockSetLastSelectedApps).toHaveBeenCalled();
    expect(modalRef.current?.showModal).toHaveBeenCalled();
  });
}); 