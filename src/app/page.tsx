'use client'

import React, { useState } from "react"
import { App, useMainContext } from "@/contexts/main-context"
import CardApp from "@/components/card-app"
import Header from "@/components/header"
import Loader from "@/components/loader"
import NotFound from "@/components/not-found"
import ModalApp from "@/components/modal-app"
import Pagination from "@/components/pagination";

export default function Home() {
  const { apps, lastSelectedApps, setLastSelectedApps, modalRef, page } = useMainContext()

  const [search, setSearch] = useState("")

  const [selectedApp, setSelectedApp] = useState<App | null>(null)

  const normalizedSearch = search.toLowerCase()

  const filteredApps = apps.filter((app) => app.name.toLowerCase().includes(normalizedSearch))

  const pagedFilteredApps = filteredApps.slice((page - 1) * 12, page * 12)

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
    <main>
      <div className="flex flex-col gap-6 w-full max-w-3xl mx-auto p-6">
        <Header search={search} handleSearch={setSearch} />

        {apps.length === 0 ? (
          <Loader />
        ) : pagedFilteredApps.length === 0 ? (
          <NotFound search={search} />
        ) : (
          <>
            <div className="grid grid-cols-4 gap-6 ">
              {pagedFilteredApps.map((app, index) =>
                <CardApp key={index} app={app} handleSelectedApp={handleSelectedApp} />
              )}
            </div>
            <Pagination />
          </>
        )}
      </div>
      <ModalApp
        modalRef={modalRef}
        selectedApp={selectedApp}
        lastSelectedApps={lastSelectedApps}
        handleSelectedApp={handleSelectedApp}
      />
    </main>
  )
}