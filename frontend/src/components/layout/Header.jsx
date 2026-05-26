"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import SideMenuEmpresa from "./SideMenu";
import SideMenuUsuario from "./SideMenuUsuario";
import useClickOutside from "@/hooks/useClickOutside";
import SearchBar from "@/components/common/SearchBar";
import { useSearch } from "@/store/searchContext";
import SystemToast from "@/components/common/SystemToast";
import RealtimeNotificationToast from "@/components/common/RealtimeNotificationToast";
import "@/styles/components/_systemToast.scss";

export default function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  const [homeHref, setHomeHref] = useState("/");
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const menuRef = useRef(null);

  const pathname = usePathname();

  const { search, setSearch } = useSearch();

  useClickOutside(menuRef, () => {
    setOpenMenu(false);
    setMobileSearchOpen(false);
  });

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
      <div ref={menuRef}>
        <div className="header__content">
          {/* SEARCH MOBILE */}
          <button className="header__searchButton" onClick={() => setMobileSearchOpen(!mobileSearchOpen)} >
            <img src="/icons/lupa.png" alt="buscar" />
          </button>

          {/* LOGO */}
          <Link href={homeHref} className="header__logoContainer">
            <img src="/logo/logo.png" alt="app logo" className="header__logo" />
          </Link>

          {/* SEARCH DESKTOP */}
          <div className="header__searchDesktop">
            <SearchBar disabled={false} />
          </div>

          {/* MENU */}
          <img src="/icons/menu.png" alt="menu" className="header__menu" onClick={() => setOpenMenu(!openMenu)} />
        </div>

        {/* SEARCH MOBILE EXPAND */}
        <div className={`header__mobileSearch ${mobileSearchOpen ? "header__mobileSearch--active" : "" }`} >
          <SearchBar disabled={false} />
        </div>

        {homeHref.startsWith("/usuario") ? (
          <SideMenuUsuario open={openMenu} />
        ) : (
          <SideMenuEmpresa open={openMenu} />
        )}

      </div>

      <SystemToast />

      <RealtimeNotificationToast />
    </header>
  );
}