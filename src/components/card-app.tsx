import { App } from "@/contexts/main-context";
import Image from "next/image";

type Props = {
  app: App;
  handleSelectedApp: (app: App) => void;
}

export default function CardApp({ app, handleSelectedApp}: Props) {
  return (
    <div>
      <a key={app.app_id} onClick={() => handleSelectedApp(app)} className="card card-sm group bg-base-100 cursor-pointer transition shadow-sm hover:shadow-lg">
        <figure style={{ backgroundColor: app.color }} className="p-6">
          <Image src={app.icon} alt={app.name} width="64" height="64" className="transition group-hover:scale-110" />
        </figure>
        <div className="card-body min-h-17 text-center justify-center">
          <h4>{app.name}</h4>
        </div>
      </a>
    </div>
  )
}