"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useSearch } from "@/store/searchContext";
import Input from "@/components/common/Input";

const ENABLED_ROUTES = [
  "/empresa/dashboard",
  "/empresa/publicaciones",
  "/empresa/empresas",
  "/usuario/dashboard",
];

const SearchBar = () => {
  const pathname = usePathname();
  const { search, setSearch } = useSearch();

  const [mounted, setMounted] = useState(false);

  // 🔑 Evita mismatch SSR / Client
  useEffect(() => {
    setMounted(true);
  }, []);

  // ⛔️ NO renderizar nada hasta estar montado
  if (!mounted) {
    return (
      <div className="searchbar searchbar--disabled">
        <div className="searchbar__input-wrapper">
          <img src="/icons/lupa.png" alt="Buscar" className="searchbar__icon" />
          <Input
            disabled
            placeholder="Buscar..."
            className="searchbar__input"
          />
        </div>
      </div>
    );
  }

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
