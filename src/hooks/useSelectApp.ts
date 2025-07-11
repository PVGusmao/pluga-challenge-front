import { useMainContext, App } from "@/contexts/main-context";

export const useSelectApp = () => {
  const { setSelectedApp, setLastSelectedApps, modalRef } = useMainContext();

  function selectApp(app: App) {
    setSelectedApp(app);

    setLastSelectedApps((prev) => {
      const lastSelectedAppsSet = new Set(prev);
      lastSelectedAppsSet.delete(app);
      lastSelectedAppsSet.add(app);
      const newLastSelectedApps = Array.from(lastSelectedAppsSet).slice(-3);

      if (typeof window !== "undefined") {
        window.localStorage.setItem(
          "lastSelectedApps",
          JSON.stringify(newLastSelectedApps.map((a) => a.app_id))
        );
      }

      return newLastSelectedApps;
    });

    modalRef.current?.showModal();
  }

  return selectApp;
}; 