import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MainProvider, useMainContext, App } from '../main-context';

jest.mock('@/services/api', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
  },
}));

import api from '@/services/api';

const mockedApi = api as unknown as { get: jest.Mock };

function Consumer() {
  const { apps, lastSelectedApps, search, setSearch, filteredApps, pagedFilteredApps } = useMainContext();

  return (
    <div>
      <span data-testid="apps-count">{apps.length}</span>
      <span data-testid="last-count">{lastSelectedApps.length}</span>
      <span data-testid="search">{search}</span>
      <span data-testid="filtered-count">{filteredApps.length}</span>
      <span data-testid="paged-count">{pagedFilteredApps.length}</span>
      <input
        data-testid="search-input"
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
      />
    </div>
  );
}

describe('MainContext', () => {
  const appList: App[] = [
    { app_id: '1', color: '#fff', icon: '', link: '', name: 'Foo' },
    { app_id: '2', color: '#000', icon: '', link: '', name: 'Bar' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    mockedApi.get.mockResolvedValue({ data: appList });

    jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
      if (key === 'lastSelectedApps') {
        return JSON.stringify(['2']);
      }
      return null;
    });
  });

  it('carrega apps e lastSelectedApps via API/localStorage', async () => {
    render(
      <MainProvider>
        <Consumer />
      </MainProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('apps-count')).toHaveTextContent('2');
    });

    expect(screen.getByTestId('last-count')).toHaveTextContent('1');
  });

  it('filtra apps pelo termo de busca e pagina corretamente', async () => {
    render(
      <MainProvider>
        <Consumer />
      </MainProvider>
    );

    await waitFor(() => screen.getByTestId('apps-count'));

    fireEvent.change(screen.getByTestId('search-input'), { target: { value: 'foo' } });

    await waitFor(() => {
      expect(screen.getByTestId('filtered-count')).toHaveTextContent('1');
    });
  });
}); 