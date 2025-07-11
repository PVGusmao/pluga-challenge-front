import { App } from "@/contexts/main-context";
import Image from "next/image";
import { RefObject } from "react";

export type ModalAppProps = {
  modalRef: RefObject<HTMLDialogElement | null>;
  selectedApp: App | null;
  lastSelectedApps: App[];
  handleSelectedApp: (app: App) => void;
};

export default function ModalApp({ modalRef, selectedApp, lastSelectedApps, handleSelectedApp }: ModalAppProps) {
  return (
    <dialog className="modal" ref={modalRef}>
      {selectedApp && (
        <div className="modal-box flex flex-col gap-6">
          <div className="mx-auto">
            <div className="flex gap-6">
              <figure style={{ backgroundColor: selectedApp.color }} className="rounded-full p-10">
                <Image src={selectedApp.icon} alt={selectedApp.name} width={64} height={64} />
              </figure>
              <div className="py-6">
                <h2 className="mb-4 text-lg">
                  {selectedApp.name}
                </h2>
                <a href={selectedApp.link} target="_blank" rel="noreferrer" className="btn btn-primary">
                  Acessar
                </a>
              </div>
            </div>
          </div>
          <h2 className="text-center">
            Últimas ferramentas visualizadas
          </h2>
          <div className="grid grid-cols-3 gap-6">
            {lastSelectedApps.toReversed().map((app) => (
              <a
                key={app.app_id}
                onClick={() => handleSelectedApp(app)}
                className="card card-sm group bg-base-100 cursor-pointer transition shadow-sm hover:shadow-lg"
              >
                <figure style={{ backgroundColor: app.color }} className="p-6">
                  <Image
                    src={app.icon}
                    alt={app.name}
                    width={64}
                    height={64}
                    className="transition group-hover:scale-110"
                  />
                </figure>
                <div className="card-body min-h-17 text-center justify-center">
                  <h4>{app.name}</h4>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
} 
