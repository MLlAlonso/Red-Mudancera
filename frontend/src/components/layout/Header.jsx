"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import SideMenuEmpresa from "./SideMenu";
import SideMenuUsuario from "./SideMenuUsuario";
import useClickOutside from "@/hooks/useClickOutside";
import SearchBar from "@/components/common/SearchBar";
import { useSearch } from "@/store/searchContext";

export default function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  const [homeHref, setHomeHref] = useState("/");
  const menuRef = useRef(null);
  const pathname = usePathname();
  const { search, setSearch } = useSearch();
  const isEmpresaDashboard = pathname === "/empresa/dashboard";
  const isUsuarioDashboard = pathname === "/usuario/dashboard";
  const isDashboard = isEmpresaDashboard || isUsuarioDashboard;

  useClickOutside(menuRef, () => setOpenMenu(false));

  useEffect(() => {
    const cookies = document.cookie;

    if (cookies.includes("token_empresa")) {
      setHomeHref("/empresa/dashboard");
      return;
    }

    if (cookies.includes("token_usuario")) {
      setHomeHref("/usuario/dashboard");
      return;
    }

    setHomeHref("/");
  }, [pathname]);

  return (
    <header className="header">
      <div className="header__content">
        {/* LOGO */}
        <Link href={homeHref}>
          <img src="/logo/logo.png" alt="app logo" className="header__logo" />
        </Link>

        {/* SEARCH BAR */}
        <SearchBar disabled={false} />

        {/* MENU */}
        <img src="/icons/menu.png" alt="menu" className="header__menu" onClick={() => setOpenMenu(!openMenu)} />
      </div>

      <div ref={menuRef}>
        {homeHref.startsWith("/usuario") ? (
          <SideMenuUsuario open={openMenu} />
        ) : (
          <SideMenuEmpresa open={openMenu} />
        )}
      </div>
    </header>
  );
}