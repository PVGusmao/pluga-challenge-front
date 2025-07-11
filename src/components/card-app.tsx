import { App, useMainContext } from "@/contexts/main-context";
import Image from "next/image";
import ModalApp from "./modal-app";

type Props = {
  app: App;
}

export default function CardApp({ app}: Props) {
  const { setSelectedApp, setLastSelectedApps, modalRef, lastSelectedApps } = useMainContext();

  function handleSelectedApp(app: App) {
    setSelectedApp(app)

    const lastSelectedAppsSet = new Set(lastSelectedApps)
    lastSelectedAppsSet.delete(app)
    lastSelectedAppsSet.add(app)

    const newLastSelectedApps = Array.from(lastSelectedAppsSet).slice(-3)
    setLastSelectedApps(newLastSelectedApps)

    const newLastSelectedAppIds = newLastSelectedApps.map((app) => app.app_id)
    localStorage.setItem("lastSelectedApps", JSON.stringify(newLastSelectedAppIds))

    modalRef.current?.showModal()
  }

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={() => handleSelectedApp(app)}
        className="card card-sm group bg-base-100 cursor-pointer transition shadow-sm hover:shadow-lg w-full"
      >
        <figure style={{ backgroundColor: app.color }} className="p-6">
          <Image src={app.icon} alt={app.name} width="64" height="64" className="transition group-hover:scale-110" />
        </figure>
        <div className="card-body min-h-17 text-center justify-center">
          <h4>{app.name}</h4>
        </div>
      </button>

      <ModalApp
        handleSelectedApp={handleSelectedApp}
        modalRef={modalRef as React.RefObject<HTMLDialogElement>}
        lastSelectedApps={lastSelectedApps}
      />
    </div>
  )
}