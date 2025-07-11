'use client';

import { createContext, useContext, ReactNode, useState, useRef } from 'react';
import { useFetchApps } from '@/hooks/useFetchApps';

export interface App {
  app_id: string;
  color: string;
  icon: string;
  link: string;
  name: string;
}

interface MainContextProps {
  apps: App[];
  lastSelectedApps: App[];
  setLastSelectedApps: React.Dispatch<React.SetStateAction<App[]>>;
  modalRef: React.RefObject<HTMLDialogElement | null>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  selectedApp: App | null;
  setSelectedApp: React.Dispatch<React.SetStateAction<App | null>>;
  filteredApps: App[];
  pagedFilteredApps: App[];
}

const MainContext = createContext<MainContextProps | undefined>(undefined);

export const MainProvider = ({ children }: { children: ReactNode }) => {
  const [lastSelectedApps, setLastSelectedApps] = useState<App[]>([])

  const apps = useFetchApps(setLastSelectedApps);

  const modalRef = useRef<HTMLDialogElement | null>(null)

  const [page, setPage] = useState(1)

  const [search, setSearch] = useState("")

  const [selectedApp, setSelectedApp] = useState<App | null>(null)

  const filteredApps = apps.filter((app) => app.name.toLowerCase().includes(search))

  const pagedFilteredApps = filteredApps.slice((page - 1) * 12, page * 12)

  return (
    <MainContext.Provider
      value={{
        apps,
        lastSelectedApps, setLastSelectedApps,
        modalRef,
        page, setPage,
        search, setSearch,
        selectedApp, setSelectedApp,
        filteredApps,
        pagedFilteredApps,
      }}
    >
      <div>{children}</div>
    </MainContext.Provider>
  );
};

export const useMainContext = () => {
  const context = useContext(MainContext);
  if (!context) {
    throw new Error('Algo inesperado aconteceu. Tente novamente.');
  }
  return context;
};
