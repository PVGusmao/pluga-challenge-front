'use client'

import { FiSearch } from "react-icons/fi";
import { useMainContext } from "@/contexts/main-context";

export default function Header() {
  const { search, setSearch } = useMainContext();
  return (
    <header className="flex flex-col gap-6 w-full max-w-3xl mx-auto p-6">
      <h1 className="text-3xl text-center">
        Pluga Challenge Front
      </h1>
      <label className="input w-full">
        <FiSearch className="size-4 opacity-50" />
        <input type="search" placeholder="Buscar ferramenta" value={search} onChange={(e) => setSearch(e.target.value.toLowerCase())} />
      </label>
    </header>
  )
}