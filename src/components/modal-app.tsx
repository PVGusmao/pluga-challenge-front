import { App, useMainContext } from "@/contexts/main-context";
import Image from "next/image";

type Props = {
  handleSelectedApp: (app: App) => void;
  modalRef: React.RefObject<HTMLDialogElement>;
  lastSelectedApps: App[];
}

export default function ModalApp({ handleSelectedApp, modalRef, lastSelectedApps }: Props) {
  const { selectedApp } = useMainContext()

  return (
    <dialog className="modal" ref={modalRef}>
      {selectedApp && (
        <div className="modal-box flex flex-col items-center gap-6">
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

          <h2 className="text-center">
            Últimas ferramentas visualizadas
          </h2>
          
          <div className="grid grid-cols-3 gap-6 w-full">
            {[...lastSelectedApps].reverse().map((app) => (
              <button
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
              </button>
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
