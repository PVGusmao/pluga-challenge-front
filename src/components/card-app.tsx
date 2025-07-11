import { App, useMainContext } from "@/contexts/main-context";
import { useSelectApp } from "@/hooks/useSelectApp";
import Image from "next/image";
import ModalApp from "./modal-app";

type Props = {
  app: App;
}

export default function CardApp({ app }: Props) {
  const { modalRef, lastSelectedApps } = useMainContext();
  const selectApp = useSelectApp();

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={() => selectApp(app)}
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
        modalRef={modalRef as React.RefObject<HTMLDialogElement>}
        lastSelectedApps={lastSelectedApps}
      />
    </div>
  )
}