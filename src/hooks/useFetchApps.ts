import { useEffect, useState } from "react";
import api from "@/services/api";
import { App } from "@/contexts/main-context";

export function useFetchApps(
  setLastSelectedApps?: React.Dispatch<React.SetStateAction<App[]>>
): App[] {
  const [apps, setApps] = useState<App[]>([]);

  useEffect(() => {
    async function fetchApps() {
      try {
        const response = await api.get("");
        const allApps: App[] = response.data;
        setApps(allApps);

        if (setLastSelectedApps) {
          const appsByAppId = allApps.reduce<Record<string, App>>((acc, app) => {
            acc[app.app_id] = app;
            return acc;
          }, {});

          const storedLastSelectedAppIds: string[] = JSON.parse(
            localStorage.getItem("lastSelectedApps") || "[]"
          );

          setLastSelectedApps(
            storedLastSelectedAppIds
              .map((appId) => appsByAppId[appId])
              .filter(Boolean)
          );
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchApps();
  }, [setLastSelectedApps]);

  return apps;
} 