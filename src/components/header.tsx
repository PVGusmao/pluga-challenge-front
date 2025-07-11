import { FiSearch } from "react-icons/fi";

type Props = {
  search: string;
  handleSearch: (value: string) => void;
}

export default function Header({ search, handleSearch }: Props) {
  return (
    <>
      <h1 className="text-3xl text-center">
        Pluga Challenge Front
      </h1>
      <label className="input w-full">
        <FiSearch className="size-4 opacity-50" />
        <input type="search" placeholder="Buscar ferramenta" value={search} onChange={(e) => handleSearch(e.target.value)} />
      </label>
    </>
  )
}