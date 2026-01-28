"use client";

import { usePathname } from "next/navigation";
import { useSearch } from "@/store/searchContext";
import Input from "@/components/common/Input";

const ENABLED_ROUTES = [
  "/empresa/dashboard",
  "/empresa/publicaciones",
  "/empresa/empresas",
  "/usuario/empresas",
];

const SearchBar = () => {
  const pathname = usePathname();
  const { search, setSearch } = useSearch();

  const isEnabled = ENABLED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  const placeholder =
    pathname.startsWith("/empresa/empresas")
      ? "Ciudad o nombre de empresa"
      : "Origen, destino o empresa";

  return (
    <div className={`searchbar ${!isEnabled ? "searchbar--disabled" : ""}`}>
      <div className="searchbar__input-wrapper">
        <img src="/icons/lupa.png" alt="Buscar" className="searchbar__icon" />

        <Input
          name="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={placeholder}
          autocomplete
          disabled={!isEnabled}
          className="searchbar__input"
        />
      </div>
    </div>
  );
};

export default SearchBar;