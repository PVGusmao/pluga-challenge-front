import { useEffect } from "react";
import api from "@/services/api";
import { App } from "@/contexts/main-context";

/**
 * Hook responsável por buscar as ferramentas da API da Pluga e
 * popular os estados de apps e lastSelectedApps.
 */
export function useFetchApps(
  setApps: React.Dispatch<React.SetStateAction<App[]>>,
  setLastSelectedApps: React.Dispatch<React.SetStateAction<App[]>>
) {
  useEffect(() => {
    async function fetchApps() {
      try {
        const response = await api.get("");
        const allApps: App[] = response.data;
        setApps(allApps);

        const appsByAppId = allApps.reduce<Record<string, App>>((acc, app) => {
          acc[app.app_id] = app;
          return acc;
        }, {});

        const storedLastSelectedAppIds: string[] = JSON.parse(
          localStorage.getItem("lastSelectedApps") || "[]"
        );

        setLastSelectedApps(
          storedLastSelectedAppIds.map((appId) => appsByAppId[appId]).filter(Boolean)
        );
      } catch (error) {
        console.error(error);
      }
    }

    fetchApps();
  }, [setApps, setLastSelectedApps]);
} 