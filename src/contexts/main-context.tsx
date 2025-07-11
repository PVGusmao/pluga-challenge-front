'use client';

import api from '@/services/api';
import { createContext, useContext, ReactNode, useState, useEffect, useRef } from 'react';

export interface App {
  app_id: string;
  color: string;
  icon: string;
  link: string;
  name: string;
}

interface MainContextProps {
  apps: App[];
  setApps: React.Dispatch<React.SetStateAction<App[]>>;
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
  const [apps, setApps] = useState<App[]>([])

  const [lastSelectedApps, setLastSelectedApps] = useState<App[]>([])

  const modalRef = useRef<HTMLDialogElement | null>(null)

  const [page, setPage] = useState(1)

  const [search, setSearch] = useState("")

  const [selectedApp, setSelectedApp] = useState<App | null>(null)

  const filteredApps = apps.filter((app) => app.name.toLowerCase().includes(search))

  const pagedFilteredApps = filteredApps.slice((page - 1) * 12, page * 12)

  function handlePlugaApps() {
    api
      .get("")
      .then((response) => {
        const allApps = response.data
        setApps(allApps);

        const appsByAppId = (allApps as App[]).reduce((acc: Record<string, App>, app: App) => {
          acc[app.app_id] = app;
          return acc;
        }, {});

        const storedLastSelectedAppIds: string[] = JSON.parse(localStorage.getItem("lastSelectedApps") || "[]");

        setLastSelectedApps(storedLastSelectedAppIds.map((appId: string) => appsByAppId[appId]));
      }).catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    handlePlugaApps()
  }, [])

  return (
    <MainContext.Provider
      value={{
        apps, setApps,
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
