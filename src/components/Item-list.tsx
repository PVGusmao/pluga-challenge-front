'use client'

import Pagination from "./pagination";
import { useMainContext } from "@/contexts/main-context";
import CardApp from "./card-app";
import NotFound from "./not-found";

export default function ItemList() {
  const { pagedFilteredApps } = useMainContext()
  
  if (pagedFilteredApps.length === 0) {
    return (
      <NotFound />
    )
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-3xl mx-auto p-6">
      <div className="grid grid-cols-4 gap-6">
          {pagedFilteredApps.map((app, index) =>
            <CardApp key={index} app={app}/>
          )}
        </div>
        <Pagination />
    </div>
  )
}